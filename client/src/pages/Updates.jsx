import { useState, useEffect } from 'react';
import { updatesAPI } from '../services/api';
import styles from '../styles/Updates.module.css';

const Updates = () => {
    const [updates, setUpdates] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchUpdates();
    }, []);

    const fetchUpdates = async () => {
        try {
            const response = await updatesAPI.getAll();
            setUpdates(response.data);
        } catch (error) {
            console.error('Error fetching updates:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <div className={styles.loading}>Loading...</div>;

    return (
        <div className={styles.updatesPage}>
            <div className={styles.container}>
                <h1>Latest Updates</h1>
                <p className={styles.subtitle}>Stay informed about our progress and announcements</p>

                {updates.length === 0 ? (
                    <div className={styles.emptyState}>
                        <p>No updates available yet</p>
                    </div>
                ) : (
                    <div className={styles.updatesList}>
                        {updates.map((update) => (
                            <div key={update.id} className={styles.updateCard}>
                                <span className={styles.category}>{update.category}</span>
                                <h3>{update.title}</h3>
                                <p>{update.content}</p>
                                <span className={styles.date}>
                                    {new Date(update.date).toLocaleDateString()}
                                </span>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Updates;
