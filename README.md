# ⚛️ Quantum Topological Threat Detection & Explainable AI (QTD-HGNN)

### State-of-the-Art Hypergraph Neural Networks (HGNN) & Persistent Homology for Next-Generation SOC Telemetry

---

## 📖 Executive Abstract

Modern cybersecurity is facing a silent crisis. The rise of heavily encrypted channels and the impending threat of cryptographically relevant quantum computers have birthed **Harvest Now, Decrypt Later (HNDL)** attacks. Adversaries capture and stage encrypted data packets today, waiting to decrypt them when quantum computing matures. Traditional signature-based firewalls and standard pairwise graph-based SIEM models cannot detect these stealthy, encrypted anomalies.

**QTD-HGNN** solves this. We present a state-of-the-art framework that integrates **Topological Data Analysis (TDA)** and **Hypergraph Neural Networks (HGNN)**. Instead of analyzing traffic in isolation, we capture the multi-dimensional geometric "shape" of the network using Persistent Homology (Betti curves). We model complex, multi-party cyber transactions ($n$-ary connections) as a Hypergraph, feeding them into a custom PyTorch Graph Neural Network. To ensure human trust, our system calculates **local feature attributions (SHAP)**, rendering clear, mathematically backed explanation plots for SOC analysts.

---

## 🛠️ System Architecture & Data Flow

Below is the multi-level operational pipeline showing how raw network telemetry is ingested, topologically mapped, evaluated by the GNN, and interpreted via explainability engines.

```mermaid
flowchart TD
    subgraph Ingestion
        A[Encrypted Packet Stream] -->|Sliding Window| B(Network Metrics Vector)
        B --> B1[Packet Size Variance]
        B --> B2[Transmission Latency]
        B --> B3[Shannon Entropy]
    end

    subgraph Topological Data Analysis (TDA)
        B -->|Point Cloud Mapping| C{Vietoris-Rips Complex}
        C -->|Epsilon Filtration| D[Persistent Homology Engine]
        D -->|Connected Components| E[Betti-0 Curve]
        D -->|Loop Beacons| F[Betti-1 Curve]
        D -->|Void Cavities| G[Betti-2 Curve]
    end

    subgraph Hypergraph GNN Inference
        E & F & G & B1 & B2 & B3 -->|Node & Edge Features| H[Hypergraph Incidence Construction]
        H -->|Matrix H| I[PyTorch GCNConv Layers]
        I -->|Softmax Classifier| J{Class Anomaly Score}
    end

    subgraph Explainable AI (XAI)
        J -->|Threat Score > 65%| K[SHAP Local Explainer]
        K -->|Attribution Weights| L[Interactive Waterfall Force Plot]
        J -->|Normal| M[Operational Logs Update]
    end

    style J fill:#ef4444,stroke:#333,stroke-width:2px,color:#fff
    style D fill:#3b82f6,stroke:#333,stroke-width:2px,color:#fff
    style I fill:#f59e0b,stroke:#333,stroke-width:2px,color:#fff
    style L fill:#10b981,stroke:#333,stroke-width:2px,color:#fff
```

---

## 🛡️ Section 1: The Threat Paradigm (Harvest Now, Decrypt Later)

Symmetric and asymmetric cryptographic systems (such as RSA and ECC) guard all modern banking and transaction networks. However, Shor's algorithm running on a sufficiently powerful quantum computer will solve the integer factorization and discrete logarithm problems in polynomial time, rendering public-key cryptography obsolete.

To exploit this ahead of time, threat actors employ **Harvest Now, Decrypt Later (HNDL)** strategies:
1. **Passive Ingress**: Intercepting and capturing encrypted data packets, SSL/TLS handshakes, and database backups.
2. **Data Staging**: Storing the encrypted data in covert offshore datastores.
3. **Decryption Phase**: Waiting until a Cryptographically Relevant Quantum Computer (CRQC) becomes mature to decrypt and read the staged data retroactively.

Because the payloads are encrypted, traditional Deep Packet Inspection (DPI) and firewall rules see nothing but standard HTTPS/TLS traffic. QTD-HGNN bypasses payload inspection completely by focusing on the **shape** and **n-ary relationship** of metadata transmission telemetry.

---

## 🍩 Section 2: Algebraic Topology & Persistent Homology (TDA)

Topological Data Analysis (TDA) treats network metadata (such as packet size variance, entropy, and latency) as points in a high-dimensional space $\mathbb{R}^d$. By analyzing the geometric shape of this point cloud, we detect stealthy cyber anomalies.

