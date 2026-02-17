import { Link } from 'react-router-dom';
import styles from '../../styles/Footer.module.css';

const Footer = () => {
    return (
        <footer className={styles.footer}>
            <div className={styles.container}>
                <div className={styles.footerContent}>
                    <div className={styles.footerBrand}>
                        <Link to="/" className={styles.footerLogo}>
                            <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                                <circle cx="20" cy="20" r="18" fill="#7CB342" opacity="0.3" />
                                <path d="M20 8C18.5 8 17.5 9.5 17.5 11C17.5 12.5 18 14 18 15.5V20C18 20 16 20 14 22C12 24 11 27 11 30C11 31 11.5 32 13 32C14.5 32 15 31 15 30C15 28.5 15.5 26.5 17 25C18 24 19 24 20 24C21 24 22 24 23 25C24.5 26.5 25 28.5 25 30C25 31 25.5 32 27 32C28.5 32 29 31 29 30C29 27 28 24 26 22C24 20 22 20 22 20V15.5C22 14 22.5 12.5 22.5 11C22.5 9.5 21.5 8 20 8Z" fill="#7CB342" />
                                <circle cx="20" cy="11" r="2" fill="#9CCC65" />
                            </svg>
                            <span>Krishi Mitra</span>
                        </Link>
                        <p className={styles.footerTagline}>Your Smart Farming Partner</p>
                    </div>

                    <div className={styles.footerLinks}>
                        <div className={styles.footerColumn}>
                            <h4>Quick Links</h4>
                            <ul>
                                <li><Link to="/">Home</Link></li>
                                <li><Link to="/blog">Blog</Link></li>
                                <li><Link to="/forum">Forum</Link></li>
                            </ul>
                        </div>
                        <div className={styles.footerColumn}>
                            <h4>Learn More</h4>
                            <ul>
                                <li><Link to="/updates">Updates</Link></li>
                                <li><Link to="/admin">Admin</Link></li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className={styles.footerBottom}>
                    <p>&copy; 2026 Krishi Mitra. Building the future of smart farming.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
