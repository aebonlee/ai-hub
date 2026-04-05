import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import { getProducts, deleteProduct, toggleSoldOut } from '../utils/productStorage';
import SEOHead from '../components/SEOHead';
import useAOS from '../hooks/useAOS';

const CATEGORIES = ['all', 'single-site', 'bundle', 'custom'];

const Shop = () => {
  const { language, t } = useLanguage();
  const { addItem } = useCart();
  const { isAdmin } = useAuth();
  const isEn = language === 'en';
  useAOS();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('all');
  const [search, setSearch] = useState('');
  const [addedIds, setAddedIds] = useState(new Set());

  const loadProducts = useCallback(async () => {
    setLoading(true);
    const data = await getProducts(isAdmin);
    setProducts(data);
    setLoading(false);
  }, [isAdmin]);

  useEffect(() => { loadProducts(); }, [loadProducts]);

  const filtered = products.filter((p) => {
    if (activeCategory !== 'all' && p.category !== activeCategory) return false;
    if (search) {
      const q = search.toLowerCase();
      const title = (isEn ? p.titleEn : p.title) || '';
      return title.toLowerCase().includes(q);
    }
    return true;
  });

  const formatPrice = (price) =>
    isEn ? `₩${price.toLocaleString()}` : `${price.toLocaleString()}${t('shop.currency')}`;

  const handleAddToCart = (product) => {
    addItem(product);
    setAddedIds((prev) => new Set(prev).add(product.id));
    setTimeout(() => {
      setAddedIds((prev) => {
        const next = new Set(prev);
        next.delete(product.id);
        return next;
      });
    }, 1500);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('상품을 비활성화하시겠습니까?')) return;
    await deleteProduct(id);
    loadProducts();
  };

  const handleToggleSoldOut = async (id, current) => {
    await toggleSoldOut(id, !current);
    loadProducts();
  };

  return (
    <>
      <SEOHead title={t('shop.title')} description={t('shop.subtitle')} path="/shop" />

      <section className="page-header">
        <div className="container">
          <h2>{t('shop.title')}</h2>
          <p>{t('shop.subtitle')}</p>
        </div>
      </section>

      <section className="shop-section">
        <div className="container">
          {/* Filters */}
          <div className="shop-filters" data-aos="fade-up">
            <div className="shop-filter-tabs">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  className={`shop-filter-tab ${activeCategory === cat ? 'active' : ''}`}
                  onClick={() => setActiveCategory(cat)}
                >
                  {t(`shop.${cat}`)}
                </button>
              ))}
            </div>
            <input
              type="text"
              className="shop-search-input"
              placeholder={t('shop.searchPlaceholder') || t('search.placeholder')}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          {/* Product Grid */}
          {loading ? (
            <div style={{ display: 'flex', justifyContent: 'center', padding: '60px 0' }}>
              <div className="loading-spinner"></div>
            </div>
          ) : filtered.length === 0 ? (
            <div className="shop-empty" data-aos="fade-up">
              <p>{t('shop.noProducts')}</p>
            </div>
          ) : (
            <div className="shop-grid" data-aos="fade-up">
              {filtered.map((product) => (
                <div key={product.id} className={`product-card ${product.isSoldOut ? 'sold-out' : ''} ${!product.isActive ? 'inactive' : ''}`}>
                  {product.imageUrl && (
                    <div className="product-image">
                      <img src={product.imageUrl} alt={isEn ? product.titleEn : product.title} />
                    </div>
                  )}
                  <div className="product-info">
                    <h3 className="product-title">{isEn ? product.titleEn : product.title}</h3>
                    <p className="product-description">{isEn ? product.descriptionEn : product.description}</p>
                    <div className="product-price">{formatPrice(product.price)}</div>
                  </div>
                  <div className="product-actions">
                    {product.isSoldOut ? (
                      <span className="btn btn-secondary product-btn" style={{ opacity: 0.6 }}>
                        {t('auth.soldOut')}
                      </span>
                    ) : (
                      <button
                        className={`btn btn-primary product-btn ${addedIds.has(product.id) ? 'added' : ''}`}
                        onClick={() => handleAddToCart(product)}
                        disabled={addedIds.has(product.id)}
                      >
                        {addedIds.has(product.id) ? t('shop.addedToCart') : t('shop.addToCart')}
                      </button>
                    )}
                    {isAdmin && (
                      <div className="product-admin-actions">
                        <Link to={`/admin/products/edit/${product.id}`} className="admin-btn admin-btn-sm admin-btn-secondary">
                          {t('shop.edit') || '수정'}
                        </Link>
                        <button
                          className="admin-btn admin-btn-sm admin-btn-secondary"
                          onClick={() => handleToggleSoldOut(product.id, product.isSoldOut)}
                        >
                          {product.isSoldOut ? '판매재개' : '품절처리'}
                        </button>
                        <button
                          className="admin-btn admin-btn-sm admin-btn-danger"
                          onClick={() => handleDelete(product.id)}
                        >
                          {t('shop.delete') || '삭제'}
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default Shop;