### 1. Vietoris-Rips Complex Construction
We construct a simplicial complex $K$ from our data point cloud $X$. For a given scale parameter $\epsilon > 0$, the Vietoris-Rips complex $\text{VR}(X, \epsilon)$ is defined as:

$$\text{VR}(X, \epsilon) = \left\{ \sigma \subseteq X \mid d(x_i, x_j) \le \epsilon, \forall x_i, x_j \in \sigma \right\}$$

As $\epsilon$ increases from $0$ to $\infty$:
- **0-simplices** (vertices/nodes) connect to form **1-simplices** (edges/lines).
- Groups of three mutually connected vertices form **2-simplices** (filled triangles).
- Groups of four form **3-simplices** (tetrahedrons).

```
   o         o                   o---------o                   o---------o
                                /           \                 / \       / \
                               /             \               /   \     /   \
  o           o               o               o             o-----\---o     o
                               \             /               \     \ /     /
                                \           /                 \     X     /
   o         o                   o---------o                   o---/-\---o
                                                                \ /     \ /
  (Nodes at e=0)              (1-simplices at e=1)            (2-simplices at e=2)
```

---

### 2. Boundary Operators & Homology Groups
To find topological holes (voids), we define the chain group $C_k(K)$ as the vector space spanned by the $k$-simplices of $K$. The boundary operator $\partial_k: C_k(K) \to C_{k-1}(K)$ maps a $k$-simplex to its boundary:

$$\partial_k([v_0, v_1, \dots, v_k]) = \sum_{i=0}^k (-1)^i [v_0, \dots, \hat{v}_i, \dots, v_k]$$

Where $\hat{v}_i$ denotes the omission of vertex $v_i$. Because boundary operators satisfy $\partial_k \circ \partial_{k+1} = 0$, the image of the boundary operator is contained in the kernel:

$$\text{im}(\partial_{k+1}) \subseteq \ker(\partial_k)$$

The $k$-th homology group $H_k(K)$ is defined as the quotient space:

$$H_k(K) = \ker(\partial_k) / \text{im}(\partial_{k+1})$$

The dimension of this quotient space is the $k$-th Betti number ($\beta_k$), representing the count of independent $k$-dimensional topological holes:

$$\beta_k = \dim \left( H_k(K) \right)$$

*   **$\beta_0$ (Connected Components):** Measures structural clustering. A sudden rise in $\beta_0$ indicates node isolation or subnet segmentation.
*   **$\beta_1$ (Topological Loops):** Detects cyclic cycles. Spikes in $\beta_1$ indicate lateral pivoting, circular financial laundering paths, or cyclical C2 botnet beacons.
*   **$\beta_2$ (Cavities):** Detects three-dimensional voids, flagging advanced packet encapsulation or tunneling schemes.

---

## 🌐 Section 3: Hypergraphs & Spectral Convolution (HGNN)

Traditional graphs are represented by a set of nodes $V$ and edges $E \subseteq V \times V$, restricting relationships to pairwise interactions. In complex enterprise networks, cyber threats involve multi-party transactions, distributed database syncs, and coordinated API calls. Modelling these interactions with pairwise graphs loses structural information.

A **Hypergraph** $G = (V, E, W)$ generalizes this, where a hyperedge $e \in E$ can connect an arbitrary number of vertices.

```
       Hypergraph Representation                    Pairwise Graph (Clique Expansion)
       
            e1 (Hyperedge)                                
        +-------------------+                                 v1 ------ v2
        |   v1    v2    v3  |                                 | \      / |
        +-------------------+                                 |  \    /  |
                  |                                           |   \  /   |
            e2 (Hyperedge)                                    |    \/    |
        +-------------------+                                 |    /\    |
        |   v3    v4    v5  |                                 |   /  \   |
        +-------------------+                                 |  /    \  |
                                                              v3 ------ v4
                                                                \      /
                                                                 \    /
                                                                   v5
```

### 1. Mathematical Incidence Matrix
We represent the hypergraph using an incidence matrix $H \in \mathbb{R}^{|V| \times |E|}$:

$$h(v, e) = \begin{cases} 1 & \text{if } v \in e \\ 0 & \text{otherwise} \end{cases}$$

The diagonal vertex degree matrix $D_v \in \mathbb{R}^{|V| \times |V|}$ and hyperedge degree matrix $D_e \in \mathbb{R}^{|E| \times |E|}$ are defined as:

$$d(v) = \sum_{e \in E} w(e) h(v, e) \quad \implies \quad D_v(v, v) = d(v)$$

