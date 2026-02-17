import './KrishiMitraCar.css';

const KrishiMitraCar = () => {
    return (
        <section id="krishi-car" className="krishi-car-section">
            <div className="container">
                <div className="section-header">
                    <h2 className="section-title">The Krishi Mitra Robot</h2>
                    <p className="section-subtitle">
                        An autonomous robotic vehicle designed specifically for modern farming
                    </p>
                </div>

                <div className="car-showcase">
                    <div className="car-visual">
                        <div className="car-illustration">
                            {/* Robot Car Illustration */}
                            <svg viewBox="0 0 400 300" className="car-svg">
                                {/* Body */}
                                <rect x="50" y="120" width="300" height="120" rx="20" fill="url(#carGradient)" />

                                {/* Wheels */}
                                <circle cx="120" cy="240" r="35" fill="#2D5016" />
                                <circle cx="120" cy="240" r="25" fill="#7CB342" />
                                <circle cx="280" cy="240" r="35" fill="#2D5016" />
                                <circle cx="280" cy="240" r="25" fill="#7CB342" />

                                {/* Sensor Array */}
                                <rect x="160" y="80" width="80" height="45" rx="10" fill="#FFD700" />
                                <circle cx="180" cy="100" r="8" fill="#3A7D44" />
                                <circle cx="200" cy="100" r="8" fill="#3A7D44" />
                                <circle cx="220" cy="100" r="8" fill="#3A7D44" />

                                {/* Camera */}
                                <circle cx="200" cy="140" r="15" fill="#1A1A1A" />
                                <circle cx="200" cy="140" r="10" fill="#4FC3F7" opacity="0.8" />

                                {/* Antenna */}
                                <line x1="200" y1="80" x2="200" y2="40" stroke="#FFD700" strokeWidth="3" />
                                <circle cx="200" cy="35" r="8" fill="#FFD700" className="pulse-animation" />

                                <defs>
                                    <linearGradient id="carGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                        <stop offset="0%" stopColor="#3A7D44" />
                                        <stop offset="100%" stopColor="#7CB342" />
                                    </linearGradient>
                                </defs>
                            </svg>
                        </div>
                        <div className="tech-indicators">
                            <div className="indicator active">
                                <span className="indicator-dot"></span>
                                <span>Sensors Active</span>
                            </div>
                            <div className="indicator active">
                                <span className="indicator-dot"></span>
                                <span>AI Processing</span>
                            </div>
                            <div className="indicator active">
                                <span className="indicator-dot"></span>
                                <span>Data Streaming</span>
                            </div>
                        </div>
                    </div>

                    <div className="car-features">
                        <div className="feature-card">
                            <div className="feature-icon">🌡️</div>
                            <h3>Soil Monitoring</h3>
                            <p>Real-time NPK, pH, moisture, and temperature analysis using advanced IoT sensors</p>
                        </div>

                        <div className="feature-card">
                            <div className="feature-icon">📷</div>
                            <h3>Disease Detection</h3>
                            <p>AI-powered visual scanning to identify crop diseases early with 95% accuracy</p>
                        </div>

                        <div className="feature-card">
                            <div className="feature-icon">🤖</div>
                            <h3>Autonomous Navigation</h3>
                            <p>GPS-guided movement to cover entire farm area efficiently and safely</p>
                        </div>

                        <div className="feature-card">
                            <div className="feature-icon">📱</div>
                            <h3>Mobile App Integration</h3>
                            <p>Control, monitor, and receive insights directly on your smartphone</p>
                        </div>

                        <div className="feature-card">
                            <div className="feature-icon">☁️</div>
                            <h3>Cloud Analytics</h3>
                            <p>Historical data tracking and predictive insights for better farm management</p>
                        </div>

                        <div className="feature-card">
                            <div className="feature-icon">⚡</div>
                            <h3>Energy Efficient</h3>
                            <p>Solar-powered operation with smart battery management for 24/7 monitoring</p>
                        </div>
                    </div>
                </div>

                <div className="tech-specs">
                    <h3 className="specs-title">Technical Specifications</h3>
                    <div className="specs-grid">
                        <div className="spec-item">
                            <span className="spec-label">Sensors</span>
                            <span className="spec-value">NPK, pH, Moisture, Temp</span>
                        </div>
                        <div className="spec-item">
                            <span className="spec-label">Camera</span>
                            <span className="spec-value">HD with AI Processing</span>
                        </div>
                        <div className="spec-item">
                            <span className="spec-label">Connectivity</span>
                            <span className="spec-value">WiFi, 4G, Bluetooth</span>
                        </div>
                        <div className="spec-item">
                            <span className="spec-label">Power</span>
                            <span className="spec-value">Solar + Rechargeable</span>
                        </div>
                        <div className="spec-item">
                            <span className="spec-label">Range</span>
                            <span className="spec-value">Up to 5 km radius</span>
                        </div>
                        <div className="spec-item">
                            <span className="spec-label">Weight</span>
                            <span className="spec-value">Lightweight & Portable</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default KrishiMitraCar;
