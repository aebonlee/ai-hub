import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { useAuth } from '../contexts/AuthContext';
import { getNotice, createNotice, updateNotice } from '../utils/noticeStorage';
import SEOHead from '../components/SEOHead';

const NoticeWrite = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const editId = searchParams.get('id');
  const { t } = useLanguage();
  const { user, isAdmin, profile } = useAuth();

  const [title, setTitle] = useState('');
  const [titleEn, setTitleEn] = useState('');
  const [content, setContent] = useState('');
  const [contentEn, setContentEn] = useState('');
  const [isPinned, setIsPinned] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [loading, setLoading] = useState(!!editId);

  // 비관리자 리다이렉트
  useEffect(() => {
    if (!isAdmin) navigate('/notice', { replace: true });
  }, [isAdmin, navigate]);

  // 수정 모드: 기존 데이터 로드
  useEffect(() => {
    if (!editId) return;
    (async () => {
      try {
        const data = await getNotice(editId);
        if (!data) {
          navigate('/notice', { replace: true });
          return;
        }
        setTitle(data.title || '');
        setTitleEn(data.titleEn || '');
        setContent(data.content || '');
        setContentEn(data.contentEn || '');
        setIsPinned(data.isPinned || false);
      } catch (err: any) {
        console.error('Load notice for edit error:', err);
      } finally {
        setLoading(false);
      }
    })();
  }, [editId, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;
    setSubmitting(true);

    try {
      const payload = {
        title: title.trim(),
        titleEn: titleEn.trim(),
        content: content.trim(),
        contentEn: contentEn.trim(),
        isPinned,
        authorId: user.id,
        authorName: profile?.display_name || user.email.split('@')[0]
      };

      let result;
      if (editId) {
        result = await updateNotice(editId, payload);
      } else {
        result = await createNotice(payload);
      }

      if (result) {
        navigate(`/notice/${result.id}`, { replace: true });
      }
    } catch (err: any) {
      console.error('Notice submit error:', err);
    } finally {
      setSubmitting(false);
    }
  };

  if (!isAdmin) return null;

  return (
    <>
      <SEOHead
        title={editId ? t('site.notice.editTitle') : t('site.notice.writeTitle')}
        path="/notice/write"
      />

      <section className="page-header">
        <div className="container">
          <h2>{editId ? t('site.notice.editTitle') : t('site.notice.writeTitle')}</h2>
        </div>
      </section>

      <section className="edu-board-section">
        <div className="container">
          {loading ? (
            <div className="edu-board-empty"><div className="loading-spinner"></div></div>
          ) : (
            <form className="board-write" onSubmit={handleSubmit}>
              <h2>{editId ? t('site.notice.editTitle') : t('site.notice.writeTitle')}</h2>

              <div className="board-form-group">
                <label>{t('site.notice.fieldTitle')}</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder={t('site.notice.fieldTitlePh')}
                  required
                />
              </div>

              <div className="board-form-group">
                <label>{t('site.notice.fieldTitleEn')}</label>
                <input
                  type="text"
                  value={titleEn}
                  onChange={(e) => setTitleEn(e.target.value)}
                  placeholder={t('site.notice.fieldTitleEnPh')}
                />
              </div>

              <div className="board-form-group">
                <label>{t('site.notice.fieldContent')}</label>
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder={t('site.notice.fieldContentPh')}
                  required
                />
              </div>

              <div className="board-form-group">
                <label>{t('site.notice.fieldContentEn')}</label>
                <textarea
                  value={contentEn}
                  onChange={(e) => setContentEn(e.target.value)}
                  placeholder={t('site.notice.fieldContentEnPh')}
                  style={{ minHeight: '150px' }}
                />
              </div>

              <div className="board-form-group">
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                  <input
                    type="checkbox"
                    checked={isPinned}
                    onChange={(e) => setIsPinned(e.target.checked)}
                    style={{ width: 'auto' }}
                  />
                  {t('site.notice.fieldPinned')}
                </label>
              </div>

              <div className="board-form-actions">
                <button type="button" className="board-btn" onClick={() => navigate('/notice')}>
                  {t('community.cancel')}
                </button>
                <button type="submit" className="board-btn primary" disabled={submitting}>
                  {submitting ? t('site.notice.submitting') : (editId ? t('site.notice.edit') : t('site.notice.write'))}
                </button>
              </div>
            </form>
          )}
        </div>
      </section>
    </>
  );
};

export default NoticeWrite;
