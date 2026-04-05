import { useState, useEffect, useCallback } from 'react';
import { getAllOrders, updateOrderStatus } from '../../utils/adminApi';

const STATUS_OPTIONS = ['all', 'paid', 'pending', 'cancelled', 'refunded'];
const LIMIT = 20;

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState('all');
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState(null);

  const load = useCallback(async () => {
    setLoading(true);
    const res = await getAllOrders({
      page,
      limit: LIMIT,
      status: statusFilter === 'all' ? null : statusFilter,
    });
    setOrders(res.data);
    setTotal(res.total);
    setLoading(false);
  }, [page, statusFilter]);

  useEffect(() => { load(); }, [load]);

  const totalPages = Math.ceil(total / LIMIT);

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await updateOrderStatus(orderId, newStatus);
      load();
    } catch (err: any) {
      alert('상태 변경 실패: ' + err.message);
    }
  };

  const formatDate = (d) => new Date(d).toLocaleDateString('ko-KR');
  const formatPrice = (v) => `₩${(v || 0).toLocaleString()}`;

  const statusLabel = {
    paid: '결제완료', pending: '대기', cancelled: '취소', refunded: '환불',
  };

  return (
    <>
      <div className="admin-page-header">
        <h1>주문 관리</h1>
        <p>전체 주문을 조회하고 상태를 관리합니다</p>
      </div>

      <div className="admin-table-card">
        <div className="admin-table-header">
          <h2>주문 목록 ({total}건)</h2>
          <div className="admin-table-actions">
            <select
              className="admin-filter-select"
              value={statusFilter}
              onChange={(e) => { setStatusFilter(e.target.value); setPage(1); }}
            >
              {STATUS_OPTIONS.map((s) => (
                <option key={s} value={s}>
                  {s === 'all' ? '전체 상태' : statusLabel[s] || s}
                </option>
              ))}
            </select>
          </div>
        </div>

        {loading ? (
          <div className="admin-loading"><div className="loading-spinner"></div></div>
        ) : orders.length === 0 ? (
          <div className="admin-empty">
            <i className="fa-solid fa-receipt"></i>
            <p>주문이 없습니다.</p>
          </div>
        ) : (
          <>
            <div className="admin-table-wrap">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>주문번호</th>
                    <th>주문일</th>
                    <th>결제금액</th>
                    <th>상태</th>
                    <th>상태 변경</th>
                    <th>상세</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <>
                      <tr key={order.id}>
                        <td style={{ fontFamily: 'monospace' }}>#{order.id}</td>
                        <td>{formatDate(order.created_at)}</td>
                        <td>{formatPrice(order.total_amount)}</td>
                        <td>
                          <span className={`admin-badge ${order.status}`}>
                            {statusLabel[order.status] || order.status}
                          </span>
                        </td>
                        <td>
                          <select
                            className="admin-filter-select"
                            value={order.status}
                            onChange={(e) => handleStatusChange(order.id, e.target.value)}
                            style={{ fontSize: '12px', padding: '4px 8px' }}
                          >
                            <option value="paid">결제완료</option>
                            <option value="pending">대기</option>
                            <option value="cancelled">취소</option>
                            <option value="refunded">환불</option>
                          </select>
                        </td>
                        <td>
                          <button
                            className="admin-btn admin-btn-sm admin-btn-secondary"
                            onClick={() => setExpandedId(expandedId === order.id ? null : order.id)}
                          >
                            {expandedId === order.id ? '접기' : '펼치기'}
                          </button>
                        </td>
                      </tr>
                      {expandedId === order.id && order.order_items && (
                        <tr key={`${order.id}-detail`}>
                          <td colSpan={6}>
                            <div className="admin-order-detail">
                              <table>
                                <thead>
                                  <tr>
                                    <th>상품명</th>
                                    <th>단가</th>
                                    <th>수량</th>
                                    <th>소계</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {order.order_items.map((item, i) => (
                                    <tr key={i}>
                                      <td>{item.product_title || item.product_id}</td>
                                      <td>{formatPrice(item.unit_price)}</td>
                                      <td>{item.quantity}</td>
                                      <td>{formatPrice(item.unit_price * item.quantity)}</td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                          </td>
                        </tr>
                      )}
                    </>
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

export default Orders;
