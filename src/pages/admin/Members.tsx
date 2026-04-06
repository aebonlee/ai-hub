import { useState, useEffect, useCallback } from 'react';
import { getAllMembers, updateMemberStatus } from '../../utils/adminApi';

const LIMIT = 20;

const Members = () => {
  const [members, setMembers] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [searchInput, setSearchInput] = useState('');
  const [loading, setLoading] = useState(true);


  const load = useCallback(async () => {
    setLoading(true);
    const res = await getAllMembers({ page, limit: LIMIT, search });
    setMembers(res.data);
    setTotal(res.total);
    setLoading(false);
  }, [page, search]);

  useEffect(() => { load(); }, [load]);

  const totalPages = Math.ceil(total / LIMIT);

  const handleSearch = (e) => {
    e.preventDefault();
    setSearch(searchInput);
    setPage(1);
  };

  const handleExpire = async (member) => {
    if (!window.confirm(`${member.display_name || member.email} 회원을 비활성화하시겠습니까?`)) return;
    try {
      await updateMemberStatus(member.id);
      load();
    } catch (err: any) {
      alert('비활성화 실패: ' + err.message);
    }
  };

  const formatDate = (d) => d ? new Date(d).toLocaleDateString('ko-KR') : '-';


  return (
    <>
      <div className="admin-page-header">
        <h1>회원 관리</h1>
        <p>전체 회원을 조회하고 상태를 관리합니다</p>
      </div>

      <div className="admin-table-card">
        <div className="admin-table-header">
          <h2>회원 목록 ({total}명)</h2>
          <div className="admin-table-actions">
            <form onSubmit={handleSearch} style={{ display: 'flex', gap: '8px' }}>
              <input
                type="text"
                className="admin-search-input"
                placeholder="이름 또는 이메일 검색..."
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
              />
              <button type="submit" className="admin-btn admin-btn-sm admin-btn-primary">검색</button>
            </form>
          </div>
        </div>

        {loading ? (
          <div className="admin-loading"><div className="loading-spinner"></div></div>
        ) : members.length === 0 ? (
          <div className="admin-empty">
            <i className="fa-solid fa-users"></i>
            <p>회원이 없습니다.</p>
          </div>
        ) : (
          <>
            <div className="admin-table-wrap">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>이름</th>
                    <th>이메일</th>
                    <th>가입일</th>
                    <th>최근 로그인</th>
                    <th>상태</th>
                    <th>관리</th>
                  </tr>
                </thead>
                <tbody>
                  {members.map((m) => (
                    <tr key={m.id}>
                      <td>{m.display_name || '-'}</td>
                      <td>{m.email || '-'}</td>
                      <td>{formatDate(m.created_at)}</td>
                      <td>{formatDate(m.last_sign_in_at)}</td>
                      <td>
                        <span className={`admin-badge ${m.is_active === false ? 'cancelled' : 'active'}`}>
                          {m.is_active === false ? '비활성' : '활성'}
                        </span>
                      </td>
                      <td>
                        <button
                          className="admin-btn admin-btn-sm admin-btn-secondary"
                          onClick={() => handleExpire(m)}
                        >
                          기간종료
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {totalPages > 1 && (
              <div className="admin-pagination">
                <button disabled={page <= 1} onClick={() => setPage(page - 1)}>‹</button>
                {Array.from({ length: totalPages }, (_, i) => i + 1)
                  .filter((p) => Math.abs(p - page) <= 2 || p === 1 || p === totalPages)
                  .map((p, i, arr) => (
                    <span key={p}>
                      {i > 0 && arr[i - 1] !== p - 1 && <span style={{ padding: '0 4px' }}>…</span>}
                      <button
                        className={page === p ? 'active' : ''}
                        onClick={() => setPage(p)}
                      >
                        {p}
                      </button>
                    </span>
                  ))}
                <button disabled={page >= totalPages} onClick={() => setPage(page + 1)}>›</button>
              </div>
            )}
          </>
        )}
      </div>

    </>
  );
};

export default Members;
