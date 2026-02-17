import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styles from '../../styles/Navbar.module.css';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const location = useLocation();

    const toggleMenu = () => setIsOpen(!isOpen);
    const closeMenu = () => setIsOpen(false);

    // Close menu on route change
    useEffect(() => {
        closeMenu();
    }, [location]);

    // Add scroll detection for navbar background
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 30);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Prevent body scroll when menu is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => { document.body.style.overflow = ''; };
    }, [isOpen]);

    const navItems = [
        { to: '/', label: 'Home' },
        { to: '/blog', label: 'Blog' },
        { to: '/forum', label: 'Forum' },
        { to: '/updates', label: 'Updates' }
    ];

    return (
        <nav className={`${styles.navbar} ${scrolled ? styles.scrolled : ''}`}>
            <div className={styles.container}>
                <div className={styles.navContent}>
                    <Link to="/" className={styles.logo} onClick={closeMenu}>
                        <svg width="36" height="36" viewBox="0 0 40 40" fill="none">
                            <circle cx="20" cy="20" r="18" fill="#3A7D44" opacity="0.2" />
                            <path d="M20 8C18.5 8 17.5 9.5 17.5 11C17.5 12.5 18 14 18 15.5V20C18 20 16 20 14 22C12 24 11 27 11 30C11 31 11.5 32 13 32C14.5 32 15 31 15 30C15 28.5 15.5 26.5 17 25C18 24 19 24 20 24C21 24 22 24 23 25C24.5 26.5 25 28.5 25 30C25 31 25.5 32 27 32C28.5 32 29 31 29 30C29 27 28 24 26 22C24 20 22 20 22 20V15.5C22 14 22.5 12.5 22.5 11C22.5 9.5 21.5 8 20 8Z" fill="#3A7D44" />
                            <circle cx="20" cy="11" r="2" fill="#7CB342" />
                        </svg>
                        <span>Krishi Mitra</span>
                    </Link>

                    {/* Overlay backdrop */}
                    <div
                        className={`${styles.overlay} ${isOpen ? styles.overlayActive : ''}`}
                        onClick={closeMenu}
                    />

                    <ul className={`${styles.navLinks} ${isOpen ? styles.active : ''}`}>
                        {navItems.map((item, index) => (
                            <li key={item.to} style={{ '--i': index }}>
                                <Link
                                    to={item.to}
                                    className={`${styles.navLink} ${location.pathname === item.to ? styles.activeLink : ''}`}
                                    onClick={closeMenu}
                                >
                                    {item.label}
                                </Link>
                            </li>
                        ))}
                    </ul>

                    {/* Hamburger button */}
                    <button
                        className={`${styles.mobileToggle} ${isOpen ? styles.toggleActive : ''}`}
                        onClick={toggleMenu}
                        aria-label="Toggle menu"
                    >
                        <span className={styles.hamburgerLine}></span>
                        <span className={styles.hamburgerLine}></span>
                        <span className={styles.hamburgerLine}></span>
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
