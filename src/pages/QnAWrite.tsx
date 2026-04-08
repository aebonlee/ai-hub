import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { useAuth } from '../contexts/AuthContext';
import { getQnaPost, createQnaPost, updateQnaPost } from '../utils/qnaStorage';
import SEOHead from '../components/SEOHead';

const CATEGORIES = ['general', 'tech', 'course', 'account'];

const QnAWrite = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const editId = searchParams.get('id');
  const { t } = useLanguage();
  const { user, profile } = useAuth();

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [loading, setLoading] = useState(!!editId);

  // 미로그인 리다이렉트
  useEffect(() => {
    if (!user) navigate('/login', { replace: true });
  }, [user, navigate]);

  // 수정 모드: 기존 데이터 로드
  useEffect(() => {
    if (!editId) return;
    (async () => {
      try {
        const data = await getQnaPost(editId);
        if (!data) {
          navigate('/qna', { replace: true });
          return;
        }
        setTitle((data.title as string) || '');
        setContent((data.content as string) || '');
        setCategory((data.category as string) || '');
      } catch (err: any) {
        console.error('Load QnA for edit error:', err);
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
        content: content.trim(),
        category: category || null,
        authorId: user.id,
        authorName: profile?.display_name || user.email.split('@')[0]
      };

      let result;
      if (editId) {
        result = await updateQnaPost(editId, payload);
      } else {
        result = await createQnaPost(payload);
      }

      if (result) {
        navigate(`/qna/${result.id}`, { replace: true });
      }
    } catch (err: any) {
      console.error('QnA submit error:', err);
    } finally {
      setSubmitting(false);
    }
  };

  if (!user) return null;

  const getCategoryLabel = (cat) => {
    const key = `site.qna.cat_${cat}`;
    const val = t(key);
    return val !== key ? val : cat;
  };

  return (
    <>
      <SEOHead
        title={editId ? t('site.qna.editTitle') : t('site.qna.writeTitle')}
        path="/qna/write"
      />

      <section className="page-header">
        <div className="container">
          <h2>{editId ? t('site.qna.editTitle') : t('site.qna.writeTitle')}</h2>
        </div>
      </section>

      <section className="edu-board-section">
        <div className="container">
          {loading ? (
            <div className="edu-board-empty"><div className="loading-spinner"></div></div>
          ) : (
            <form className="board-write" onSubmit={handleSubmit}>
              <h2>{editId ? t('site.qna.editTitle') : t('site.qna.writeTitle')}</h2>

              <div className="board-form-group">
                <label>{t('site.qna.fieldCategory')}</label>
                <select value={category} onChange={(e) => setCategory(e.target.value)}>
                  <option value="">{t('site.qna.fieldCategoryPh')}</option>
                  {CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>{getCategoryLabel(cat)}</option>
                  ))}
                </select>
              </div>

              <div className="board-form-group">
                <label>{t('site.qna.fieldTitle')}</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder={t('site.qna.fieldTitlePh')}
                  required
                />
              </div>

              <div className="board-form-group">
                <label>{t('site.qna.fieldContent')}</label>
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder={t('site.qna.fieldContentPh')}
                  required
                />
              </div>

              <div className="board-form-actions">
                <button type="button" className="board-btn" onClick={() => navigate('/qna')}>
                  {t('community.cancel')}
                </button>
                <button type="submit" className="board-btn primary" disabled={submitting}>
                  {submitting ? t('site.qna.submitting') : (editId ? t('site.qna.edit') : t('site.qna.write'))}
                </button>
              </div>
            </form>
          )}
        </div>
      </section>
    </>
  );
};

export default QnAWrite;
