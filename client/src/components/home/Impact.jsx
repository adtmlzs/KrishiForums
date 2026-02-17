import './Impact.css';

const Impact = () => {
    return (
        <section className="impact-section">
            <div className="container">
                <h2 className="impact-title">Why Krishi Mitra Matters</h2>
                <p className="impact-subtitle">
                    Transforming agriculture through technology — making farming smarter, sustainable, and more profitable for every farmer.
                </p>

                <div className="impact-grid">
                    <div className="impact-card" style={{ '--delay': '0s' }}>
                        <div className="impact-icon-wrap">
                            <span className="impact-icon">🌾</span>
                        </div>
                        <h3>Boost Crop Yield</h3>
                        <p>Real-time soil analysis and AI recommendations help farmers increase their yield by up to <strong>40%</strong> with precision farming techniques.</p>
                        <div className="impact-stat">
                            <span className="stat-highlight">40%</span>
                            <span className="stat-text">Higher Yield</span>
                        </div>
                    </div>

                    <div className="impact-card" style={{ '--delay': '0.1s' }}>
                        <div className="impact-icon-wrap">
                            <span className="impact-icon">💧</span>
                        </div>
                        <h3>Save Water & Resources</h3>
                        <p>Smart irrigation recommendations based on soil moisture data reduce water waste, saving farmers money and conserving natural resources.</p>
                        <div className="impact-stat">
                            <span className="stat-highlight">30%</span>
                            <span className="stat-text">Less Water Used</span>
                        </div>
                    </div>

                    <div className="impact-card" style={{ '--delay': '0.2s' }}>
                        <div className="impact-icon-wrap">
                            <span className="impact-icon">🔬</span>
                        </div>
                        <h3>Early Disease Detection</h3>
                        <p>Visual scanning with AI identifies crop diseases within seconds, enabling farmers to act before problems spread across fields.</p>
                        <div className="impact-stat">
                            <span className="stat-highlight">95%</span>
                            <span className="stat-text">Detection Accuracy</span>
                        </div>
                    </div>

                    <div className="impact-card" style={{ '--delay': '0.3s' }}>
                        <div className="impact-icon-wrap">
                            <span className="impact-icon">📱</span>
                        </div>
                        <h3>Accessible to All</h3>
                        <p>Designed for rural farmers with an easy-to-use mobile interface, available in multiple languages, and works even with limited connectivity.</p>
                        <div className="impact-stat">
                            <span className="stat-highlight">10+</span>
                            <span className="stat-text">Languages Supported</span>
                        </div>
                    </div>
                </div>

                <div className="innovation-strip">
                    <div className="innovation-item">
                        <span className="inno-icon">🤖</span>
                        <div>
                            <h4>AI-Powered</h4>
                            <p>Machine learning models trained on thousands of crop images</p>
                        </div>
                    </div>
                    <div className="innovation-item">
                        <span className="inno-icon">📡</span>
                        <div>
                            <h4>IoT Sensors</h4>
                            <p>Real-time soil NPK, moisture, and temperature monitoring</p>
                        </div>
                    </div>
                    <div className="innovation-item">
                        <span className="inno-icon">☁️</span>
                        <div>
                            <h4>Cloud Dashboard</h4>
                            <p>Accessible analytics from anywhere on any device</p>
                        </div>
                    </div>
                    <div className="innovation-item">
                        <span className="inno-icon">🚗</span>
                        <div>
                            <h4>Smart Vehicle</h4>
                            <p>Autonomous field scanner that patrols your farm</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Impact;
