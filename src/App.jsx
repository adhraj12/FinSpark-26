import { useState, useEffect } from 'react';
import { 
  Shield, Play, BookOpen, ChevronDown, ChevronRight, Activity, 
  Share2, AlertTriangle, Eye, Settings, FileText,
  Layers, Brain, Monitor, CheckCircle, Network, ArrowRight,
  Search, Bell, Plus, Minus, Maximize2, Pause, RefreshCw,
  AlertCircle, ArrowLeft, ExternalLink, HelpCircle
} from 'lucide-react';
import { AreaChart, Area, ResponsiveContainer } from 'recharts';
import './App.css';

// Initial data for Betti Curves
const generateInitialData = (baseVal, variance) => {
  return Array.from({ length: 15 }, (_, i) => ({
    time: i,
    value: Math.max(0, baseVal + (Math.random() - 0.5) * variance)
  }));
};

// Multi-stage HNDL simulation steps data
const simulationSteps = [
  {
    index: 0,
    step: 'A',
    time: '12:01:15',
    title: 'Initial Access',
    desc: 'Credential stuffing from TOR exit node',
    details: 'Adversary initiated automated brute-force attacks against employee VPN endpoints from known TOR exit nodes, successfully hijacking an active user session.',
    risk: 'Low Risk',
    color: '#3b82f6',
    activeNodes: ['vpn'],
    metrics: { threatScore: 18, activeThreats: 1, entropy: 0.95, betti0: 1.2, betti1: 0.1, betti2: 0.0 }
  },
  {
    index: 1,
    step: 'B',
    time: '12:03:42',
    title: 'Privilege Escalation',
    desc: 'Exploited VPN gateway vulnerability',
    details: 'Adversary exploited an unpatched administrative vulnerability in the VPN gateway to acquire root access and pivot inside the internal payment network.',
    risk: 'Medium Risk',
    color: '#f59e0b',
    activeNodes: ['vpn', 'optic'],
    metrics: { threatScore: 35, activeThreats: 3, entropy: 0.88, betti0: 1.6, betti1: 0.3, betti2: 0.1 }
  },
  {
    index: 2,
    step: 'C',
    time: '12:07:18',
    title: 'Lateral Movement',
    desc: 'Discovered network topology',
    details: 'Adversary executed internal directory lookups and mapped the transaction processing architecture, pivoting directly toward the SWIFT payment cluster.',
    risk: 'High Risk',
    color: '#ef4444',
    activeNodes: ['vpn', 'optic', 'mule'],
    metrics: { threatScore: 58, activeThreats: 7, entropy: 0.82, betti0: 2.0, betti1: 0.7, betti2: 0.25 }
  },
  {
    index: 3,
    step: 'D',
    time: '12:12:33',
    title: 'High Risk Transaction',
    desc: 'Anomalous SWIFT MT103 detected',
    details: 'A high-value MT103 payment message was injected from a compromised credentials account, routing funds to an unlisted foreign clearing house.',
    risk: 'Critical Risk',
    color: '#ef4444',
    activeNodes: ['swift', 'vpn', 'optic', 'mule'],
    metrics: { threatScore: 87, activeThreats: 12, entropy: 0.78, betti0: 2.31, betti1: 1.12, betti2: 0.43 }
  },
  {
    index: 4,
    step: 'E',
    time: '12:14:09',
    title: 'Data Staging',
    desc: 'Sensitive data collected & packed',
    details: 'Encrypted database segments containing customer transaction archives and key pairs were compressed and staged on local database backup servers.',
    risk: 'Critical Risk',
    color: '#ef4444',
    activeNodes: ['swift', 'vpn', 'optic', 'mule', 'bgp'],
    metrics: { threatScore: 92, activeThreats: 13, entropy: 0.74, betti0: 2.45, betti1: 1.25, betti2: 0.52 }
  },
  {
    index: 5,
    step: 'F',
    time: '12:16:55',
    title: 'Exfiltration Attempt',
    desc: 'Outbound connection to suspicious IP',
    details: 'Massive transfer of TLS-encrypted archives initiated towards an external host. Security policies triggered firewall quarantine.',
    risk: 'Critical Risk',
    color: '#ef4444',
    activeNodes: ['swift', 'vpn', 'optic', 'mule', 'bgp'],
    metrics: { threatScore: 95, activeThreats: 14, entropy: 0.71, betti0: 2.50, betti1: 1.35, betti2: 0.60 }
  },
  {
    index: 6,
    step: 'G',
    time: '12:18:30',
    title: 'Detection & Alert',
    desc: 'Quantum anomaly isolated & mitigated',
    details: 'Multi-stage QTD-HGNN correlation completed. The HNDL (Harvest Now Decrypt Later) attack vector is fully neutralized and isolated.',
    risk: 'Resolved',
    color: '#10b981',
    activeNodes: [],
    metrics: { threatScore: 45, activeThreats: 0, entropy: 0.84, betti0: 1.85, betti1: 0.75, betti2: 0.20 }
  }
];

