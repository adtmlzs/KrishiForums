import './Solution.css';

const Solution = () => {
    return (
        <section className="solution-section">
            <div className="container">
                <h2 className="solution-title">Meet Your Smart Farming Partner</h2>
                <p className="solution-subtitle">
                    Krishi Mitra combines IoT sensors, AI analysis, visual scanning, and a mobile app to bring
                    precision agriculture right to your fingertips.
                </p>
                <div className="solution-flow">
                    <div className="flow-step" style={{ '--delay': '0s' }}>
                        <div className="flow-number">1</div>
                        <h3>Sense</h3>
                        <p>IoT sensors measure soil NPK, moisture, and temperature in real-time</p>
                    </div>
                    <div className="flow-arrow">→</div>
                    <div className="flow-step" style={{ '--delay': '0.1s' }}>
                        <div className="flow-number">2</div>
                        <h3>Scan</h3>
                        <p>Camera captures crop images and AI detects diseases instantly</p>
                    </div>
                    <div className="flow-arrow">→</div>
                    <div className="flow-step" style={{ '--delay': '0.2s' }}>
                        <div className="flow-number">3</div>
                        <h3>Analyze</h3>
                        <p>Cloud AI processes data and generates actionable recommendations</p>
                    </div>
                    <div className="flow-arrow">→</div>
                    <div className="flow-step" style={{ '--delay': '0.3s' }}>
                        <div className="flow-number">4</div>
                        <h3>Act</h3>
                        <p>Farmer receives alerts and guidance through the mobile app</p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Solution;
