import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { useAuth } from '../contexts/AuthContext';
import { getQnaPosts } from '../utils/qnaStorage';
import SEOHead from '../components/SEOHead';
import Pagination from '../components/Pagination';

const PAGE_SIZE = 10;
const FILTERS = ['all', 'answered', 'unanswered'];

const QnA = () => {
  const { t } = useLanguage();
  const { user } = useAuth();
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const result = await getQnaPosts(page, PAGE_SIZE, filter as 'all' | 'answered' | 'unanswered');
        setPosts(result.data);
        setTotal(result.total);
      } catch (err: any) {
        console.error('QnA load error:', err);
      } finally {
        setLoading(false);
      }
    })();
  }, [page, filter]);

  const handleFilterChange = (f) => {
    setFilter(f);
    setPage(1);
  };

  const totalPages = Math.ceil(total / PAGE_SIZE);

  const formatDate = (dateStr) => {
    if (!dateStr) return '';
    return new Date(dateStr).toLocaleDateString('ko-KR', {
      year: 'numeric', month: '2-digit', day: '2-digit'
    });
  };

  const getCategoryLabel = (cat) => {
    if (!cat) return '';
    const key = `site.qna.cat_${cat}`;
    const val = t(key);
    return val !== key ? val : cat;
  };

  return (
    <>
      <SEOHead
        title={t('site.qna.title')}
        description={t('site.qna.subtitle')}
        path="/qna"
      />

      <section className="page-header">
        <div className="container">
          <h2>{t('site.qna.title')}</h2>
          <p>{t('site.qna.subtitle')}</p>
        </div>
      </section>

      <section className="edu-board-section">
        <div className="container">
          <div className="edu-board-toolbar">
            <div className="edu-board-filters">
              {FILTERS.map((f) => (
                <button
                  key={f}
                  className={`edu-board-filter-btn ${filter === f ? 'active' : ''}`}
                  onClick={() => handleFilterChange(f)}
                >
                  {t(`site.qna.filter_${f}`)}
                </button>
              ))}
            </div>
            {user && (
              <Link to="/qna/write" className="board-btn primary">
                {t('site.qna.write')}
              </Link>
            )}
          </div>

          {loading ? (
            <div className="edu-board-empty">
              <div className="loading-spinner"></div>
            </div>
          ) : posts.length === 0 ? (
            <div className="edu-board-empty">
              <div className="edu-board-empty-icon">
                <i className="fa-solid fa-circle-question"></i>
              </div>
              <p>{t('site.qna.empty')}</p>
            </div>
          ) : (
            <>
              <table className="edu-board-table">
                <thead>
                  <tr>
                    <th className="col-number">{t('site.qna.colNumber')}</th>
                    <th className="col-status">{t('site.qna.colStatus')}</th>
                    <th className="col-title">{t('site.qna.colTitle')}</th>
                    <th className="col-author">{t('site.qna.colAuthor')}</th>
                    <th className="col-date">{t('site.qna.colDate')}</th>
                    <th className="col-answers">{t('site.qna.colAnswers')}</th>
                  </tr>
                </thead>
                <tbody>
                  {posts.map((post, idx) => (
                    <tr key={post.id}>
                      <td className="col-number">{total - ((page - 1) * PAGE_SIZE) - idx}</td>
                      <td className="col-status">
                        <span className={`edu-board-status ${post.isAnswered ? 'answered' : 'unanswered'}`}>
                          {post.isAnswered ? t('site.qna.answered') : t('site.qna.unanswered')}
                        </span>
                      </td>
                      <td className="col-title">
                        <Link to={`/qna/${post.id}`} className="edu-board-title-link">
                          {post.title}
                          {post.category && (
                            <span className="edu-board-category-tag">{getCategoryLabel(post.category)}</span>
                          )}
                        </Link>
                      </td>
                      <td className="col-author">{post.authorName || '-'}</td>
                      <td className="col-date">{formatDate(post.createdAt)}</td>
                      <td className="col-answers">{post.answerCount || 0}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <Pagination
                currentPage={page}
                totalPages={totalPages}
                onPageChange={setPage}
              />
            </>
          )}
        </div>
      </section>
    </>
  );
};

export default QnA;
