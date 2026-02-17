import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { blogAPI } from '../services/api';
import styles from '../styles/Blog.module.css';

const Blog = () => {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchBlogs();
    }, []);

    const fetchBlogs = async () => {
        try {
            const response = await blogAPI.getAll();
            setBlogs(response.data);
        } catch (error) {
            console.error('Error fetching blogs:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <div className={styles.loading}>Loading...</div>;

    return (
        <div className={styles.blogPage}>
            <div className={styles.container}>
                <h1 className={styles.pageTitle}>Blog & News</h1>
                <p className={styles.pageSubtitle}>Stay updated with the latest insights and developments</p>

                {blogs.length === 0 ? (
                    <div className={styles.emptyState}>
                        <p>No blog posts available yet. Check back soon!</p>
                    </div>
                ) : (
                    <div className={styles.blogGrid}>
                        {blogs.map((blog) => (
                            <Link to={`/blog/${blog.slug}`} key={blog.id} className={styles.blogCard}>
                                <div className={styles.blogContent}>
                                    <span className={styles.category}>{blog.category}</span>
                                    <h2>{blog.title}</h2>
                                    <p>{blog.excerpt}</p>
                                    <div className={styles.blogMeta}>
                                        <span>{new Date(blog.publishedDate).toLocaleDateString()}</span>
                                        <span>{blog.views || 0} views</span>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Blog;
