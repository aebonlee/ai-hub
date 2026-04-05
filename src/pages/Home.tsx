import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import SEOHead from '../components/SEOHead';
import useCountUp from '../hooks/useCountUp';
import useAOS from '../hooks/useAOS';
import site from '../config/site';

const CATEGORY_DESC_KEYS = {
  'chatbot': 'site.home.categoryChatbotDesc',
  'automation': 'site.home.categoryAutomationDesc',
  'data-media': 'site.home.categoryDataMediaDesc',
  'advanced': 'site.home.categoryAdvancedDesc',
  'opensource': 'site.home.categoryOpensourceDesc'
};

const Home = () => {
  const { t, language } = useLanguage();

  useAOS();

  const statSites = useCountUp(11, 1500, true, 0);
  const statStudents = useCountUp(500, 2000, true, 200);
  const statCategories = useCountUp(5, 1500, true, 400);
  const statCompletion = useCountUp(95, 2000, true, 600);

  return (
    <>
      <SEOHead
        title={t('site.home.title')}
        description={site.description}
      />

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-bg-effect">
          <div className="particles">
            {Array.from({ length: 14 }, (_, i) => (
              <div
                key={i}
                className="particle"
                style={{
                  left: `${5 + Math.random() * 90}%`,
                  top: `${5 + Math.random() * 90}%`,
                  '--duration': `${20 + Math.random() * 15}s`,
                  animationDelay: `${Math.random() * 10}s`,
                  width: `${4 + Math.random() * 5}px`,
                  height: `${4 + Math.random() * 5}px`,
                } as React.CSSProperties}
              />
            ))}
          </div>
        </div>
        <div className="container">
          <div className="hero-content">
            <h1 className="hero-title">
              <span className="title-line">{t('site.home.title')}</span>
              <span className="title-line">
                <span className="highlight">{t('site.home.subtitle')}</span>
              </span>
            </h1>
            <p className="hero-description">
              {t('site.home.heroDesc')}
            </p>
            <div className="hero-buttons">
              <Link to="/courses" className="btn btn-primary">
                {t('site.home.ctaStart')}
              </Link>
              <Link to="/franchise" className="btn btn-secondary">
                {t('site.home.ctaFranchise')}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="edu-stats-section">
        <div className="container">
          <h2 className="section-title text-center">{t('site.home.statsTitle')}</h2>
          <div className="edu-stats-grid">
            <div className="edu-stats-card" ref={statSites.ref}>
              <span className="edu-stats-number">{statSites.count}</span>
              <span className="edu-stats-suffix">+</span>
              <p className="edu-stats-label">{t('site.home.statSites')}</p>
            </div>
            <div className="edu-stats-card" ref={statStudents.ref}>
              <span className="edu-stats-number">{statStudents.count}</span>
              <span className="edu-stats-suffix">+</span>
              <p className="edu-stats-label">{t('site.home.statStudents')}</p>
            </div>
            <div className="edu-stats-card" ref={statCategories.ref}>
              <span className="edu-stats-number">{statCategories.count}</span>
              <span className="edu-stats-suffix"></span>
              <p className="edu-stats-label">{t('site.home.statCategories')}</p>
            </div>
            <div className="edu-stats-card" ref={statCompletion.ref}>
              <span className="edu-stats-number">{statCompletion.count}</span>
              <span className="edu-stats-suffix">%</span>
              <p className="edu-stats-label">{t('site.home.statCompletion')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Category Cards Section */}
      <section className="edu-sites-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">{t('site.home.categoriesTitle')}</h2>
            <p className="section-subtitle">{t('site.home.categoriesSubtitle')}</p>
          </div>
          <div className="edu-category-grid">
            {site.categories.map((cat, idx) => {
              const coursesInCat = site.learningSites.filter((s) => s.category === cat.id);
              return (
                <div key={cat.id} className="edu-category-card" data-aos="fade-up" data-aos-delay={idx * 100}>
                  <div className="edu-category-card-icon"><i className={cat.icon}></i></div>
                  <h3>{language === 'en' ? cat.nameEn : cat.name}</h3>
                  <span className="edu-category-count">
                    {coursesInCat.length}{t('site.home.categoryCoursesCount')}
                  </span>
                  <p className="edu-category-desc">
                    {t(CATEGORY_DESC_KEYS[cat.id])}
                  </p>
                  <Link to={cat.path} className="btn btn-secondary edu-category-btn">
                    {t('site.home.categoryViewAll')} →
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="cta-section" data-aos="fade-up">
        <div className="container">
          <div className="cta-content text-center">
            <h2>{t('site.home.ctaBottomTitle')}</h2>
            <p>{t('site.home.ctaBottomDesc')}</p>
            <Link to="/courses" className="btn btn-primary-large">
              {t('site.home.ctaBottomBtn')}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
