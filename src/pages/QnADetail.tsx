import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { useAuth } from '../contexts/AuthContext';
import { getQnaPost, deleteQnaPost, syncAnswerCount } from '../utils/qnaStorage';
import CommentSection from '../components/CommentSection';
import SEOHead from '../components/SEOHead';

const QnADetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t } = useLanguage();
  const { user, isAdmin } = useAuth();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const data = await getQnaPost(id);
        if (!data) {
          navigate('/qna', { replace: true });
          return;
        }
        setPost(data);
      } catch (err: any) {
        console.error('QnADetail load error:', err);
      } finally {
        setLoading(false);
      }
    })();
  }, [id, navigate]);

  const handleDelete = async () => {
    if (!window.confirm(t('site.qna.deleteConfirm'))) return;
    const success = await deleteQnaPost(id);
    if (success) navigate('/qna', { replace: true });
  };

  const handleCommentAdded = async () => {
    await syncAnswerCount(id);
    // 답변수 갱신
    const updated = await getQnaPost(id);
    if (updated) setPost(updated);
  };

  const handleCommentDeleted = async () => {
    await syncAnswerCount(id);
    const updated = await getQnaPost(id);
    if (updated) setPost(updated);
  };

  const canEdit = post && (isAdmin || (user && post.authorId === user.id));

  const formatDate = (dateStr) => {
    if (!dateStr) return '';
    const d = new Date(dateStr);
    return d.toLocaleDateString('ko-KR', { year: 'numeric', month: '2-digit', day: '2-digit' }) +
      ' ' + d.toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' });
  };

  const getCategoryLabel = (cat) => {
    if (!cat) return '';
    const key = `site.qna.cat_${cat}`;
    const val = t(key);
    return val !== key ? val : cat;
  };

  if (loading) {
    return (
      <>
        <section className="page-header">
          <div className="container"><h2>{t('site.qna.title')}</h2></div>
        </section>
        <section className="edu-board-section">
          <div className="container">
            <div className="edu-board-empty"><div className="loading-spinner"></div></div>
          </div>
        </section>
      </>
    );
  }

  if (!post) return null;

  return (
    <>
      <SEOHead title={post.title} description={t('site.qna.subtitle')} path={`/qna/${id}`} />

      <section className="page-header">
        <div className="container">
          <h2>{t('site.qna.title')}</h2>
          <p>{t('site.qna.subtitle')}</p>
        </div>
      </section>

      <section className="edu-board-section">
        <div className="container">
          <div className="board-detail">
            <div className="board-detail-header">
              <div className="board-detail-category" style={{ display: 'flex', gap: '8px' }}>
                <span className={`edu-board-status ${post.isAnswered ? 'answered' : 'unanswered'}`}>
                  {post.isAnswered ? t('site.qna.answered') : t('site.qna.unanswered')}
                </span>
                {post.category && (
                  <span className="edu-board-category-tag">{getCategoryLabel(post.category)}</span>
                )}
              </div>
              <h1 className="board-detail-title">{post.title}</h1>
              <div className="board-detail-meta">
                <span><i className="fa-regular fa-user"></i> {post.authorName || '-'}</span>
                <span><i className="fa-regular fa-calendar"></i> {formatDate(post.createdAt)}</span>
                <span><i className="fa-regular fa-eye"></i> {post.viewCount || 0}</span>
                <span><i className="fa-regular fa-comment"></i> {post.answerCount || 0}</span>
              </div>
            </div>

            <div className="board-detail-body">{post.content}</div>

            <div className="board-detail-footer">
              <Link to="/qna" className="board-btn">{t('site.qna.backToList')}</Link>
              {canEdit && (
                <div className="board-detail-actions">
                  <Link to={`/qna/write?id=${post.id}`} className="board-btn">
                    {t('site.qna.edit')}
                  </Link>
                  <button className="board-btn danger" onClick={handleDelete}>
                    {t('site.qna.delete')}
                  </button>
                </div>
              )}
            </div>
          </div>

          <CommentSection
            postId={Number(id)}
            postType="qna"
            titleOverride={t('site.qna.answers')}
            onCommentAdded={handleCommentAdded}
            onCommentDeleted={handleCommentDeleted}
          />
        </div>
      </section>
    </>
  );
};

export default QnADetail;
