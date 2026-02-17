import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { blogAPI } from '../services/api';
import styles from '../styles/BlogDetail.module.css';

const BlogDetail = () => {
    const { slug } = useParams();
    const [blog, setBlog] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchBlog();
    }, [slug]);

    const fetchBlog = async () => {
        try {
            const response = await blogAPI.getBySlug(slug);
            setBlog(response.data);
        } catch (error) {
            console.error('Error fetching blog:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <div className={styles.loading}>Loading...</div>;
    if (!blog) return <div className={styles.error}>Blog not found</div>;

    return (
        <div className={styles.blogDetail}>
            <div className={styles.container}>
                <article className={styles.blogArticle}>
                    <header>
                        <span className={styles.category}>{blog.category}</span>
                        <h1>{blog.title}</h1>
                        <div className={styles.blogMeta}>
                            <span>By {blog.author}</span>
                            <span>{new Date(blog.publishedDate).toLocaleDateString()}</span>
                            <span>{blog.views} views</span>
                        </div>
                    </header>
                    <div className={styles.blogContent} dangerouslySetInnerHTML={{ __html: blog.content }} />
                </article>
            </div>
        </div>
    );
};

export default BlogDetail;
