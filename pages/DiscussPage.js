import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import '../styles/DiscussPage.css';

const DiscussPage = () => {
  const { currentUser } = useAuth();
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState('');
  const [loading, setLoading] = useState(true);

  // Temporary data structure for posts
  const initialPosts = [
    {
      id: 1,
      title: 'Medicine redistribution process',
      content: 'How does the medicine redistribution process work?',
      author: 'John Doe',
      timestamp: new Date().toISOString(),
      comments: [
        {
          id: 1,
          content: 'The process involves verification and quality checks.',
          author: 'Jane Smith',
          timestamp: new Date().toISOString(),
        },
      ],
      likes: 5,
    },
  ];

  useEffect(() => {
    // Simulate loading posts from an API
    setTimeout(() => {
      setPosts(initialPosts);
      setLoading(false);
    }, 1000);
  }, []);

  const handlePostSubmit = (e) => {
    e.preventDefault();
    if (!newPost.trim()) return;

    const post = {
      id: posts.length + 1,
      title: 'New Discussion',
      content: newPost,
      author: currentUser?.displayName || 'Anonymous',
      timestamp: new Date().toISOString(),
      comments: [],
      likes: 0,
    };

    setPosts([post, ...posts]);
    setNewPost('');
  };

  const handleComment = (postId, comment) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          comments: [
            ...post.comments,
            {
              id: post.comments.length + 1,
              content: comment,
              author: currentUser?.displayName || 'Anonymous',
              timestamp: new Date().toISOString(),
            },
          ],
        };
      }
      return post;
    }));
  };

  const handleLike = (postId) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        return { ...post, likes: post.likes + 1 };
      }
      return post;
    }));
  };

  if (loading) {
    return (
      <div className="discuss-page-container">
        <div className="loading-spinner">Loading discussions...</div>
      </div>
    );
  }

  return (
    <div className="discuss-page-container">
      <h1>Community Discussions</h1>
      
      <div className="post-form-container">
        <form onSubmit={handlePostSubmit}>
          <textarea
            value={newPost}
            onChange={(e) => setNewPost(e.target.value)}
            placeholder="Share your thoughts or ask a question..."
            required
          />
          <button type="submit" className="submit-post-btn">
            Post Discussion
          </button>
        </form>
      </div>

      <div className="posts-container">
        {posts.map(post => (
          <div key={post.id} className="post-card">
            <div className="post-header">
              <h3>{post.title}</h3>
              <span className="post-meta">
                Posted by {post.author} • {new Date(post.timestamp).toLocaleDateString()}
              </span>
            </div>
            
            <div className="post-content">
              {post.content}
            </div>
            
            <div className="post-actions">
              <button
                onClick={() => handleLike(post.id)}
                className="like-button"
              >
                👍 {post.likes}
              </button>
            </div>

            <div className="comments-section">
              <h4>Comments ({post.comments.length})</h4>
              {post.comments.map(comment => (
                <div key={comment.id} className="comment">
                  <p>{comment.content}</p>
                  <span className="comment-meta">
                    {comment.author} • {new Date(comment.timestamp).toLocaleDateString()}
                  </span>
                </div>
              ))}
              
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  const comment = e.target.comment.value;
                  if (comment.trim()) {
                    handleComment(post.id, comment);
                    e.target.comment.value = '';
                  }
                }}
                className="comment-form"
              >
                <input
                  type="text"
                  name="comment"
                  placeholder="Add a comment..."
                  required
                />
                <button type="submit">Comment</button>
              </form>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DiscussPage;