function App() {
  // Navigation & View Router State
  const [currentView, setCurrentView] = useState('landing');

  // --- Landing Page Hero Mockup State & Logic ---
  const [mockupActiveTab, setMockupActiveTab] = useState('Overview');
  const [selectedMockupNode, setSelectedMockupNode] = useState(null);

  const mockupNodes = [
    { id: 'swift', label: 'SWIFT Anomaly', type: 'Transaction', x: 150, y: 110, size: 24, color: '#f59e0b', desc: 'Anomalous SWIFT wire transfer modification at 2:00 AM.', contribution: '88%' },
    { id: 'vpn', label: 'Treasury VPN', type: 'Identity', x: 70, y: 60, size: 14, color: '#10b981', desc: 'Concurrent logins from impossible geographic travel locations.', contribution: '61%' },
    { id: 'bgp', label: 'BGP Detour', type: 'Alert', x: 230, y: 70, size: 18, color: '#ef4444', desc: 'Active routing detour through hostile state autonomous systems.', contribution: '88%' },
    { id: 'optic', label: 'Optical Delay', type: 'Device', x: 80, y: 150, size: 12, color: '#a78bfa', desc: 'Micro-latency drift on encrypted transaction fiber cables.', contribution: '76%' },
    { id: 'mule', label: 'Mule Loop', type: 'IP Address', x: 210, y: 160, size: 14, color: '#06b6d4', desc: 'Circular multi-hop funds transfer matching money-laundering loops.', contribution: '44%' },
  ];

  const [mockupQuantumData, setMockupQuantumData] = useState({
    entropy: generateInitialData(0.78, 0.08),
    betti0: generateInitialData(2.31, 0.2),
    betti1: generateInitialData(1.12, 0.15),
    betti2: generateInitialData(0.43, 0.05),
  });

  // Mockup live wiggling effect
  useEffect(() => {
    const interval = setInterval(() => {
      setMockupQuantumData(prev => {
        const updateSeries = (series, baseVal, variance) => {
          const newSeries = [...series.slice(1)];
          const lastVal = newSeries[newSeries.length - 1].value;
          const nextVal = Math.max(0, lastVal + (Math.random() - 0.5) * variance * 0.5);
          const clampedVal = Math.min(baseVal + variance * 2, Math.max(baseVal - variance * 2, nextVal));
          newSeries.push({
            time: series.length,
            value: Number(clampedVal.toFixed(2))
          });
          return newSeries;
        };

        return {
          entropy: updateSeries(prev.entropy, 0.78, 0.08),
          betti0: updateSeries(prev.betti0, 2.31, 0.2),
          betti1: updateSeries(prev.betti1, 1.12, 0.15),
          betti2: updateSeries(prev.betti2, 0.43, 0.05),
        };
      });
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  const mockupXaiTitle = selectedMockupNode ? selectedMockupNode.label : 'High Risk Transaction Detected';
  const mockupXaiDesc = selectedMockupNode ? selectedMockupNode.desc : 'Correlation of 5 heterogeneous signals indicates active cyber-fraud intrusion.';
  const mockupXaiFactors = [
    { label: 'Anomalous SWIFT Message', value: 88, color: '#f59e0b', desc: 'Unusual transfer pattern detected on payment rail.' },
    { label: 'Topological Correlation', value: 76, color: '#a78bfa', desc: 'Simplicial complex contains anomalous 1-dimensional loops.' },
    { label: 'Credential Stuffing Source', value: 61, color: '#10b981', desc: 'Session IP linked to high-frequency authentication attempts.' },
    { label: 'Behavioral Anomaly', value: 44, color: '#06b6d4', desc: 'Keyboard & cursor kinetics deviate from user baseline.' },
  ];


  // --- Premium SOC Dashboard (Option 1 Prototype View) State & Logic ---
  const [dashboardTab, setDashboardTab] = useState('Overview');
  const [selectedDashboardNode, setSelectedDashboardNode] = useState(null);
  
  // Simulation timeline player states
  const [currentStep, setCurrentStep] = useState(3); // Default to Step D: High Risk Transaction
  const [isPlaying, setIsPlaying] = useState(false);
  const [showScenarioModal, setShowScenarioModal] = useState(false);
  
  // Simulated live quantum metrics data
  const [dashboardQuantumData, setDashboardQuantumData] = useState({
    entropy: generateInitialData(0.78, 0.08),
    betti0: generateInitialData(2.31, 0.2),
    betti1: generateInitialData(1.12, 0.15),
    betti2: generateInitialData(0.43, 0.05),
  });

  // Playback timer for simulation
  useEffect(() => {
    let timer;
    if (isPlaying) {
      timer = setInterval(() => {
        setCurrentStep((prev) => {
          const next = prev + 1;
          if (next >= simulationSteps.length) {
            setIsPlaying(false);
            return prev;
          }
          return next;
        });
      }, 3500);
    }
    return () => clearInterval(timer);
  }, [isPlaying]);

  // Synchronize Betti Curves and Entanglement entropy baselines with current simulation step
  useEffect(() => {
    const stepData = simulationSteps[currentStep];
    if (!stepData) return;

    setDashboardQuantumData((prev) => {
      const updateSeries = (series, baseVal, variance) => {
        const newSeries = [...series.slice(1)];
        const lastVal = newSeries[newSeries.length - 1].value;
        const nextVal = Math.max(0, lastVal + (Math.random() - 0.5) * variance * 0.5);
        // Clamp around the current step's baseline value
        const clampedVal = Math.min(baseVal + variance, Math.max(baseVal - variance, nextVal));
        newSeries.push({
          time: series.length,
          value: Number(clampedVal.toFixed(2))
        });
        return newSeries;
      };

      return {
        entropy: updateSeries(prev.entropy, stepData.metrics.entropy, 0.04),
        betti0: updateSeries(prev.betti0, stepData.metrics.betti0, 0.12),
        betti1: updateSeries(prev.betti1, stepData.metrics.betti1, 0.08),
        betti2: updateSeries(prev.betti2, stepData.metrics.betti2, 0.03),
      };
    });
  }, [currentStep]);

  // Regular live wiggle when NOT playing to keep charts wiggling
  useEffect(() => {
    const interval = setInterval(() => {
      if (isPlaying) return; // Skip if handled by step change
      const stepData = simulationSteps[currentStep];
      if (!stepData) return;

      setDashboardQuantumData(prev => {
        const updateSeries = (series, baseVal, variance) => {
          const newSeries = [...series.slice(1)];
          const lastVal = newSeries[newSeries.length - 1].value;
          const nextVal = Math.max(0, lastVal + (Math.random() - 0.5) * variance * 0.5);
          const clampedVal = Math.min(baseVal + variance, Math.max(baseVal - variance, nextVal));
          newSeries.push({
            time: series.length,
            value: Number(clampedVal.toFixed(2))
          });
          return newSeries;
        };

        return {
          entropy: updateSeries(prev.entropy, stepData.metrics.entropy, 0.04),
          betti0: updateSeries(prev.betti0, stepData.metrics.betti0, 0.12),
          betti1: updateSeries(prev.betti1, stepData.metrics.betti1, 0.08),
          betti2: updateSeries(prev.betti2, stepData.metrics.betti2, 0.03),
        };
      });
    }, 1500);

    return () => clearInterval(interval);
  }, [isPlaying, currentStep]);

  // Interactive nodes for Threat Hypergraph
  const graphNodes = [
    { id: 'vpn', label: 'Treasury VPN', type: 'Identity', x: 160, y: 80, color: '#a78bfa', desc: 'VPN tunnel session launched from TOR gateway.', factors: [
      { label: 'Impossible Travel Velocity', value: 94, color: '#a78bfa' },
      { label: 'Proxy Node Signature', value: 82, color: '#f59e0b' },
      { label: 'MFA Bypass Anomaly', value: 58, color: '#10b981' }
    ]},
    { id: 'swift', label: 'SWIFT MT103', type: 'SWIFT Msg', x: 300, y: 160, color: '#f59e0b', desc: 'Injected wire transfer to unlisted foreign clearing house.', factors: [
      { label: 'Anomalous SWIFT Message', value: 88, color: '#f59e0b' },
      { label: 'Topological Correlation', value: 76, color: '#a78bfa' },
      { label: 'Credential Stuffing Source', value: 61, color: '#10b981' },
      { label: 'Behavioral Anomaly', value: 44, color: '#06b6d4' }
    ]},
    { id: 'mule', label: 'Mule Loop IP', type: 'IP Address', x: 120, y: 220, color: '#06b6d4', desc: 'IP associated with high-frequency circular payment routing.', factors: [
      { label: 'Circular Flow Path', value: 85, color: '#06b6d4' },
      { label: 'Host Reputation Alert', value: 73, color: '#ef4444' },
      { label: 'Rapid Session Cycling', value: 50, color: '#10b981' }
    ]},
    { id: 'optic', label: 'Optical Delay', type: 'Device', x: 420, y: 110, color: '#10b981', desc: 'Nanosecond timing fluctuations on physical fiber lines.', factors: [
      { label: 'Timing Drift Anomaly', value: 89, color: '#10b981' },
      { label: 'Physical Interface Flapping', value: 70, color: '#f59e0b' },
      { label: 'Signal-to-Noise Ratio Drop', value: 62, color: '#a78bfa' }
    ]},
    { id: 'bgp', label: 'BGP Detour', type: 'IP Address', x: 480, y: 200, color: '#ef4444', desc: 'BGP path hijacking rerouting core network traffic.', factors: [
      { label: 'AS Route Hijack Score', value: 96, color: '#ef4444' },
      { label: 'Hostile Country ASN', value: 88, color: '#f59e0b' },
      { label: 'TTL Decrement Variance', value: 74, color: '#06b6d4' }
    ]}
  ];

  // Explainable AI details based on selected node, or default global dashboard view
  const currentSimulationStep = simulationSteps[currentStep];
  const activeDashboardNode = selectedDashboardNode || graphNodes.find(n => n.id === (currentSimulationStep?.activeNodes[0] || 'swift'));
  const dashboardXaiTitle = activeDashboardNode ? activeDashboardNode.label : 'High Risk Transaction Detected';
  const dashboardXaiDesc = activeDashboardNode ? activeDashboardNode.desc : 'Correlation of 5 heterogeneous signals indicates active cyber-fraud intrusion.';
  const dashboardXaiFactors = activeDashboardNode ? activeDashboardNode.factors : [
    { label: 'Anomalous SWIFT Message', value: 88, color: '#f59e0b' },
    { label: 'Topological Correlation', value: 76, color: '#a78bfa' },
    { label: 'Credential Stuffing Source', value: 61, color: '#10b981' },
    { label: 'Behavioral Anomaly', value: 44, color: '#06b6d4' }
  ];

  if (currentView === 'dashboard') {
    return (
      <div className="soc-dashboard-app">
        {/* Sidebar */}
        <aside className="db-sidebar">
          <div className="db-logo" onClick={() => { setCurrentView('landing'); setSelectedDashboardNode(null); }} style={{ cursor: 'pointer' }}>
            <div className="db-logo-icon">
              <Shield size={20} strokeWidth={2.5} />
            </div>
            <div className="db-logo-text">
              <span className="db-logo-title">QTD-HGNN SOC</span>
              <span className="db-logo-subtitle">Quantum Threat Defense</span>
            </div>
          </div>

          <nav className="db-nav">
            {[
              { id: 'Overview', label: 'Overview', icon: Layers },
              { id: 'Threat Graph', label: 'Threat Graph', icon: Network },
              { id: 'Alerts', label: 'Alerts', icon: AlertTriangle, count: 12 },
              { id: 'XAI Insights', label: 'XAI Insights', icon: Brain },
              { id: 'Quantum Monitor', label: 'Quantum Monitor', icon: Activity },
              { id: 'Entities', label: 'Entities', icon: FileText },
              { id: 'Cases', label: 'Cases', icon: CheckCircle },
              { id: 'Settings', label: 'Settings', icon: Settings },
            ].map(item => {
              const Icon = item.icon;
              const isActive = dashboardTab === item.id;
              return (
                <button 
                  key={item.id} 
                  className={`db-nav-item ${isActive ? 'active' : ''}`}
                  onClick={() => {
                    setDashboardTab(item.id);
                    if (item.id === 'Overview') {
                      setSelectedDashboardNode(null);
                    }
                  }}
                >
                  <Icon size={18} />
                  <span>{item.label}</span>
                  {item.count && <span className="db-nav-badge">{item.count}</span>}
                </button>
              );
            })}
          </nav>

          {/* Active Scenario Card */}
          <div className="active-scenario-card">
            <div className="scenario-card-content">
              <div className="scenario-card-header">
                <span className="scenario-status-dot red animate"></span>
                <span className="scenario-pill-active">Active Scenario</span>
              </div>
              <h4 className="scenario-title">HNDL Attack Simulation</h4>
              <p className="scenario-desc">
                Multi-stage attack targeting financial infrastructure
              </p>
              <button className="btn-scenario-details" onClick={() => setShowScenarioModal(true)}>
                <span>View Details →</span>
              </button>
            </div>
            
            {/* Decorative wavy lines gradient background at bottom */}
            <div className="scenario-wave-decoration">
              <svg viewBox="0 0 100 40" preserveAspectRatio="none" className="scenario-wave-svg">
                <path d="M0,25 Q25,10 50,30 T100,15 L100,40 L0,40 Z" fill="rgba(124, 58, 237, 0.06)" />
                <path d="M0,32 Q30,18 60,35 T100,22 L100,40 L0,40 Z" fill="rgba(99, 102, 241, 0.1)" />
                <path d="M0,18 Q40,32 70,12 T100,28" fill="none" stroke="rgba(6, 182, 212, 0.25)" strokeWidth="1.5" />
                <path d="M0,28 Q35,8 70,30 T100,18" fill="none" stroke="rgba(99, 102, 241, 0.2)" strokeWidth="1" />
              </svg>
            </div>
          </div>

          {/* Return button */}
          <button className="btn-back-landing" onClick={() => { setCurrentView('landing'); setSelectedDashboardNode(null); }}>
            <ArrowLeft size={14} />
            <span>Back to Landing Page</span>
          </button>
        </aside>

        {/* Main Content Area */}
        <main className="db-main">
          {/* Header */}
          <header className="db-header">
            <div className="db-search">
              <Search size={18} className="db-search-icon" />
              <input type="text" placeholder="Search anything... ⌘K" defaultValue="" />
            </div>

            <div className="db-header-actions">
              <div className="db-status-badge">
                <span className="status-dot green animate"></span>
                <span>System Status: <strong>Operational</strong></span>
              </div>

              <div className="db-notification-bell">
                <Bell size={20} />
                <span className="bell-badge">3</span>
              </div>

              <div className="db-user-profile">
                <div className="db-user-avatar">A3</div>
                <div className="db-user-info">
                  <span className="db-user-name">Analyst</span>
                  <span className="db-user-level">Level 3</span>
                </div>
              </div>
            </div>
          </header>

          {/* Tab Subviews */}
          {dashboardTab !== 'Overview' && dashboardTab !== 'Threat Graph' && dashboardTab !== 'XAI Insights' && dashboardTab !== 'Quantum Monitor' ? (
            <div className="tab-placeholder-view">
              <div className="placeholder-content">
                <AlertCircle size={48} className="placeholder-icon" />
                <h3>{dashboardTab} View</h3>
                <p>This tab is active. The system is filtering real-time logs relating to the <strong>HNDL Attack Simulation</strong>.</p>
                <button className="btn-return-overview" onClick={() => setDashboardTab('Overview')}>
                  Return to Dashboard Overview
                </button>
              </div>
            </div>
          ) : (
            <div className="db-content-grid">
              {/* Metrics Row */}
              <div className="db-metrics-row">
                {/* Metric 1 */}
                <div className="db-metric-card risk">
                  <div className="metric-card-left">
                    <span className="metric-label">Threat Score</span>
                    <h2 className="metric-value">{currentSimulationStep.metrics.threatScore}/100</h2>
                    <span className={`metric-subtitle ${currentSimulationStep.metrics.threatScore > 80 ? 'critical' : currentSimulationStep.metrics.threatScore > 50 ? 'high' : 'low'}`}>
                      {currentSimulationStep.risk}
                    </span>
                  </div>
                  <div className="metric-card-right">
                    <div className="mini-chart">
                      {/* Threat Score mini sparkline */}
                      <ResponsiveContainer width="100%" height={40}>
                        <AreaChart data={simulationSteps.slice(0, currentStep + 1)}>
                          <Area type="monotone" dataKey="metrics.threatScore" stroke="#ef4444" strokeWidth={1.5} fill="rgba(239, 68, 68, 0.05)" />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </div>

                {/* Metric 2 */}
                <div className="db-metric-card">
                  <div className="metric-card-left">
                    <span className="metric-label">Active Threats</span>
                    <h2 className="metric-value">{currentSimulationStep.metrics.activeThreats}</h2>
                    <span className="metric-subtitle sub-green">+{currentStep} new alerts</span>
                  </div>
                  <div className="metric-card-right">
                    <div className="mini-chart">
                      <ResponsiveContainer width="100%" height={40}>
                        <AreaChart data={simulationSteps.slice(0, currentStep + 1)}>
                          <Area type="monotone" dataKey="metrics.activeThreats" stroke="#3b82f6" strokeWidth={1.5} fill="rgba(59, 130, 246, 0.05)" />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </div>

                {/* Metric 3 */}
                <div className="db-metric-card">
                  <div className="metric-card-left">
                    <span className="metric-label">Monitored Entities</span>
                    <h2 className="metric-value">8,547</h2>
                    <span className="metric-subtitle sub-green">↑ 11.4% traffic volume</span>
                  </div>
                  <div className="metric-card-right">
                    <div className="mini-chart">
                      <div className="mini-bar-chart">
                        <span className="mini-bar" style={{ height: '30%' }}></span>
                        <span className="mini-bar" style={{ height: '45%' }}></span>
                        <span className="mini-bar" style={{ height: '60%' }}></span>
                        <span className="mini-bar" style={{ height: '75%' }}></span>
                        <span className="mini-bar" style={{ height: '50%' }}></span>
                        <span className="mini-bar" style={{ height: '80%' }}></span>
                        <span className="mini-bar" style={{ height: '95%' }}></span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Metric 4 */}
                <div className="db-metric-card">
                  <div className="metric-card-left">
                    <span className="metric-label">Mean Response Time</span>
                    <h2 className="metric-value">42ms</h2>
                    <span className="metric-subtitle sub-green">Optimal efficiency</span>
                  </div>
                  <div className="metric-card-right">
                    <div className="mini-chart">
                      <div className="mini-bar-chart waves">
                        <span className="mini-wave-line"></span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Middle Grid Area: Threat Graph (Left) & XAI Card (Right) */}
              <div className="db-middle-row">
                {/* Threat Graph Card */}
                <div className="db-card threat-graph-card">
                  <div className="card-header">
                    <div>
                      <h3 className="card-title">Quantum-Topological Threat Graph</h3>
                      <p className="card-subtitle">Directed Hypergraph Telemetry Correlation</p>
                    </div>
                    <div className="graph-controls">
                      <button className="btn-graph-ctrl active">3D</button>
                      <button className="btn-graph-ctrl"><Plus size={12} /></button>
                      <button className="btn-graph-ctrl"><Minus size={12} /></button>
                      <button className="btn-graph-ctrl"><Maximize2 size={12} /></button>
                    </div>
                  </div>

                  <div className="db-graph-legend">
                    <span className="db-legend-item"><span className="db-legend-dot purple"></span>IP Address</span>
                    <span className="db-legend-item"><span className="db-legend-dot green"></span>User</span>
                    <span className="db-legend-item"><span className="db-legend-dot teal"></span>Transaction</span>
                    <span className="db-legend-item"><span className="db-legend-dot orange"></span>Device</span>
                    <span className="db-legend-item"><span className="db-legend-dot red"></span>SWIFT Msg</span>
                    <span className="db-legend-item"><span className="db-legend-dot hyper"></span>Hyperedge</span>
                  </div>

                  <div className="graph-container">
                    <svg className="threat-svg" viewBox="0 0 600 300">
                      {/* Hyperedges (Glow regions) */}
                      {/* Credential stuffing cluster (Blue) */}
                      <path d="M 120 70 Q 180 60 260 120 Q 200 230 120 220 Z" fill="rgba(99, 102, 241, 0.04)" stroke="rgba(99, 102, 241, 0.15)" strokeWidth={1.5} strokeDasharray="3,3" />
                      
                      {/* SWIFT payment flow (Orange) */}
                      <path d="M 260 120 Q 380 90 440 100 Q 420 230 300 160 Z" fill="rgba(245, 158, 11, 0.04)" stroke="rgba(245, 158, 11, 0.15)" strokeWidth={1.5} strokeDasharray="3,3" />

                      {/* Exfiltration pathway (Red) */}
                      <path d="M 280 170 Q 400 130 480 200 Q 320 250 120 220 Z" fill="rgba(239, 68, 68, 0.03)" stroke="rgba(239, 68, 68, 0.12)" strokeWidth={1.5} strokeDasharray="3,3" />

                      {/* Hyperedge Labels */}
                      <text x="140" y="65" fill="#a5b4fc" fontSize="9" fontWeight="600" opacity="0.6">Hyperedge: VPN Auth Group</text>
                      <text x="340" y="95" fill="#fde047" fontSize="9" fontWeight="600" opacity="0.6">Hyperedge: SWIFT Payment Flow</text>
                      <text x="250" y="235" fill="#fca5a5" fontSize="9" fontWeight="600" opacity="0.6">Hyperedge: Exfiltration Pathway</text>

                      {/* Links */}
                      <line x1={160} y1={80} x2={300} y2={160} stroke="#e2e8f0" strokeWidth={1.5} />
                      <line x1={120} y1={220} x2={300} y2={160} stroke="#e2e8f0" strokeWidth={1.5} />
                      <line x1={420} y1={110} x2={300} y2={160} stroke="#e2e8f0" strokeWidth={1.5} />
                      <line x1={480} y1={200} x2={300} y2={160} stroke="#e2e8f0" strokeWidth={1.5} strokeDasharray="2,2" />
                      <line x1={160} y1={80} x2={120} y2={220} stroke="#e2e8f0" strokeWidth={1.5} />
                      <line x1={420} y1={110} x2={480} y2={200} stroke="#e2e8f0" strokeWidth={1.5} />

                      {/* Render nodes */}
                      {graphNodes.map(node => {
                        const isActive = currentSimulationStep?.activeNodes.includes(node.id);
                        const isSelected = selectedDashboardNode?.id === node.id;
                        
                        return (
                          <g 
                            key={node.id} 
                            className={`graph-node-group ${isSelected ? 'selected' : ''}`}
                            onClick={() => setSelectedDashboardNode(node)}
                            style={{ cursor: 'pointer' }}
                          >
                            {/* Glowing rings for active simulation nodes */}
                            {isActive && (
                              <>
                                <circle cx={node.x} cy={node.y} r={28} fill="none" stroke="#ef4444" strokeWidth={1} opacity={0.3} className="pulse-ring-slow" />
                                <circle cx={node.x} cy={node.y} r={20} fill="none" stroke="#ef4444" strokeWidth={1.5} opacity={0.6} className="pulse-ring" />
                              </>
                            )}

                            {/* Node outer boundary on selection */}
                            {isSelected && (
                              <circle cx={node.x} cy={node.y} r={22} fill="none" stroke="#4f46e5" strokeWidth={2} />
                            )}

                            {/* Node Core */}
                            <circle cx={node.x} cy={node.y} r={14} fill={node.id === 'swift' && isActive ? '#ef4444' : '#ffffff'} stroke={node.color} strokeWidth={3} />

                            {/* Node Alert Icon or Core Fill */}
                            {node.id === 'swift' && isActive ? (
                              <g transform={`translate(${node.x - 6}, ${node.y - 6})`}>
                                <path d="M6 2L1 11h10L6 2z" fill="#ffffff" />
                                <rect x="5.5" y="5.5" width="1" height="3" fill="#ef4444" />
                                <circle cx="6" cy="9.5" r="0.5" fill="#ef4444" />
                              </g>
                            ) : (
                              <circle cx={node.x} cy={node.y} r={5} fill={node.color} />
                            )}

                            {/* Text labels */}
                            <text x={node.x} y={node.y + 24} textAnchor="middle" className="graph-node-label" fill="#1e293b" fontWeight="600" fontSize="10.5">
                              {node.label}
                            </text>
                          </g>
                        );
                      })}
                    </svg>
                  </div>
                </div>

                {/* Explainable AI panel */}
                <div className="db-card xai-card">
                  <div className="card-header">
                    <div>
                      <h3 className="card-title">Explainable AI (XAI)</h3>
                      <p className="card-subtitle">Local Feature Attribution Weights</p>
                    </div>
                  </div>

                  <div className="xai-alert-banner">
                    <AlertTriangle size={16} className="xai-banner-icon" />
                    <div>
                      <span className="xai-banner-title">{dashboardXaiTitle}</span>
                      <p className="xai-banner-desc">{dashboardXaiDesc}</p>
                    </div>
                  </div>

                  <div className="xai-factors-list">
                    <span className="xai-list-title">Key Risk Contributors:</span>
                    {dashboardXaiFactors.map((factor, idx) => (
                      <div key={idx} className="xai-factor-item">
                        <div className="xai-factor-header">
                          <span className="factor-label">{factor.label}</span>
                          <span className="factor-percentage">{factor.value}%</span>
                        </div>
                        <div className="factor-progress-bg">
                          <div 
                            className="factor-progress-bar" 
                            style={{ 
                              width: `${factor.value}%`, 
                              backgroundColor: factor.color || '#4f46e5' 
                            }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="xai-footer">
                    <div className="xai-confidence">
                      <span>Model Confidence:</span>
                      <strong>92.7%</strong>
                    </div>
                    <button className="btn-xai-deepdive" onClick={() => setDashboardTab('XAI Insights')}>
                      <span>Full Attributions</span>
                      <ChevronRight size={12} />
                    </button>
                  </div>
                </div>
              </div>

              {/* Bottom Grid Area: Quantum Monitor (Left) & Live Alerts (Right) */}
              <div className="db-bottom-row">
                {/* Quantum topological monitoring card */}
                <div className="db-card quantum-monitor-card">
                  <div className="card-header">
                    <div>
                      <h3 className="card-title">Quantum-Topological Monitoring</h3>
                      <p className="card-subtitle">Real-time persistent homology &amp; entanglement entropy</p>
                    </div>
                    <div className="monitor-status">
                      <span className="status-dot green animate"></span>
                      <span>Live</span>
                    </div>
                  </div>

                  <div className="quantum-charts-grid">
                    {/* Entropy */}
                    <div className="db-chart-container">
                      <div className="db-chart-header">
                        <span className="chart-label">Entanglement Entropy</span>
                        <span className="chart-val">{dashboardQuantumData.entropy[dashboardQuantumData.entropy.length - 1].value}</span>
                      </div>
                      <div className="chart-wrapper-mini">
                        <ResponsiveContainer width="100%" height={50}>
                          <AreaChart data={dashboardQuantumData.entropy}>
                            <defs>
                              <linearGradient id="dbColorEntropy" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.2}/>
                                <stop offset="95%" stopColor="#4f46e5" stopOpacity={0}/>
                              </linearGradient>
                            </defs>
                            <Area type="monotone" dataKey="value" stroke="#4f46e5" strokeWidth={1.5} fillOpacity={1} fill="url(#dbColorEntropy)" />
                          </AreaChart>
                        </ResponsiveContainer>
                      </div>
                      <span className="chart-desc">Entropy drop signals potential harvesting tap.</span>
                    </div>

                    {/* Betti-0 */}
                    <div className="db-chart-container">
                      <div className="db-chart-header">
                        <span className="chart-label">Betti-0 (Connectivity)</span>
                        <span className="chart-val">{dashboardQuantumData.betti0[dashboardQuantumData.betti0.length - 1].value}</span>
                      </div>
                      <div className="chart-wrapper-mini">
                        <ResponsiveContainer width="100%" height={50}>
                          <AreaChart data={dashboardQuantumData.betti0}>
                            <defs>
                              <linearGradient id="dbColorB0" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.2}/>
                                <stop offset="95%" stopColor="#f59e0b" stopOpacity={0}/>
                              </linearGradient>
                            </defs>
                            <Area type="monotone" dataKey="value" stroke="#f59e0b" strokeWidth={1.5} fillOpacity={1} fill="url(#dbColorB0)" />
                          </AreaChart>
                        </ResponsiveContainer>
                      </div>
                      <span className="chart-desc">Connected nodes count in transaction complex.</span>
                    </div>

                    {/* Betti-1 */}
                    <div className="db-chart-container">
                      <div className="db-chart-header">
                        <span className="chart-label">Betti-1 (Cycles)</span>
                        <span className="chart-val">{dashboardQuantumData.betti1[dashboardQuantumData.betti1.length - 1].value}</span>
                      </div>
                      <div className="chart-wrapper-mini">
                        <ResponsiveContainer width="100%" height={50}>
                          <AreaChart data={dashboardQuantumData.betti1}>
                            <defs>
                              <linearGradient id="dbColorB1" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#7c3aed" stopOpacity={0.2}/>
                                <stop offset="95%" stopColor="#7c3aed" stopOpacity={0}/>
                              </linearGradient>
                            </defs>
                            <Area type="monotone" dataKey="value" stroke="#7c3aed" strokeWidth={1.5} fillOpacity={1} fill="url(#dbColorB1)" />
                          </AreaChart>
                        </ResponsiveContainer>
                      </div>
                      <span className="chart-desc">Circular transaction loops (money laundering).</span>
                    </div>

                    {/* Betti-2 */}
                    <div className="db-chart-container">
                      <div className="db-chart-header">
                        <span className="chart-label">Betti-2 (Voids)</span>
                        <span className="chart-val">{dashboardQuantumData.betti2[dashboardQuantumData.betti2.length - 1].value}</span>
                      </div>
                      <div className="chart-wrapper-mini">
                        <ResponsiveContainer width="100%" height={50}>
                          <AreaChart data={dashboardQuantumData.betti2}>
                            <defs>
                              <linearGradient id="dbColorB2" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#10b981" stopOpacity={0.2}/>
                                <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                              </linearGradient>
                            </defs>
                            <Area type="monotone" dataKey="value" stroke="#10b981" strokeWidth={1.5} fillOpacity={1} fill="url(#dbColorB2)" />
                          </AreaChart>
                        </ResponsiveContainer>
                      </div>
                      <span className="chart-desc">Higher-dimensional voids (hidden channels).</span>
                    </div>
                  </div>
                </div>

                {/* Live Alerts Feed */}
                <div className="db-card alerts-feed-card">
                  <div className="card-header">
                    <div>
                      <h3 className="card-title">Live Alerts</h3>
                      <p className="card-subtitle">Correlated Threat Log Queue</p>
                    </div>
                    <button className="btn-view-all" onClick={() => setDashboardTab('Alerts')}>View All</button>
                  </div>

                  <div className="db-alerts-list">
                    {[
                      { id: 1, title: 'High Risk Transaction Detected', desc: 'SWIFT MT103 • 88% Confidence', time: '2m ago', active: currentStep >= 3, risk: 'critical' },
                      { id: 2, title: 'Anomalous Login Pattern', desc: 'User: admin@bank.com', time: '5m ago', active: currentStep >= 0, risk: 'high' },
                      { id: 3, title: 'BGP Route Anomaly', desc: 'AS13335 • 2 prefixes affected', time: '8m ago', active: currentStep >= 4, risk: 'high' },
                      { id: 4, title: 'Malware Communication', desc: 'Outbound to 185.199.108.133', time: '12m ago', active: currentStep >= 5, risk: 'medium' },
                      { id: 5, title: 'Data Exfiltration Attempt', desc: 'Vol. deviation • 78% Confidence', time: '15m ago', active: currentStep >= 5, risk: 'critical' }
                    ].map(alert => (
                      <div key={alert.id} className={`db-alert-item ${alert.active ? 'active' : 'inactive'} ${alert.risk}`}>
                        <div className="alert-item-left">
                          <div className={`alert-severity-dot ${alert.risk}`}></div>
                          <div className="alert-text">
                            <span className="alert-title">{alert.title}</span>
                            <span className="alert-desc">{alert.desc}</span>
                          </div>
                        </div>
                        <span className="alert-time">{alert.time}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Timeline Simulator Player (Bottom) */}
              <div className="db-card timeline-simulator-card">
                <div className="timeline-player-controls">
                  <button 
                    className="btn-player-action" 
                    onClick={() => {
                      if (currentStep === simulationSteps.length - 1) {
                        setCurrentStep(0);
                      }
                      setIsPlaying(!isPlaying);
                    }}
                  >
                    {isPlaying ? <Pause size={16} fill="#1e293b" /> : <Play size={16} fill="#1e293b" />}
                  </button>
                  <button 
                    className="btn-player-action"
                    onClick={() => {
                      setIsPlaying(false);
                      setCurrentStep(0);
                      setSelectedDashboardNode(null);
                    }}
                    title="Reset Simulation"
                  >
                    <RefreshCw size={14} />
                  </button>

                  <div className="player-meta">
                    <span className="player-meta-title">HNDL Attack Simulation Timeline</span>
                    <span className="player-meta-subtitle">Step {simulationSteps[currentStep].step} of G: {simulationSteps[currentStep].desc}</span>
                  </div>
                </div>

                <div className="timeline-track-wrapper">
                  <div className="timeline-progress-line" style={{ width: `${(currentStep / (simulationSteps.length - 1)) * 100}%` }}></div>
                  <div className="timeline-track">
                    {simulationSteps.map((step, idx) => {
                      const isActive = idx <= currentStep;
                      const isCurrent = idx === currentStep;
                      return (
                        <div 
                          key={step.index} 
                          className={`timeline-step-node ${isActive ? 'active' : ''} ${isCurrent ? 'current' : ''}`}
                          onClick={() => {
                            setIsPlaying(false);
                            setCurrentStep(idx);
                            setSelectedDashboardNode(null);
                          }}
                        >
                          <div className="step-circle">{step.step}</div>
                          <div className="step-tooltip">
                            <span className="tooltip-time">{step.time}</span>
                            <span className="tooltip-title">{step.title}</span>
                            <span className="tooltip-desc">{step.desc}</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>

        {/* Interactive Scenario Modal */}
        {showScenarioModal && (
          <div className="scenario-modal-overlay" onClick={() => setShowScenarioModal(false)}>
            <div className="scenario-modal-content" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header">
                <h3>Harvest Now Decrypt Later (HNDL) Scenario Details</h3>
                <button className="btn-close-modal" onClick={() => setShowScenarioModal(false)}>×</button>
              </div>
              <div className="modal-body">
                <p>
                  <strong>Harvest Now Decrypt Later (HNDL)</strong> is an emerging quantum cybersecurity threat vector. Adversaries intercept and store encrypted banking communications and TLS handshakes today. While they cannot read the payloads today, they store the staged data packets to decrypt them when cryptographically relevant quantum computers (CRQCs) become mature.
                </p>
                <div className="modal-section">
                  <h4>QTD-HGNN Defense Strategy:</h4>
                  <ul>
                    <li>
                      <strong>Persistent Homology (Betti Curves):</strong> Tracks persistent topological voids and circular cycles across multiple banking data flows. Anomalous traffic structures (Betti-1, Betti-2 spike) identify unauthorized routing pivots that signature-based firewalls fail to see.
                    </li>
                    <li>
                      <strong>Entanglement Entropy Monitor:</strong> Identifies subtle entropy fluctuations or micro-latencies during optical network taps, flag-marking active harvesting sniffing attempts in real-time.
                    </li>
                    <li>
                      <strong>Explainable AI Attributions:</strong> Gives SOC analysts exact mathematical confidence values (Shapley feature contributions) describing why an alert was flagged, enabling rapid isolation and playbook execution.
                    </li>
                  </ul>
                </div>
                <div className="simulation-status-box">
                  <strong>Current Simulation Step:</strong> {simulationSteps[currentStep].title} ({simulationSteps[currentStep].time})
                  <p>{simulationSteps[currentStep].details}</p>
                </div>
              </div>
              <div className="modal-footer">
                <button className="btn-modal-close-cta" onClick={() => setShowScenarioModal(false)}>Close Overview</button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="landing-page">
      {/* Navbar */}
      <header className="navbar">
        <div className="container nav-container">
          <div className="logo-container">
            <div className="logo-icon">
              <Shield size={22} strokeWidth={2.5} />
            </div>
            <div className="logo-text">
              <span className="logo-title">QTD-HGNN</span>
              <span className="logo-subtitle">Quantum Threat Defense</span>
            </div>
          </div>

          <ul className="nav-links">
            <li><a href="#platform" className="nav-link">Platform</a></li>
            <li><a href="#features" className="nav-link">Features</a></li>
            <li><a href="#technology" className="nav-link">Technology</a></li>
            <li><a href="#usecases" className="nav-link">Use Cases</a></li>
            <li><a href="#prototypes" className="nav-link">Prototypes</a></li>
            <li><a href="#about" className="nav-link">About Us</a></li>
          </ul>

          <div className="nav-actions">
            <div className="status-pill">
              <span className="status-dot"></span>
              <span>SOC Analyst View</span>
            </div>
            <button className="btn-request-demo">Request Demo</button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="container">
          <div className="hero-grid">
            {/* Hero Left */}
            <div className="hero-left">
              <div className="hero-pill">
                <span>✦</span>
                <span>Next-Gen Quantum Threat Detection</span>
              </div>
              <h1 className="hero-title">
                See Threats Before 
                <span className="gradient-text">They Strike.</span>
              </h1>
              <p className="hero-desc">
                QTD-HGNN combines Quantum Topological AI with Hypergraph Neural Networks to detect complex, multi-stage cyber attacks that traditional systems miss.
              </p>
              <div className="hero-buttons">
                <a href="#prototypes" className="btn-explore">
                  <Play size={16} fill="white" />
                  Explore Live Demo
                </a>
                <a href="#about" className="btn-how-it-works">
                  <BookOpen size={16} />
                  How It Works
                </a>
              </div>
              
              <div className="hero-trust">
                <span className="trust-title">Trusted by</span>
                <div className="trust-stats">
                  <div className="stat-item">
                    <span className="stat-value">99.97%</span>
                    <span className="stat-label">Detection Accuracy</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-value">&lt; 50ms</span>
                    <span className="stat-label">Avg. Response Time</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-value">24/7</span>
                    <span className="stat-label">Quantum Monitoring</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Hero Right - Interactive SOC Dashboard Mockup (1:1 Restored Original layout) */}
            <div className="hero-right">
              <div className="soc-mockup">
                {/* Mockup Header */}
                <div className="mockup-header">
                  <div className="mockup-logo">
                    <div className="mockup-logo-icon">
                      <Shield size={10} strokeWidth={2.5} />
                    </div>
                    <span>QTD-HGNN SOC</span>
                  </div>
                  <div className="mockup-header-right">
                    <div className="mockup-dropdown">
                      <span>Last 1 Hour</span>
                      <ChevronDown size={10} />
                    </div>
                    <div className="mockup-analyst">
                      <div className="analyst-avatar">A3</div>
                      <div className="analyst-info">
                        <span className="analyst-name">Analyst</span>
                        <span className="analyst-level">Level 3</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mockup-body">
                  {/* Sidebar */}
                  <div className="mockup-sidebar">
                    <button className={`sidebar-item ${mockupActiveTab === 'Overview' ? 'active' : ''}`} onClick={() => { setMockupActiveTab('Overview'); setSelectedMockupNode(null); }}>
                      <Layers size={12} />
                      <span>Overview</span>
                    </button>
                    <button className={`sidebar-item ${mockupActiveTab === 'ThreatGraph' ? 'active' : ''}`} onClick={() => setMockupActiveTab('ThreatGraph')}>
                      <Network size={12} />
                      <span>Threat Graph</span>
                    </button>
                    <button className={`sidebar-item ${mockupActiveTab === 'Alerts' ? 'active' : ''}`} onClick={() => setMockupActiveTab('Alerts')}>
                      <AlertTriangle size={12} />
                      <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        Alerts <span className="badge-count">12</span>
                      </span>
                    </button>
                    <button className={`sidebar-item ${mockupActiveTab === 'XAI' ? 'active' : ''}`} onClick={() => setMockupActiveTab('XAI')}>
                      <Brain size={12} />
                      <span>XAI Insights</span>
                    </button>
                    <button className={`sidebar-item ${mockupActiveTab === 'Quantum' ? 'active' : ''}`} onClick={() => setMockupActiveTab('Quantum')}>
                      <Activity size={12} />
                      <span>Quantum Monitor</span>
                    </button>
                    <button className="sidebar-item">
                      <FileText size={12} />
                      <span>Cases</span>
                    </button>
                    <button className="sidebar-item">
                      <Monitor size={12} />
                      <span>Reports</span>
                    </button>
                    <button className="sidebar-item">
                      <Settings size={12} />
                      <span>Settings</span>
                    </button>
                  </div>

                  {/* Main Content Area */}
                  <div className="mockup-content">
                    <div className="content-title">System Overview</div>
                    
                    {/* Stats Row */}
                    <div className="mockup-stats-row">
                      <div className="mockup-stat-card">
                        <span className="m-stat-label">Threat Score</span>
                        <div className="m-stat-value-row">
                          <span className="m-stat-value">87</span>
                          <span className="m-stat-badge red">High Risk</span>
                        </div>
                      </div>
                      <div className="mockup-stat-card">
                        <span className="m-stat-label">Active Threats</span>
                        <div className="m-stat-value-row">
                          <span className="m-stat-value">12</span>
                          <span className="m-stat-badge red">+3 new</span>
                        </div>
                      </div>
                      <div className="mockup-stat-card">
                        <span className="m-stat-label">Monitored Entities</span>
                        <div className="m-stat-value-row">
                          <span className="m-stat-value">8,547</span>
                          <span className="m-stat-badge green">+11%</span>
                        </div>
                      </div>
                      <div className="mockup-stat-card">
                        <span className="m-stat-label">Response Time</span>
                        <div className="m-stat-value-row">
                          <span className="m-stat-value">42ms</span>
                          <span className="m-stat-badge green">Optimal</span>
                        </div>
                      </div>
                    </div>

                    {/* Threat Hypergraph and Explainable AI */}
                    <div className="mockup-visuals-grid">
                      {/* Threat Hypergraph */}
                      <div className="mockup-card">
                        <div className="card-header-row">
                          <span className="card-title">Threat Hypergraph</span>
                          <div className="card-controls">
                            <button className="btn-m-pill">2D</button>
                            <button className="btn-m-pill active">3D</button>
                            <button className="btn-m-pill" onClick={() => setSelectedMockupNode(null)}>Reset</button>
                          </div>
                        </div>
                        
                        <div className="hypergraph-view">
                          {/* Interactive SVG Network Graph */}
                          <svg width="100%" height="100%" viewBox="0 0 300 200" style={{ pointerEvents: 'auto' }}>
                            {/* Hyperedges representing correlations (glowing large ellipses) */}
                            <ellipse cx="150" cy="110" rx="90" ry="60" fill="none" stroke="rgba(99, 102, 241, 0.08)" strokeWidth="6" strokeDasharray="3,3" />
                            <ellipse cx="140" cy="100" rx="70" ry="40" fill="none" stroke="rgba(124, 58, 237, 0.1)" strokeWidth="2" />
                            
                            {/* Inner correlation connections (bezier curves) */}
                            {mockupNodes.map((node, i) => {
                              return mockupNodes.slice(i + 1).map((targetNode) => (
                                <path 
                                  key={`${node.id}-${targetNode.id}`} 
                                  d={`M ${node.x} ${node.y} Q 150 100 ${targetNode.x} ${targetNode.y}`} 
                                  fill="none" 
                                  stroke={selectedMockupNode && (selectedMockupNode.id === node.id || selectedMockupNode.id === targetNode.id) ? 'var(--primary)' : 'rgba(226, 232, 240, 0.8)'} 
                                  strokeWidth={selectedMockupNode && (selectedMockupNode.id === node.id || selectedMockupNode.id === targetNode.id) ? '1.5' : '0.5'}
                                  strokeOpacity={selectedMockupNode && (selectedMockupNode.id !== node.id && selectedMockupNode.id !== targetNode.id) ? '0.2' : '1'}
                                />
                              ))
                            })}

                            {/* Interactive Nodes */}
                            {mockupNodes.map(node => (
                              <g 
                                key={node.id} 
                                transform={`translate(${node.x}, ${node.y})`}
                                style={{ cursor: 'pointer' }}
                                onClick={() => setSelectedMockupNode(node)}
                              >
                                {/* Glowing background ring */}
                                <circle 
                                  r={node.size + 4} 
                                  fill="none" 
                                  stroke={node.color} 
                                  strokeWidth="2" 
                                  strokeOpacity={selectedMockupNode && selectedMockupNode.id === node.id ? '0.6' : '0'} 
                                  className={selectedMockupNode && selectedMockupNode.id === node.id ? 'pulsing-ring' : ''}
                                />
                                {/* Main node circle */}
                                <circle r={selectedMockupNode && selectedMockupNode.id === node.id ? node.size + 1 : node.size} fill={node.color} opacity="0.95" />
                                {/* Core dot */}
                                <circle r="3" fill="white" />
                                {/* Label text */}
                                <text y={node.size + 9} textAnchor="middle" fill="#0f172a" fontSize="6.5" fontWeight="700" style={{ pointerEvents: 'none' }}>
                                  {node.label}
                                </text>
                              </g>
                            ))}
                          </svg>

                          {/* Interactive Graph Legend */}
                          <div className="graph-legend">
                            <div className="legend-item">
                              <span className="legend-color" style={{ backgroundColor: '#f59e0b' }}></span>
                              <span>Transaction</span>
                            </div>
                            <div className="legend-item">
                              <span className="legend-color" style={{ backgroundColor: '#10b981' }}></span>
                              <span>Identity</span>
                            </div>
                            <div className="legend-item">
                              <span className="legend-color" style={{ backgroundColor: '#ef4444' }}></span>
                              <span>Alert</span>
                            </div>
                            <div className="legend-item">
                              <span className="legend-color" style={{ backgroundColor: '#a78bfa' }}></span>
                              <span>Device</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Explainable AI */}
                      <div className="mockup-card xai-panel">
                        <span className="card-title">Explainable AI (XAI)</span>
                        <div className="xai-alert-pill">
                          {mockupXaiTitle}
                        </div>
                        <span className="xai-prompt">
                          {mockupXaiDesc}
                        </span>
                        
                        <div className="xai-factors">
                          {mockupXaiFactors.map((factor) => {
                            const isHighlighted = selectedMockupNode && selectedMockupNode.label === factor.label;
                            return (
                              <div className="xai-factor-item" key={factor.label} style={{ opacity: selectedMockupNode && !isHighlighted ? '0.4' : '1', transition: 'all 0.3s' }}>
                                <div className="factor-header">
                                  <span>{factor.label}</span>
                                  <span style={{ color: factor.color }}>{selectedMockupNode && isHighlighted ? selectedMockupNode.contribution : `${factor.value}%`}</span>
                                </div>
                                <div className="factor-bar-bg">
                                  <div 
                                    className="factor-bar" 
                                    style={{ 
                                      width: `${selectedMockupNode && isHighlighted ? parseInt(selectedMockupNode.contribution) : factor.value}%`, 
                                      backgroundColor: factor.color,
                                      boxShadow: selectedMockupNode && isHighlighted ? `0 0 8px ${factor.color}` : 'none'
                                    }}
                                  ></div>
                                </div>
                                <span className="factor-desc">{factor.desc}</span>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>

                    {/* Quantum Topological Monitoring Row */}
                    <div className="mockup-charts-card">
                      <span className="card-title">Quantum Topological Monitoring</span>
                      <div className="mockup-charts-grid">
                        {/* Entanglement Entropy */}
                        <div className="chart-wrapper">
                          <div className="chart-header">
                            <span>Entanglement Entropy</span>
                            <span className="chart-header-value">
                              {mockupQuantumData.entropy[mockupQuantumData.entropy.length - 1].value}
                            </span>
                          </div>
                          <div className="chart-container-mini">
                            <ResponsiveContainer width="100%" height="100%">
                              <AreaChart data={mockupQuantumData.entropy}>
                                <defs>
                                  <linearGradient id="colorEntropy" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.2}/>
                                    <stop offset="95%" stopColor="#4f46e5" stopOpacity={0}/>
                                  </linearGradient>
                                </defs>
                                <Area type="monotone" dataKey="value" stroke="#4f46e5" strokeWidth={1.5} fillOpacity={1} fill="url(#colorEntropy)" />
                              </AreaChart>
                            </ResponsiveContainer>
                          </div>
                        </div>

                        {/* Betti-0 */}
                        <div className="chart-wrapper">
                          <div className="chart-header">
                            <span>Betti-0 (Connectivity)</span>
                            <span className="chart-header-value">
                              {mockupQuantumData.betti0[mockupQuantumData.betti0.length - 1].value}
                            </span>
                          </div>
                          <div className="chart-container-mini">
                            <ResponsiveContainer width="100%" height="100%">
                              <AreaChart data={mockupQuantumData.betti0}>
                                <defs>
                                  <linearGradient id="colorB0" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.2}/>
                                    <stop offset="95%" stopColor="#f59e0b" stopOpacity={0}/>
                                  </linearGradient>
                                </defs>
                                <Area type="monotone" dataKey="value" stroke="#f59e0b" strokeWidth={1.5} fillOpacity={1} fill="url(#colorB0)" />
                              </AreaChart>
                            </ResponsiveContainer>
                          </div>
                        </div>

                        {/* Betti-1 */}
                        <div className="chart-wrapper">
                          <div className="chart-header">
                            <span>Betti-1 (Cycles)</span>
                            <span className="chart-header-value">
                              {mockupQuantumData.betti1[mockupQuantumData.betti1.length - 1].value}
                            </span>
                          </div>
                          <div className="chart-container-mini">
                            <ResponsiveContainer width="100%" height="100%">
                              <AreaChart data={mockupQuantumData.betti1}>
                                <defs>
                                  <linearGradient id="colorB1" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#7c3aed" stopOpacity={0.2}/>
                                    <stop offset="95%" stopColor="#7c3aed" stopOpacity={0}/>
                                  </linearGradient>
                                </defs>
                                <Area type="monotone" dataKey="value" stroke="#7c3aed" strokeWidth={1.5} fillOpacity={1} fill="url(#colorB1)" />
                              </AreaChart>
                            </ResponsiveContainer>
                          </div>
                        </div>

                        {/* Betti-2 */}
                        <div className="chart-wrapper">
                          <div className="chart-header">
                            <span>Betti-2 (Voids)</span>
                            <span className="chart-header-value">
                              {mockupQuantumData.betti2[mockupQuantumData.betti2.length - 1].value}
                            </span>
                          </div>
                          <div className="chart-container-mini">
                            <ResponsiveContainer width="100%" height="100%">
                              <AreaChart data={mockupQuantumData.betti2}>
                                <defs>
                                  <linearGradient id="colorB2" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.2}/>
                                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                                  </linearGradient>
                                </defs>
                                <Area type="monotone" dataKey="value" stroke="#10b981" strokeWidth={1.5} fillOpacity={1} fill="url(#colorB2)" />
                              </AreaChart>
                            </ResponsiveContainer>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Integrated Features Bar */}
        <div className="features-bar-wrapper" id="features">
          <div className="features-bar">
            {/* Feature 1 */}
            <div className="feature-item">
              <div className="feature-icon-container purple">
                <Layers size={18} />
              </div>
              <div className="feature-text">
                <h4 className="feature-title">Quantum Topological AI</h4>
                <p className="feature-desc">Leverages quantum metrics &amp; topological data analysis to spot stealthy threats.</p>
              </div>
            </div>

            <div className="feature-divider"></div>

            {/* Feature 2 */}
            <div className="feature-item">
              <div className="feature-icon-container green">
                <Network size={18} />
              </div>
              <div className="feature-text">
                <h4 className="feature-title">Hypergraph Neural Networks</h4>
                <p className="feature-desc">Models complex relationships across heterogeneous security telemetry.</p>
              </div>
            </div>

            <div className="feature-divider"></div>

            {/* Feature 3 */}
            <div className="feature-item">
              <div className="feature-icon-container orange">
                <Brain size={18} />
              </div>
              <div className="feature-text">
                <h4 className="feature-title">Explainable AI (XAI)</h4>
                <p className="feature-desc">Transparent insights with attention weights and risk contributions.</p>
              </div>
            </div>

            <div className="feature-divider"></div>

            {/* Feature 4 */}
            <div className="feature-item">
              <div className="feature-icon-container blue">
                <Monitor size={18} />
              </div>
              <div className="feature-text">
                <h4 className="feature-title">Real-time SOC Dashboard</h4>
                <p className="feature-desc">Interactive visualization for faster decisions and proactive response.</p>
              </div>
            </div>

            <div className="feature-divider"></div>

            {/* Feature 5 */}
            <div className="feature-item">
              <div className="feature-icon-container indigo">
                <Shield size={18} />
              </div>
              <div className="feature-text">
                <h4 className="feature-title">Enterprise Ready</h4>
                <p className="feature-desc">Scalable, secure &amp; built for modern SOC and threat hunting teams.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Explore Prototype Implementations Grid Section */}
      <section className="prototypes-section" id="prototypes">
        <div className="container">
          <div className="prototypes-header">
            <h2 className="prototypes-title">Explore Prototype Implementations</h2>
            <p className="prototypes-subtitle">
              We built multiple prototypes to demonstrate the power and versatility of QTD-HGNN.
            </p>
          </div>

          <div className="prototypes-grid">
            {/* Option 1 */}
            <div className="prototype-card">
              <div className="p-card-left">
                <span className="p-option-pill purple">Option 1</span>
                <h3 className="p-title">Premium SOC Dashboard</h3>
                <p className="p-desc">
                  Stunning interactive dashboard with 3D hypergraph visualization, XAI panel, and quantum monitoring.
                </p>
                <a href="#" className="btn-view-prototype" onClick={(e) => { e.preventDefault(); setCurrentView('dashboard'); }}>
                  <span>View Prototype</span>
                  <ArrowRight size={12} />
                </a>
              </div>
              <div className="p-card-right">
                <div className="p-thumbnail">
                  <div className="thumb-dashboard">
                    <div className="thumb-circle">
                      <span className="thumb-node n1"></span>
                      <span className="thumb-node n2"></span>
                      <span className="thumb-node n3"></span>
                      <span className="thumb-node n4"></span>
                    </div>
                    <div className="thumb-pulse">
                      <span className="thumb-pulse-dot"></span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Option 2 */}
            <div className="prototype-card">
              <div className="p-card-left">
                <span className="p-option-pill green">Option 2</span>
                <h3 className="p-title">Python Data Pipeline</h3>
                <p className="p-desc">
                  Data processing pipeline with graph algorithms and Streamlit dashboard for analytics.
                </p>
                <a href="#" className="btn-view-prototype" onClick={(e) => e.preventDefault()}>
                  <span>View Prototype</span>
                  <ArrowRight size={12} />
                </a>
              </div>
              <div className="p-card-right">
                <div className="p-thumbnail">
                  <div className="thumb-pipeline">
                    <div className="pipeline-row">
                      <div className="pipeline-node active"></div>
                      <div className="pipeline-line active"></div>
                      <div className="pipeline-node active"></div>
                    </div>
                    <div className="pipeline-row">
                      <div className="pipeline-node active"></div>
                      <div className="pipeline-line"></div>
                      <div className="pipeline-node"></div>
                    </div>
                    <div className="pipeline-row">
                      <div className="pipeline-node"></div>
                      <div className="pipeline-line"></div>
                      <div className="pipeline-node active"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Option 3 */}
            <div className="prototype-card">
              <div className="p-card-left">
                <span className="p-option-pill orange">Option 3</span>
                <h3 className="p-title">Full-Stack Mockup</h3>
                <p className="p-desc">
                  FastAPI backend + React frontend with real-time data flow and enterprise architecture.
                </p>
                <a href="#" className="btn-view-prototype" onClick={(e) => e.preventDefault()}>
                  <span>View Prototype</span>
                  <ArrowRight size={12} />
                </a>
              </div>
              <div className="p-card-right">
                <div className="p-thumbnail">
                  <div className="thumb-fullstack">
                    <div className="fs-card">
                      <div className="fs-line header"></div>
                      <div className="fs-line active"></div>
                      <div className="fs-line"></div>
                      <div className="fs-line"></div>
                    </div>
                    <div className="fs-card">
                      <div className="fs-line header" style={{ backgroundColor: '#fed7aa' }}></div>
                      <div className="fs-line"></div>
                      <div className="fs-line active" style={{ backgroundColor: '#f97316' }}></div>
                      <div className="fs-line"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Bonus */}
            <div className="prototype-card">
              <div className="p-card-left">
                <span className="p-option-pill blue">Bonus</span>
                <h3 className="p-title">Mobile SOC Companion</h3>
                <p className="p-desc">
                  Mobile-optimized view for alerts, threat summary, and incident response on the go.
                </p>
                <a href="#" className="btn-view-prototype" onClick={(e) => e.preventDefault()}>
                  <span>View Prototype</span>
                  <ArrowRight size={12} />
                </a>
              </div>
              <div className="p-card-right">
                <div className="p-thumbnail">
                  <div className="thumb-mobile">
                    <div className="m-phone">
                      <span className="m-phone-notch"></span>
                      <div className="m-phone-item"></div>
                      <div className="m-phone-item red"></div>
                      <div className="m-phone-circle"></div>
                    </div>
                    <div className="m-phone" style={{ opacity: 0.6, transform: 'scale(0.9) translateY(4px)' }}>
                      <span className="m-phone-notch"></span>
                      <div className="m-phone-item"></div>
                      <div className="m-phone-item"></div>
                      <div className="m-phone-item"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="footer-section" id="about">
        <div className="container">
          <h4 className="footer-title">Securing the digital world with cutting-edge research and innovation</h4>
          <div className="partners-logos">
            <img src="/mit_logo.webp" alt="MIT" className="partner-logo-img mit" />
            <img src="/nus_logo.png" alt="NUS" className="partner-logo-img nus" />
            <img src="/eth_logo.webp" alt="ETH Zürich" className="partner-logo-img eth" />
            <img src="/cern_logo.webp" alt="CERN" className="partner-logo-img cern" />
            <div className="partner-logo-text google">
              <span>Google</span> Research
            </div>
            <div className="partner-logo-text ibm">
              <span>IBM</span> Research
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
