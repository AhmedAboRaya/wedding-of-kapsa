import { useState, useEffect, FormEvent } from 'react';
import axios from 'axios';
import './CommentsSection.css';

const API_URL = 'http://localhost:5000/api/comments';

interface Comment {
  name: string;
  comment: string;
  createdAt: string;
}

export default function CommentsSection() {
  const [comments, setComments] = useState<Comment[]>([]);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const fetchComments = async () => {
    try {
      const { data } = await axios.get<Comment[]>(API_URL);
      setComments(data);
    } catch (err) {
      console.error('Failed to fetch comments', err);
    }
  };

  useEffect(() => {
    fetchComments();
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim() || !comment.trim()) return;

    setLoading(true);
    try {
      await axios.post(API_URL, { name, phone, comment });
      setName('');
      setPhone('');
      setComment('');
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
      fetchComments();
    } catch (err) {
      console.error('Failed to post comment', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="comments-section" id="comments">
      <h2 className="comments-title">Wishes & Blessings</h2>
      <p className="comments-subtitle">Leave your wishes for the happy couple 💕</p>

      <form className="comment-form" onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="comment-name">Your Name</label>
            <input
              id="comment-name"
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="comment-phone">Phone Number</label>
            <input
              id="comment-phone"
              type="tel"
              placeholder="Enter your phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="comment-text">Your Wishes</label>
          <textarea
            id="comment-text"
            placeholder="Write your wishes for the couple..."
            rows={4}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="submit-btn" disabled={loading}>
          {loading ? 'Sending...' : success ? '✓ Sent!' : 'Send Wishes ✨'}
        </button>
      </form>

      <div className="comments-list">
        {comments.length === 0 && (
          <p className="no-comments">Be the first to leave a wish! 🌟</p>
        )}
        {comments.map((c, i) => (
          <div key={i} className="comment-card" style={{ animationDelay: `${i * 0.1}s` }}>
            <div className="comment-avatar">{c.name.charAt(0).toUpperCase()}</div>
            <div className="comment-body">
              <h4 className="comment-author">{c.name}</h4>
              <p className="comment-text">{c.comment}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
