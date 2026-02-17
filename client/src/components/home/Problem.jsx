import './Problem.css';

const Problem = () => {
    return (
        <section className="problem-section">
            <div className="container">
                <h2 className="problem-title">The Challenge Farmers Face</h2>
                <p className="problem-subtitle">
                    Millions of Indian farmers still rely on guesswork. Without real-time data, they face preventable losses every season.
                </p>
                <div className="problem-grid">
                    <div className="problem-card" style={{ '--delay': '0s' }}>
                        <span className="problem-emoji">🧪</span>
                        <h3>No Soil Data</h3>
                        <p>Farmers don't know their soil's NPK levels, leading to nutrient imbalance and poor crop health.</p>
                    </div>
                    <div className="problem-card" style={{ '--delay': '0.1s' }}>
                        <span className="problem-emoji">🦠</span>
                        <h3>Late Disease Detection</h3>
                        <p>By the time diseases are visible to the naked eye, significant damage has already spread across the field.</p>
                    </div>
                    <div className="problem-card" style={{ '--delay': '0.2s' }}>
                        <span className="problem-emoji">💸</span>
                        <h3>Wasted Resources</h3>
                        <p>Over-watering, excessive fertilizer use, and improper pesticide application waste money and harm the environment.</p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Problem;
