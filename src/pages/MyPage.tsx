import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { useAuth } from '../contexts/AuthContext';
import { updateProfile } from '../utils/auth';
import { getUserLicenses } from '../utils/supabase';
import SEOHead from '../components/SEOHead';
import '../styles/auth.css';

const MyPage = () => {
  const { t } = useLanguage();
  const { user, profile, signOut, refreshProfile } = useAuth();
  const navigate = useNavigate();

  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({ displayName: '', avatarUrl: '' });
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [licenses, setLicenses] = useState<any[]>([]);
  const [licensesLoading, setLicensesLoading] = useState(false);

  useEffect(() => {
    if (profile) {
      setForm({
        displayName: profile.display_name || '',
        avatarUrl: profile.avatar_url || ''
      });
    }
  }, [profile]);

  useEffect(() => {
    if (user?.id) {
      setLicensesLoading(true);
      getUserLicenses(user.id).then(data => {
        setLicenses(data);
        setLicensesLoading(false);
      });
    }
  }, [user]);

  const handleSave = async () => {
    setSaving(true);
    setMessage('');
    try {
      await updateProfile(user.id, {
        display_name: form.displayName,
        avatar_url: form.avatarUrl
      });
      await refreshProfile();
      setEditing(false);
      setMessage(t('auth.profileUpdated'));
    } catch (err: any) {
      setMessage(err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  return (
    <>
      <SEOHead title="마이페이지" path="/mypage" noindex />
      <section className="page-header">
        <div className="container">
          <h1 className="page-title">{t('auth.myPage')}</h1>
        </div>
      </section>

      <section className="auth-section">
        <div className="container">
          <div className="mypage-card">
            <div className="mypage-avatar">
              {profile?.avatar_url ? (
                <img src={profile.avatar_url} alt={profile.display_name} loading="lazy" />
              ) : (
                <div className="mypage-avatar-placeholder">
                  {(profile?.display_name || user?.email || '?')[0].toUpperCase()}
                </div>
              )}
            </div>

            <div className="mypage-info">
              {editing ? (
                <div className="mypage-edit-form">
                  <div className="auth-form-group">
                    <label>{t('auth.displayName')}</label>
                    <input
                      type="text"
                      value={form.displayName}
                      onChange={e => setForm({ ...form, displayName: e.target.value })}
                    />
                  </div>
                  <div className="mypage-edit-actions">
                    <button className="board-btn primary" onClick={handleSave} disabled={saving}>
                      {saving ? t('auth.saving') : t('auth.save')}
                    </button>
                    <button className="board-btn" onClick={() => setEditing(false)}>
                      {t('community.cancel')}
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <h2 className="mypage-name">{profile?.display_name || t('auth.noName')}</h2>
                  <p className="mypage-email">{user?.email}</p>
                  <p className="mypage-provider">
                    {profile?.provider ? `${t('auth.loginWith')} ${profile.provider}` : t('auth.emailAccount')}
                  </p>
                  {profile?.role === 'admin' && (
                    <span className="mypage-role-badge">{t('auth.admin')}</span>
                  )}
                  <button className="board-btn" onClick={() => setEditing(true)} style={{ marginTop: '16px' }}>
                    {t('auth.editProfile')}
                  </button>
                </>
              )}

              {message && <div className="auth-message">{message}</div>}
            </div>

            {/* 이용권 현황 */}
            <div className="mypage-sections">
              <h3 style={{ marginBottom: '12px', fontSize: '16px', fontWeight: 600, color: 'var(--text-main)' }}>
                이용권 현황
              </h3>
              {licensesLoading ? (
                <p style={{ color: 'var(--text-light)', fontSize: '14px' }}>로딩 중...</p>
              ) : licenses.length === 0 ? (
                <div style={{ padding: '20px', background: 'var(--bg-light)', borderRadius: '12px', textAlign: 'center' }}>
                  <p style={{ color: 'var(--text-light)', fontSize: '14px', marginBottom: '12px' }}>보유한 이용권이 없습니다.</p>
                  <Link to="/shop" className="btn btn-primary" style={{ fontSize: '14px', padding: '8px 20px' }}>
                    이용권 구매하기
                  </Link>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {licenses.map((lic: any) => (
                    <div key={lic.id} style={{
                      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                      padding: '12px 16px', background: 'var(--bg-light)', borderRadius: '10px',
                      border: '1px solid var(--border-color)'
                    }}>
                      <div>
                        <span style={{
                          display: 'inline-block', padding: '2px 8px', borderRadius: '4px', fontSize: '11px',
                          fontWeight: 600, marginRight: '8px',
                          background: lic.license_type === 'bundle' ? 'var(--primary-blue)' : 'var(--accent-color)',
                          color: '#fff'
                        }}>
                          {lic.license_type === 'bundle' ? '전체' : '개별'}
                        </span>
                        <span style={{ fontSize: '14px', fontWeight: 500, color: 'var(--text-main)' }}>
                          {lic.license_type === 'bundle' ? '전체 이용권 (11개 사이트)' : lic.site_slug}
                        </span>
                      </div>
                      <span style={{ fontSize: '12px', color: 'var(--text-light)' }}>
                        {new Date(lic.created_at).toLocaleDateString('ko-KR')}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="mypage-sections" style={{ marginTop: '16px' }}>
              <Link to="/mypage/orders" className="mypage-link-card">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="24" height="24">
                  <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <path d="M16 10a4 4 0 0 1-8 0" />
                </svg>
                <span>{t('auth.orderHistory')}</span>
              </Link>
            </div>

            <div className="mypage-footer">
              <button className="board-btn danger" onClick={handleSignOut}>
                {t('auth.logout')}
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default MyPage;
