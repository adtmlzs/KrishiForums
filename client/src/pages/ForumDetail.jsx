import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { forumAPI } from '../services/api';
import styles from '../styles/ForumDetail.module.css';

const ForumDetail = () => {
    const { id } = useParams();
    const [question, setQuestion] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchQuestion();
    }, [id]);

    const fetchQuestion = async () => {
        try {
            const response = await forumAPI.getById(id);
            setQuestion(response.data);
        } catch (error) {
            console.error('Error fetching question:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <div className={styles.loading}>Loading...</div>;
    if (!question) return <div className={styles.error}>Question not found</div>;

    return (
        <div className={styles.forumDetail}>
            <div className={styles.container}>
                <div className={styles.question}>
                    <h1>{question.question}</h1>
                    <p className={styles.description}>{question.description}</p>
                    <div className={styles.questionMeta}>
                        <span>Asked by {question.author}</span>
                        <span>{new Date(question.createdDate).toLocaleDateString()}</span>
                        <span>{question.views} views</span>
                    </div>
                </div>

                <div className={styles.answers}>
                    <h2>{question.answers?.length || 0} Answers</h2>
                    {question.answers && question.answers.length > 0 ? (
                        question.answers.map((answer, index) => (
                            <div key={index} className={styles.answer}>
                                <div className={styles.answerContent} dangerouslySetInnerHTML={{ __html: answer.content }} />
                                <div className={styles.answerMeta}>
                                    <span>{answer.author}</span>
                                    {answer.isOfficial && <span className={styles.officialBadge}>Official</span>}
                                    <span>{new Date(answer.createdDate).toLocaleDateString()}</span>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className={styles.noAnswers}>No answers yet</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ForumDetail;
