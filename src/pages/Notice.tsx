import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { useAuth } from '../contexts/AuthContext';
import { getNotices } from '../utils/noticeStorage';
import SEOHead from '../components/SEOHead';
import Pagination from '../components/Pagination';

const PAGE_SIZE = 10;

const Notice = () => {
  const { t, language } = useLanguage();
  const { isAdmin } = useAuth();
  const [notices, setNotices] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const result = await getNotices(page, PAGE_SIZE);
        setNotices(result.data);
        setTotal(result.total);
      } catch (err: any) {
        console.error('Notice load error:', err);
      } finally {
        setLoading(false);
      }
    })();
  }, [page]);

  const totalPages = Math.ceil(total / PAGE_SIZE);

  const formatDate = (dateStr) => {
    if (!dateStr) return '';
    return new Date(dateStr).toLocaleDateString('ko-KR', {
      year: 'numeric', month: '2-digit', day: '2-digit'
    });
  };

  const getTitle = (notice) => {
    if (language === 'en' && notice.titleEn) return notice.titleEn;
    return notice.title;
  };

  return (
    <>
      <SEOHead
        title={t('site.notice.title')}
        description={t('site.notice.subtitle')}
        path="/notice"
      />

      <section className="page-header">
        <div className="container">
          <h2>{t('site.notice.title')}</h2>
          <p>{t('site.notice.subtitle')}</p>
        </div>
      </section>

      <section className="edu-board-section">
        <div className="container">
          <div className="edu-board-toolbar">
            <div></div>
            {isAdmin && (
              <Link to="/notice/write" className="board-btn primary">
                {t('site.notice.write')}
              </Link>
            )}
          </div>

          {loading ? (
            <div className="edu-board-empty">
              <div className="loading-spinner"></div>
            </div>
          ) : notices.length === 0 ? (
            <div className="edu-board-empty">
              <div className="edu-board-empty-icon">
                <i className="fa-solid fa-bullhorn"></i>
              </div>
              <p>{t('site.notice.empty')}</p>
            </div>
          ) : (
            <>
              <table className="edu-board-table">
                <thead>
                  <tr>
                    <th className="col-number">{t('site.notice.colNumber')}</th>
                    <th className="col-title">{t('site.notice.colTitle')}</th>
                    <th className="col-author">{t('site.notice.colAuthor')}</th>
                    <th className="col-date">{t('site.notice.colDate')}</th>
                    <th className="col-views">{t('site.notice.colViews')}</th>
                  </tr>
                </thead>
                <tbody>
                  {notices.map((notice, idx) => (
                    <tr key={notice.id} className={notice.isPinned ? 'edu-board-pinned' : ''}>
                      <td className="col-number">
                        {notice.isPinned ? (
                          <span className="edu-board-pinned-icon">📌</span>
                        ) : (
                          total - ((page - 1) * PAGE_SIZE) - idx
                        )}
                      </td>
                      <td className="col-title">
                        <Link to={`/notice/${notice.id}`} className="edu-board-title-link">
                          {getTitle(notice)}
                        </Link>
                      </td>
                      <td className="col-author">{notice.authorName || '-'}</td>
                      <td className="col-date">{formatDate(notice.createdAt)}</td>
                      <td className="col-views">{notice.viewCount || 0}</td>
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

export default Notice;
