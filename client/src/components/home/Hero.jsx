import { Link } from 'react-router-dom';
import './Hero.css';

const Hero = () => {
    return (
        <section id="home" className="hero">
            {/* Animated Background */}
            <div className="hero-background">
                <div className="floating-particles">
                    <div className="particle"></div>
                    <div className="particle"></div>
                    <div className="particle"></div>
                    <div className="particle"></div>
                    <div className="particle"></div>
                </div>
            </div>

            <div className="container">
                <div className="hero-content">
                    <div className="hero-badge">🌱 Smart Farming Revolution</div>
                    <h1 className="hero-title">
                        Meet <span className="gradient-text">Krishi Mitra</span>
                        <br />Your Intelligent Farming Partner
                    </h1>
                    <p className="hero-subtitle">
                        An autonomous robotic assistant that monitors soil health, detects crop diseases,
                        and provides real-time AI-powered insights to maximize your farm's productivity.
                    </p>

                    <div className="hero-buttons">
                        <a href="#features" className="cta-button primary">
                            <span>Explore Features</span>
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                <path d="M7.5 15L12.5 10L7.5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                            </svg>
                        </a>
                        <Link to="/blog" className="cta-button secondary">
                            <span>Read Our Story</span>
                        </Link>
                    </div>

                    <div className="hero-stats">
                        <div className="stat-item">
                            <div className="stat-number">24/7</div>
                            <div className="stat-label">Monitoring</div>
                        </div>
                        <div className="stat-item">
                            <div className="stat-number">95%</div>
                            <div className="stat-label">Accuracy</div>
                        </div>
                        <div className="stat-item">
                            <div className="stat-number">IoT</div>
                            <div className="stat-label">Powered</div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
