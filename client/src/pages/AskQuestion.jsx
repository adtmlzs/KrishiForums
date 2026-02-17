import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { forumAPI } from '../services/api';
import styles from '../styles/AskQuestion.module.css';

const AskQuestion = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        question: '',
        description: '',
        author: '',
        email: '',
        category: 'General'
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await forumAPI.create(formData);
            navigate('/forum');
        } catch (error) {
            console.error('Error posting question:', error);
            alert('Failed to post question. Please try again.');
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <div className={styles.askQuestion}>
            <div className={styles.container}>
                <h1>Ask a Question</h1>
                <form onSubmit={handleSubmit} className={styles.form}>
                    <div className={styles.formGroup}>
                        <label>Your Name *</label>
                        <input
                            type="text"
                            name="author"
                            value={formData.author}
                            onChange={handleChange}
                            placeholder="Enter your full name"
                            required
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label>Your Email *</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="your.email@example.com"
                            required
                        />
                        <small style={{ color: '#888', fontSize: '0.875rem' }}>
                            Your email will not be publicly displayed
                        </small>
                    </div>

                    <div className={styles.formGroup}>
                        <label>Category</label>
                        <select name="category" value={formData.category} onChange={handleChange}>
                            <option value="General">General</option>
                            <option value="Soil Health">Soil Health</option>
                            <option value="Crop Disease">Crop Disease</option>
                            <option value="Technology">Technology</option>
                        </select>
                    </div>

                    <div className={styles.formGroup}>
                        <label>Question</label>
                        <input
                            type="text"
                            name="question"
                            value={formData.question}
                            onChange={handleChange}
                            placeholder="What would you like to ask?"
                            required
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label>Description</label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            placeholder="Provide more details about your question..."
                            rows="6"
                            required
                        />
                    </div>

                    <button type="submit" className={styles.submitButton}>Post Question</button>
                </form>
            </div>
        </div>
    );
};

export default AskQuestion;
