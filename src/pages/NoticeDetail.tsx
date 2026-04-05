import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { useAuth } from '../contexts/AuthContext';
import { getNotice, deleteNotice } from '../utils/noticeStorage';
import SEOHead from '../components/SEOHead';

const NoticeDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t, language } = useLanguage();
  const { isAdmin } = useAuth();
  const [notice, setNotice] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const data = await getNotice(id);
        if (!data) {
          navigate('/notice', { replace: true });
          return;
        }
        setNotice(data);
      } catch (err: any) {
        console.error('NoticeDetail load error:', err);
      } finally {
        setLoading(false);
      }
    })();
  }, [id, navigate]);

  const handleDelete = async () => {
    if (!window.confirm(t('site.notice.deleteConfirm'))) return;
    const success = await deleteNotice(id);
    if (success) navigate('/notice', { replace: true });
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return '';
    const d = new Date(dateStr);
    return d.toLocaleDateString('ko-KR', { year: 'numeric', month: '2-digit', day: '2-digit' }) +
      ' ' + d.toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' });
  };

  if (loading) {
    return (
      <>
        <section className="page-header">
          <div className="container">
            <h2>{t('site.notice.title')}</h2>
          </div>
        </section>
        <section className="edu-board-section">
          <div className="container">
            <div className="edu-board-empty"><div className="loading-spinner"></div></div>
          </div>
        </section>
      </>
    );
  }

  if (!notice) return null;

  const title = language === 'en' && notice.titleEn ? notice.titleEn : notice.title;
  const content = language === 'en' && notice.contentEn ? notice.contentEn : notice.content;

  return (
    <>
      <SEOHead title={title} description={t('site.notice.subtitle')} path={`/notice/${id}`} />

      <section className="page-header">
        <div className="container">
          <h2>{t('site.notice.title')}</h2>
          <p>{t('site.notice.subtitle')}</p>
        </div>
      </section>

      <section className="edu-board-section">
        <div className="container">
          <div className="board-detail">
            <div className="board-detail-header">
              {notice.isPinned && (
                <div className="board-detail-category">
                  <span className="edu-board-status answered">{t('site.notice.pinned')}</span>
                </div>
              )}
              <h1 className="board-detail-title">{title}</h1>
              <div className="board-detail-meta">
                <span><i className="fa-regular fa-user"></i> {notice.authorName || '-'}</span>
                <span><i className="fa-regular fa-calendar"></i> {formatDate(notice.createdAt)}</span>
                <span><i className="fa-regular fa-eye"></i> {notice.viewCount || 0}</span>
              </div>
            </div>

            <div className="board-detail-body">{content}</div>

            <div className="board-detail-footer">
              <Link to="/notice" className="board-btn">{t('site.notice.backToList')}</Link>
              {isAdmin && (
                <div className="board-detail-actions">
                  <Link to={`/notice/write?id=${notice.id}`} className="board-btn">
                    {t('site.notice.edit')}
                  </Link>
                  <button className="board-btn danger" onClick={handleDelete}>
                    {t('site.notice.delete')}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default NoticeDetail;
