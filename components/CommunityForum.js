import React, { useState, useEffect } from 'react';
import { FaComments, FaUser, FaHeart, FaReply, FaShare, FaBookmark } from 'react-icons/fa';
import '../styles/CommunityForum.css';

const CommunityForum = () => {
    const [posts, setPosts] = useState([]);
    const [newPost, setNewPost] = useState('');
    const [loading, setLoading] = useState(false);
    const [likedPosts, setLikedPosts] = useState(new Set());
    const [savedPosts, setSavedPosts] = useState(new Set());

    useEffect(() => {
        // Mock data - in real app, fetch from API
        const mockPosts = [
            {
                id: 1,
                author: 'HealthHelper',
                content: 'Looking for diabetes medication. Any donors in Mumbai area?',
                likes: 5,
                replies: 2,
                timestamp: '2 hours ago'
            },
            {
                id: 2,
                author: 'MediShare',
                content: 'Tips for storing medicines during summer: Keep in cool, dry place away from direct sunlight.',
                likes: 12,
                replies: 4,
                timestamp: '5 hours ago'
            }
        ];
        setPosts(mockPosts);
    }, []);

    const handlePostSubmit = async (e) => {
        e.preventDefault();
        if (!newPost.trim()) return;
        setLoading(true);

        try {
            const post = {
                id: Date.now(),
                author: 'CurrentUser',
                content: newPost,
                likes: 0,
                replies: 0,
                timestamp: 'Just now',
                tags: extractTags(newPost)
            };

            setPosts([post, ...posts]);
            setNewPost('');
        } catch (error) {
            console.error('Error creating post:', error);
        } finally {
            setLoading(false);
        }
    };

    const extractTags = (content) => {
        const tags = content.match(/#[\w]+/g);
        return tags ? tags : [];
    };

    const handleLike = (postId) => {
        setLikedPosts(prev => {
            const newLiked = new Set(prev);
            if (newLiked.has(postId)) {
                newLiked.delete(postId);
            } else {
                newLiked.add(postId);
            }
            return newLiked;
        });

        setPosts(posts.map(post => {
            if (post.id === postId) {
                return {
                    ...post,
                    likes: likedPosts.has(postId) ? post.likes - 1 : post.likes + 1
                };
            }
            return post;
        }));
    };

    const handleSave = (postId) => {
        setSavedPosts(prev => {
            const newSaved = new Set(prev);
            if (newSaved.has(postId)) {
                newSaved.delete(postId);
            } else {
                newSaved.add(postId);
            }
            return newSaved;
        });
    };

    return (
        <div className="community-forum">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
                <h2 className="text-2xl font-semibold flex items-center gap-2">
                    <FaComments className="text-blue-600" />
                    Community Forum
                </h2>
            </div>

            <form onSubmit={handlePostSubmit} className="post-form p-6 border-b border-gray-200">
                <textarea
                    className="w-full p-4 rounded-lg resize-none"
                    rows="3"
                    placeholder="Share your thoughts or ask for help... Use #tags for better visibility"
                    value={newPost}
                    onChange={(e) => setNewPost(e.target.value)}
                />
                <div className="flex justify-end mt-3">
                    <button
                        type="submit"
                        disabled={loading}
                        className="gradient-btn flex items-center gap-2"
                    >
                        {loading ? (
                            <div className="loading-spinner" />
                        ) : 'Post'}
                    </button>
                </div>
            </form>

            <div className="space-y-6 p-6">
                {posts.map(post => (
                    <div key={post.id} className="post-card p-6">
                        <div className="post-header">
                            <FaUser className="text-blue-600" />
                            <span className="post-author">{post.author}</span>
                            <span className="post-timestamp">{post.timestamp}</span>
                        </div>
                        <div className="post-content">{post.content}</div>
                        {post.tags && post.tags.length > 0 && (
                            <div className="flex gap-2 mt-3">
                                {post.tags.map((tag, index) => (
                                    <span key={index} className="text-sm text-blue-600 bg-blue-50 px-2 py-1 rounded-full">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        )}
                        <div className="post-actions">
                            <button
                                className={`action-button ${likedPosts.has(post.id) ? 'liked' : ''}`}
                                onClick={() => handleLike(post.id)}
                            >
                                <FaHeart />
                                <span>{post.likes} Likes</span>
                            </button>
                            <button className="action-button">
                                <FaReply />
                                <span>{post.replies} Replies</span>
                            </button>
                            <button className="action-button">
                                <FaShare />
                                <span>Share</span>
                            </button>
                            <button
                                className={`action-button ${savedPosts.has(post.id) ? 'text-blue-600' : ''}`}
                                onClick={() => handleSave(post.id)}
                            >
                                <FaBookmark />
                                <span>Save</span>
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CommunityForum;