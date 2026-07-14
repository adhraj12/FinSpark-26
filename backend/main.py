from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from fastapi.middleware.cors import CORSMiddleware
import asyncio
import json
from engine import generate_telemetry

app = FastAPI(title="QTD-HGNN Backend")

# Allow React frontend to connect
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, specify ["http://localhost:5173"]
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"message": "QTD-HGNN Backend is running"}

class ConnectionManager:
    def __init__(self):
        self.active_connections: list[WebSocket] = []

    async def connect(self, websocket: WebSocket):
        await websocket.accept()
        self.active_connections.append(websocket)
        print(f"Client connected. Total clients: {len(self.active_connections)}")

    def disconnect(self, websocket: WebSocket):
        if websocket in self.active_connections:
            self.active_connections.remove(websocket)
            print(f"Client disconnected. Total clients: {len(self.active_connections)}")

    async def broadcast(self, message: dict):
        # Convert dictionary to JSON string
        json_message = json.dumps(message)
        for connection in self.active_connections:
            try:
                await connection.send_text(json_message)
            except Exception as e:
                print(f"Error sending message: {e}")
                self.disconnect(connection)

manager = ConnectionManager()

# Global background task reference
_stream_task = None

async def telemetry_streamer():
    """Background task that generates telemetry and broadcasts it."""
    while True:
        try:
            if len(manager.active_connections) > 0:
                payload = generate_telemetry()
                print(f"Broadcasting telemetry to {len(manager.active_connections)} clients...")
                await manager.broadcast(payload)
            # Sleep for 1.5 seconds to simulate real-time interval (similar to what React was doing)
            await asyncio.sleep(1.5)
        except Exception as e:
            print(f"Telemetry streamer error: {e}")
            await asyncio.sleep(1.5)

@app.on_event("startup")
async def startup_event():
    global _stream_task
    print("Starting QTD-HGNN background telemetry streamer...")
    _stream_task = asyncio.create_task(telemetry_streamer())

@app.websocket("/ws/stream")
async def websocket_endpoint(websocket: WebSocket):
    await manager.connect(websocket)
    try:
        while True:
            # We keep the connection open. The client doesn't need to send anything.
            # We just wait to receive a message so we know if the client disconnects.
            data = await websocket.receive_text()
            print(f"Received message from client: {data}")
    except WebSocketDisconnect:
        manager.disconnect(websocket)
