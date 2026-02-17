import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { forumAPI } from '../services/api';
import styles from '../styles/Forum.module.css';

const Forum = () => {
    const [questions, setQuestions] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchQuestions();
    }, []);

    const fetchQuestions = async () => {
        try {
            const response = await forumAPI.getAll();
            setQuestions(response.data);
        } catch (error) {
            console.error('Error fetching questions:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <div className={styles.loading}>Loading...</div>;

    return (
        <div className={styles.forumPage}>
            <div className={styles.container}>
                <div className={styles.forumHeader}>
                    <h1>Community Forum</h1>
                    <Link to="/forum/ask" className={styles.askButton}>Ask a Question</Link>
                </div>

                {questions.length === 0 ? (
                    <div className={styles.emptyState}>
                        <p>No questions yet. Be the first to ask!</p>
                    </div>
                ) : (
                    <div className={styles.questionsList}>
                        {questions.map((question) => (
                            <Link to={`/forum/${question._id}`} key={question._id} className={styles.questionCard}>
                                <div className={styles.questionHeader}>
                                    <h3>{question.question}</h3>
                                    {question.isAnswered && <span className={styles.answerBadge}>Answered</span>}
                                </div>
                                <p>{question.description}</p>
                                <div className={styles.questionMeta}>
                                    <span>By {question.author}</span>
                                    <span>{new Date(question.createdDate).toLocaleDateString()}</span>
                                    <span>{question.views || 0} views</span>
                                    <span>{question.answers?.length || 0} answers</span>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Forum;