$$d(e) = \sum_{v \in V} h(v, e) \quad \implies \quad D_e(e, e) = d(e)$$

Where $w(e)$ is the weight of hyperedge $e$, typically stored in the diagonal weight matrix $W \in \mathbb{R}^{|E| \times |E|}$.

---

### 2. Spectral Hypergraph Convolution
To perform message passing over the hypergraph structure, we define the Hypergraph Laplacian $L$:

$$L = I - D_v^{-1/2} H W D_e^{-1} H^T D_v^{-1/2}$$

Applying spectral convolution with filter $\Theta$, the propagation rule to compute node features $X^{(l+1)}$ at layer $l+1$ is formulated as:

$$X^{(l+1)} = \sigma \left( D_v^{-1/2} H W D_e^{-1} H^T D_v^{-1/2} X^{(l)} \Theta^{(l)} \right)$$

Where:
- $X^{(l)} \in \mathbb{R}^{|V| \times F_l}$ is the node feature matrix at layer $l$.
- $\Theta^{(l)} \in \mathbb{R}^{F_l \times F_{l+1}}$ is the learnable filter weight matrix.
- $\sigma$ is a non-linear activation function (such as ReLU).

This convolution allows information to flow from nodes to hyperedges, and then back to nodes, consolidating multi-party transaction state features globally across the network.

---

## 📊 Section 4: Local Explainability via SHAP

To prevent the Graph Neural Network from acting as an untrusted "black box," we calculate Shapley Additive exPlanations (SHAP) for each GNN classification. This maps the prediction output back to individual network features.

### 1. Game Theory Foundations
Shapley values calculate the marginal contribution of each feature to the model's threat score. Let $F$ be the set of all input features. For a specific feature $i \in F$, the SHAP value $\phi_i$ is computed as:

$$\phi_i(f_x) = \sum_{S \subseteq F \setminus \{i\}} \frac{|S|!(|F| - |S| - 1)!}{|F|!} \left[ f_x(S \cup \{i\}) - f_x(S) \right]$$

Where:
- $S$ is a subset of features excluding feature $i$.
- $f_x(S)$ is the model's prediction output when restricted only to features in subset $S$.
- $|F|!$ is the total number of permutations of the feature set.

---

### 2. Axiomatic Guarantees
SHAP is the only explanation method that satisfies four fundamental mathematical properties:
1. **Efficiency (Local Accuracy):** The sum of attribution values equals the difference between the model's output $f_x$ and the base expectation $E[f(x)]$:
   $$\sum_{i=1}^M \phi_i(f_x) = f(x) - \phi_0$$
2. **Symmetry:** If two features contribute identically in all coalitions, their Shapley values are equal:
   $$\text{If } f_x(S \cup \{i\}) = f_x(S \cup \{j\}) \quad \forall S \subseteq F \setminus \{i, j\} \quad \implies \quad \phi_i = \phi_j$$
3. **Dummy (Null Effect):** If a feature has no impact on any coalition, its Shapley value is zero:
   $$\text{If } f_x(S \cup \{i\}) = f_x(S) \quad \forall S \subseteq F \setminus \{i\} \quad \implies \quad \phi_i = 0$$
4. **Additivity:** If the model's output is a sum of two models, the attributions sum accordingly:
   $$\phi_i(f_{x,1} + f_{x,2}) = \phi_i(f_{x,1}) + \phi_i(f_{x,2})$$

---

## 📋 Network Telemetry Features

QTD-HGNN computes 6 continuous features inside a sliding-window time-series:

| Feature Name | Category | Mathematical Formulation | Security Value |
| :--- | :---: | :---: | :--- |
| **Packet Size Var** | Network | $\text{Var}(P) = \frac{1}{N}\sum (p_i - \bar{p})^2$ | Detects bursty bulk file transfers (exfiltration) vs low-variance ping streams. |
| **Latency Hops** | Network | $T_{\text{elapsed}}$ | Identifies proxy delays, routing pivots, and geographic network leaps. |
| **Shannon Entropy** | Cryptographic | $H(X) = -\sum_{i=1}^n P(x_i) \log_2 P(x_i)$ | Normal TLS has structured entropy. Anomalous high entropy flags staging/compression. |
| **Betti-0** | Topological | $\dim(H_0)$ | Identifies isolated machines, hosts dropping connectivity, or subnet splits. |
| **Betti-1** | Topological | $\dim(H_1)$ | Flags cyclic telemetry loops (malware beaconing, automated C2 channels). |
| **Betti-2** | Topological | $\dim(H_2)$ | Flags multi-dimensional tunnels indicating protocol encapsulation. |

