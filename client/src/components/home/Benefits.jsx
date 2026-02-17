import './Benefits.css';

const Benefits = () => {
    const benefits = [
        {
            icon: '🎯',
            title: 'Early Detection',
            description: 'Identify crop diseases and soil issues before they become critical problems'
        },
        {
            icon: '💰',
            title: 'Cost Efficiency',
            description: 'Reduce waste and optimize resource usage with precision farming'
        },
        {
            icon: '📊',
            title: 'Data-Driven Insights',
            description: 'Make informed decisions based on real-time analytics and historical trends'
        },
        {
            icon: '🌍',
            title: 'Sustainable Farming',
            description: 'Promote eco-friendly practices and reduce environmental impact'
        },
        {
            icon: '📱',
            title: 'Easy to Use',
            description: 'Simple mobile app interface accessible to farmers of all tech levels'
        },
        {
            icon: '⚡',
            title: 'Real-Time Alerts',
            description: 'Get instant notifications about critical farm conditions'
        }
    ];

    return (
        <section id="benefits" className="benefits-section">
            <div className="container">
                <h2 className="section-title">Why Choose Krishi Mitra</h2>
                <p className="section-subtitle">
                    Revolutionary benefits that transform the way you farm
                </p>

                <div className="benefits-grid">
                    {benefits.map((benefit, index) => (
                        <div
                            key={index}
                            className="benefit-card"
                            style={{ animationDelay: `${index * 0.1}s` }}
                        >
                            <div className="benefit-icon-wrapper">
                                <div className="benefit-icon">{benefit.icon}</div>
                            </div>
                            <h3 className="benefit-title">{benefit.title}</h3>
                            <p className="benefit-description">{benefit.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Benefits;
