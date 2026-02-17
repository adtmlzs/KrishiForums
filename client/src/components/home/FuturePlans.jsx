import './FuturePlans.css';

const FuturePlans = () => {
    const plans = [
        {
            phase: 'Phase 1 — Now',
            status: 'active',
            title: 'Smart Soil & Crop Analysis',
            description: 'IoT-based NPK sensors, real-time soil monitoring, and AI-powered disease detection through visual scanning.',
            features: ['Soil NPK monitoring', 'Disease detection camera', 'Mobile companion app', 'Real-time alerts']
        },
        {
            phase: 'Phase 2 — Q3 2026',
            status: 'upcoming',
            title: 'Autonomous Field Patrol',
            description: 'The Krishi Mitra car becomes fully autonomous — patrolling fields, collecting data, and spraying treatments without farmer intervention.',
            features: ['GPS navigation', 'Auto-spray system', 'Obstacle avoidance', 'Night patrol mode']
        },
        {
            phase: 'Phase 3 — 2027',
            status: 'planned',
            title: 'Community & Marketplace',
            description: 'Connecting farmers with buyers, agronomists, and government schemes through an integrated marketplace and consultation platform.',
            features: ['Crop marketplace', 'Expert consultation', 'Government scheme alerts', 'Community forum']
        },
        {
            phase: 'Phase 4 — 2028+',
            status: 'vision',
            title: 'AI Farm Management Suite',
            description: 'End-to-end farm management with predictive analytics, drone integration, weather-based crop planning, and supply chain tracking.',
            features: ['Drone mapping', 'Weather AI', 'Yield prediction', 'Supply chain tracking']
        }
    ];

    return (
        <section className="future-section">
            <div className="container">
                <h2 className="future-title">Our Vision for the Future</h2>
                <p className="future-subtitle">
                    Krishi Mitra is just getting started. Here's our roadmap to revolutionize Indian agriculture — one farm at a time.
                </p>

                <div className="future-timeline">
                    {plans.map((plan, index) => (
                        <div
                            key={index}
                            className={`future-card future-card--${plan.status}`}
                            style={{ '--delay': `${index * 0.15}s` }}
                        >
                            <div className="future-badge">{plan.phase}</div>
                            <h3>{plan.title}</h3>
                            <p>{plan.description}</p>
                            <div className="future-features">
                                {plan.features.map((feat, i) => (
                                    <span key={i} className="feature-chip">
                                        {feat}
                                    </span>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                <div className="future-cta">
                    <div className="cta-content">
                        <h3>🌍 For Every Farmer, Everywhere</h3>
                        <p>Our mission is to make precision agriculture accessible to small and marginal farmers across India and beyond. With scalable hardware and intelligent software, Krishi Mitra aims to impact <strong>1 million+ farmers</strong> by 2030.</p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default FuturePlans;
