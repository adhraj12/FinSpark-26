import { useState, useEffect } from 'react';
import { 
  Shield, Play, BookOpen, ChevronDown, Activity, 
  Share2, AlertTriangle, Eye, Settings, FileText,
  Layers, Brain, Monitor, CheckCircle, Network, ArrowRight
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

function App() {
  // Navigation / Tab state for sidebar
  const [activeTab, setActiveTab] = useState('Overview');
  
  // Interactive nodes for Threat Hypergraph
  const [selectedNode, setSelectedNode] = useState(null);
  
  // Simulated live quantum metrics data
  const [quantumData, setQuantumData] = useState({
    entropy: generateInitialData(0.78, 0.08),
    betti0: generateInitialData(2.31, 0.2),
    betti1: generateInitialData(1.12, 0.15),
    betti2: generateInitialData(0.43, 0.05),
  });

  // Hypergraph Nodes definition
  const nodes = [
    { id: 'swift', label: 'SWIFT Anomaly', type: 'Transaction', x: 150, y: 110, size: 24, color: '#f59e0b', desc: 'Anomalous SWIFT wire transfer modification at 2:00 AM.', contribution: '88%' },
    { id: 'vpn', label: 'Treasury VPN', type: 'Identity', x: 70, y: 60, size: 14, color: '#10b981', desc: 'Concurrent logins from impossible geographic travel locations.', contribution: '61%' },
    { id: 'bgp', label: 'BGP Detour', type: 'Alert', x: 230, y: 70, size: 18, color: '#ef4444', desc: 'Active routing detour through hostile state autonomous systems.', contribution: '88%' },
    { id: 'optic', label: 'Optical Delay', type: 'Device', x: 80, y: 150, size: 12, color: '#a78bfa', desc: 'Micro-latency drift on encrypted transaction fiber cables.', contribution: '76%' },
    { id: 'mule', label: 'Mule Loop', type: 'IP Address', x: 210, y: 160, size: 14, color: '#06b6d4', desc: 'Circular multi-hop funds transfer matching money-laundering loops.', contribution: '44%' },
  ];

  // Live wiggling animation for quantum metrics
  useEffect(() => {
    const interval = setInterval(() => {
      setQuantumData(prev => {
        const updateSeries = (series, baseVal, variance) => {
          const newSeries = [...series.slice(1)];
          const lastVal = newSeries[newSeries.length - 1].value;
          const nextVal = Math.max(0, lastVal + (Math.random() - 0.5) * variance * 0.5);
          // clamp to stay within reasonable bounds of the base value
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

  // Explainable AI details based on selected node, or default global dashboard view
  const xaiTitle = selectedNode ? selectedNode.label : 'High Risk Transaction Detected';
  const xaiDesc = selectedNode ? selectedNode.desc : 'Correlation of 5 heterogeneous signals indicates active cyber-fraud intrusion.';
  const xaiFactors = [
    { label: 'Anomalous SWIFT Message', value: 88, color: '#f59e0b', desc: 'Unusual transfer pattern detected on payment rail.' },
    { label: 'Topological Correlation', value: 76, color: '#a78bfa', desc: 'Simplicial complex contains anomalous 1-dimensional loops.' },
    { label: 'Credential Stuffing Source', value: 61, color: '#10b981', desc: 'Session IP linked to high-frequency authentication attempts.' },
    { label: 'Behavioral Anomaly', value: 44, color: '#06b6d4', desc: 'Keyboard & cursor kinetics deviate from user baseline.' },
  ];

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

          {/* Hero Right - Interactive SOC Dashboard Mockup */}
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
                  <button className={`sidebar-item ${activeTab === 'Overview' ? 'active' : ''}`} onClick={() => { setActiveTab('Overview'); setSelectedNode(null); }}>
                    <Layers size={12} />
                    <span>Overview</span>
                  </button>
                  <button className={`sidebar-item ${activeTab === 'ThreatGraph' ? 'active' : ''}`} onClick={() => setActiveTab('ThreatGraph')}>
                    <Network size={12} />
                    <span>Threat Graph</span>
                  </button>
                  <button className={`sidebar-item ${activeTab === 'Alerts' ? 'active' : ''}`} onClick={() => setActiveTab('Alerts')}>
                    <AlertTriangle size={12} />
                    <span>Alerts</span>
                  </button>
                  <button className={`sidebar-item ${activeTab === 'XAI' ? 'active' : ''}`} onClick={() => setActiveTab('XAI')}>
                    <Brain size={12} />
                    <span>XAI Insights</span>
                  </button>
                  <button className={`sidebar-item ${activeTab === 'Quantum' ? 'active' : ''}`} onClick={() => setActiveTab('Quantum')}>
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
                          <button className="btn-m-pill" onClick={() => setSelectedNode(null)}>Reset</button>
                        </div>
                      </div>
                      
                      <div className="hypergraph-view">
                        {/* Interactive SVG Network Graph */}
                        <svg width="100%" height="100%" viewBox="0 0 300 200" style={{ pointerEvents: 'auto' }}>
                          {/* Hyperedges representing correlations (glowing large ellipses) */}
                          <ellipse cx="150" cy="110" rx="90" ry="60" fill="none" stroke="rgba(99, 102, 241, 0.08)" strokeWidth="6" strokeDasharray="3,3" />
                          <ellipse cx="140" cy="100" rx="70" ry="40" fill="none" stroke="rgba(124, 58, 237, 0.1)" strokeWidth="2" />
                          
                          {/* Inner correlation connections (bezier curves) */}
                          {nodes.map((node, i) => {
                            return nodes.slice(i + 1).map((targetNode) => (
                              <path 
                                key={`${node.id}-${targetNode.id}`} 
                                d={`M ${node.x} ${node.y} Q 150 100 ${targetNode.x} ${targetNode.y}`} 
                                fill="none" 
                                stroke={selectedNode && (selectedNode.id === node.id || selectedNode.id === targetNode.id) ? 'var(--primary)' : 'rgba(226, 232, 240, 0.8)'} 
                                strokeWidth={selectedNode && (selectedNode.id === node.id || selectedNode.id === targetNode.id) ? '1.5' : '0.5'}
                                strokeOpacity={selectedNode && (selectedNode.id !== node.id && selectedNode.id !== targetNode.id) ? '0.2' : '1'}
                              />
                            ))
                          })}

                          {/* Interactive Nodes */}
                          {nodes.map(node => (
                            <g 
                              key={node.id} 
                              transform={`translate(${node.x}, ${node.y})`}
                              style={{ cursor: 'pointer' }}
                              onClick={() => setSelectedNode(node)}
                            >
                              {/* Glowing background ring */}
                              <circle 
                                r={node.size + 4} 
                                fill="none" 
                                stroke={node.color} 
                                strokeWidth="2" 
                                strokeOpacity={selectedNode && selectedNode.id === node.id ? '0.6' : '0'} 
                                className={selectedNode && selectedNode.id === node.id ? 'pulsing-ring' : ''}
                              />
                              {/* Main node circle */}
                              <circle r={selectedNode && selectedNode.id === node.id ? node.size + 1 : node.size} fill={node.color} opacity="0.95" />
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
                        {xaiTitle}
                      </div>
                      <span className="xai-prompt">
                        {xaiDesc}
                      </span>
                      
                      <div className="xai-factors">
                        {xaiFactors.map((factor) => {
                          const isHighlighted = selectedNode && selectedNode.label === factor.label;
                          return (
                            <div className="xai-factor-item" key={factor.label} style={{ opacity: selectedNode && !isHighlighted ? '0.4' : '1', transition: 'all 0.3s' }}>
                              <div className="factor-header">
                                <span>{factor.label}</span>
                                <span style={{ color: factor.color }}>{selectedNode && isHighlighted ? selectedNode.contribution : `${factor.value}%`}</span>
                              </div>
                              <div className="factor-bar-bg">
                                <div 
                                  className="factor-bar" 
                                  style={{ 
                                    width: `${selectedNode && isHighlighted ? parseInt(selectedNode.contribution) : factor.value}%`, 
                                    backgroundColor: factor.color,
                                    boxShadow: selectedNode && isHighlighted ? `0 0 8px ${factor.color}` : 'none'
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
                            {quantumData.entropy[quantumData.entropy.length - 1].value}
                          </span>
                        </div>
                        <div className="chart-container-mini">
                          <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={quantumData.entropy}>
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
                            {quantumData.betti0[quantumData.betti0.length - 1].value}
                          </span>
                        </div>
                        <div className="chart-container-mini">
                          <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={quantumData.betti0}>
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
                            {quantumData.betti1[quantumData.betti1.length - 1].value}
                          </span>
                        </div>
                        <div className="chart-container-mini">
                          <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={quantumData.betti1}>
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
                            {quantumData.betti2[quantumData.betti2.length - 1].value}
                          </span>
                        </div>
                        <div className="chart-container-mini">
                          <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={quantumData.betti2}>
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
                <a href="#" className="btn-view-prototype" onClick={(e) => e.preventDefault()}>
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
