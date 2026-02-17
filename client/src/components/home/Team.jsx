import './Team.css';

const Team = () => {
    return (
        <section id="team" className="team-section">
            <div className="container">
                <h2 className="section-title">Meet the Innovator</h2>
                <p className="section-subtitle">
                    Combining technology and agriculture to revolutionize farming
                </p>

                <div className="team-container">
                    <div className="team-card">
                        <div className="card-glow"></div>
                        <div className="avatar">
                            <div className="avatar-circle">
                                <span className="avatar-text">AS</span>
                            </div>
                            <div className="status-badge">Active Developer</div>
                        </div>
                        <div className="team-info">
                            <h3 className="team-name">Aditya Shukla</h3>
                            <p className="team-role">Founder & Lead Developer</p>
                            <p className="team-bio">
                                Passionate about leveraging IoT, AI, and robotics to create sustainable
                                farming solutions that empower farmers with cutting-edge technology.
                            </p>
                            <div className="team-skills">
                                <span className="skill-tag">IoT</span>
                                <span className="skill-tag">AI/ML</span>
                                <span className="skill-tag">Robotics</span>
                                <span className="skill-tag">Full Stack</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Team;
