import './Roadmap.css';

const Roadmap = () => {
    const milestones = [
        {
            phase: 'Phase 1',
            title: 'Advanced AI Integration',
            description: 'Enhanced disease detection with deep learning and predictive crop health analytics',
            status: 'In Progress'
        },
        {
            phase: 'Phase 2',
            title: 'Multi-Crop Support',
            description: 'Expand coverage to support 50+ crop varieties with specialized care recommendations',
            status: 'Planned'
        },
        {
            phase: 'Phase 3',
            title: 'Cloud Platform',
            description: 'Comprehensive cloud dashboard for multi-farm management and remote monitoring',
            status: 'Planned'
        },
        {
            phase: 'Phase 4',
            title: 'Global Expansion',
            description: 'Localization for multiple languages and regions, making smart farming accessible worldwide',
            status: 'Future'
        }
    ];

    return (
        <section id="roadmap" className="roadmap-section">
            <div className="container">
                <h2 className="section-title">Future Roadmap</h2>
                <p className="section-subtitle">
                    Continuous innovation driving the future of intelligent farming
                </p>

                <div className="roadmap-timeline">
                    {milestones.map((milestone, index) => (
                        <div key={index} className="milestone-card">
                            <div className="milestone-marker">
                                <div className="marker-dot"></div>
                                <div className="marker-line"></div>
                            </div>
                            <div className="milestone-content">
                                <div className={`milestone-status ${milestone.status.toLowerCase().replace(' ', '-')}`}>
                                    {milestone.status}
                                </div>
                                <div className="milestone-phase">{milestone.phase}</div>
                                <h3 className="milestone-title">{milestone.title}</h3>
                                <p className="milestone-description">{milestone.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Roadmap;