---

## 💻 Core Code Implementations

### 1. PyTorch Geometric Hypergraph Model (`backend/engine.py`)
This script contains the GNN definition representing the model architecture running in the background:

```python
import torch
import torch.nn.functional as F
from torch_geometric.nn import GCNConv

class QTD_GNN(torch.nn.Module):
    def __init__(self, hidden_channels):
        super(QTD_GNN, self).__init__()
        torch.manual_seed(12345)
        # Input layer mapping Packet Size, Latency, and Entropy to Hidden Graph Space
        self.conv1 = GCNConv(3, hidden_channels)
        # Output layer classifying Benign (0) vs Malicious (1)
        self.conv2 = GCNConv(hidden_channels, 2)

    def forward(self, x, edge_index):
        # First graph convolution + Relu + Dropout
        x = self.conv1(x, edge_index)
        x = x.relu()
        x = F.dropout(x, p=0.5, training=self.training)
        # Output classification
        x = self.conv2(x, edge_index)
        return x
```

---

### 2. FastAPI WebSocket Streamer (`backend/main.py`)
Manages live client telemetry streams:

```python
from fastapi import FastAPI, WebSocket, WebSocketDisconnect
import json
import asyncio

app = FastAPI()

class ConnectionManager:
    def __init__(self):
        self.active_connections: list[WebSocket] = []

    async def connect(self, websocket: WebSocket):
        await websocket.accept()
        self.active_connections.append(websocket)

    def disconnect(self, websocket: WebSocket):
        self.active_connections.remove(websocket)

    async def broadcast(self, message: dict):
        json_message = json.dumps(message)
        for connection in self.active_connections:
            try:
                await connection.send_text(json_message)
            except Exception:
                self.disconnect(connection)
```

---

### 3. Native React SHAP Waterfall Plot (`src/App.jsx`)
Plots feature contributions dynamically inside the dashboard:

```javascript
// Render SHAP waterfall bars relative to the baseline prediction
{tx.features.map((f, i) => (
  <div key={i} style={{ display: 'flex', alignItems: 'center', padding: '8px 0' }}>
    <span style={{ width: '150px', fontSize: '13px', fontWeight: 600 }}>{f.name}</span>
    <span style={{ width: '80px', fontFamily: 'monospace' }}>{f.value}</span>
    <div style={{ flex: 1, display: 'flex', alignItems: 'center', position: 'relative', height: '24px' }}>
      {/* Baseline Y-axis (Center Line) */}
      <div style={{ position: 'absolute', left: '50%', top: 0, bottom: 0, width: '1px', backgroundColor: '#cbd5e1' }}></div>
      
      {/* SHAP Attribution Bar */}
      <div style={{ 
        position: 'absolute', 
        height: '16px', 
        backgroundColor: f.color, 
        width: `${Math.abs(f.impact) * 15}%`,
        left: f.impact > 0 ? '50%' : `calc(50% - ${Math.abs(f.impact) * 15}%)`,
        borderRadius: '2px',
        opacity: 0.8,
        display: 'flex',
        alignItems: 'center',
        padding: '0 6px',
        fontSize: '10px',
        color: 'white',
        fontWeight: 'bold'
      }}>
        {f.impact > 0 ? `+${f.impact}` : f.impact}
      </div>
    </div>
  </div>
))}
```

---

## 🚀 Setup & Local Execution Guide

Follow these steps to run the complete end-to-end integrated environment locally:

### 1. Python PyTorch Backend Server Setup
From the project root directory, navigate to the backend folder:
```bash
cd backend
```

Create a virtual environment and activate it:
```bash
# Windows (PowerShell)
python -m venv ..\venv
..\venv\Scripts\activate

# Unix/macOS
python -m venv ../venv
source ../venv/bin/activate
```

Install requirements (includes `torch`, `torch_geometric`, and `fastapi`):
```bash
pip install -r requirements.txt
```

Launch the FastAPI telemetry server:
```bash
python -m uvicorn main:app --port 8000
```

---

### 2. React Frontend Setup
Open a new terminal window in the project root:
```bash
# Install package dependencies
npm install

# Start Vite development server
npm run dev
```

Navigate to [http://localhost:5173](http://localhost:5173) in your browser. Start the Python backend, and the UI will automatically light up with a green **🟢 LIVE SOCKET** badge, pulling live PyTorch GNN predictions and feeding the interactive dashboards.
