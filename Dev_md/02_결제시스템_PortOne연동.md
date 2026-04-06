# AI Hub 결제 시스템 — PortOne V1 연동

## 개요

| 항목 | 내용 |
|------|------|
| 결제 게이트웨이 | PortOne V1 (iamport) |
| PG사 | KG이니시스 |
| 지원 결제수단 | 카드결제(card), 계좌이체(transfer) |
| 주문번호 형식 | `AIH-YYMMDD-XXXXX` (ex: AIH-260406-A3B7CK) |
| 데모 모드 | `.env` 미설정 시 자동 데모 결제 |

---

## 결제 플로우

```
[사용자] Shop → Cart → Checkout
    │
    ├── 1. 고객 정보 입력 (이름, 이메일, 전화번호)
    │   └── 로그인 시 자동 채움 (profile/user 정보)
    │
    ├── 2. 결제수단 선택 (카드/계좌이체)
    │
    ├── 3. 약관 동의
    │
    ├── 4. 주문 생성 (Supabase)
    │   └── createOrder() → ah_orders + ah_order_items INSERT
    │
    ├── 5. PortOne 결제 요청
    │   └── requestPayment() → IMP.request_pay()
    │
    ├── 6. 결제 결과 처리
    │   ├── 성공 → verifyPayment() or updateOrderStatus('paid')
    │   └── 실패 → 에러 메시지 표시
    │
    └── 7. 결제 완료 → /order-confirmation 리다이렉트
```

---

## 핵심 파일

### `src/utils/portone.js`

```javascript
// PortOne V1 SDK 초기화
const IMP_CODE = import.meta.env.VITE_IMP_CODE;
const PG_PROVIDER = import.meta.env.VITE_PG_PROVIDER;

// 결제 요청 함수
requestPayment({
  orderId,      // 주문번호 (merchant_uid)
  orderName,    // 표시명 "DreamIT AI Hub 상품 N건"
  totalAmount,  // 총 금액 (KRW)
  payMethod,    // 'CARD' | 'TRANSFER'
  customer: {   // 고객 정보
    fullName, email, phoneNumber
  }
}) → Promise<{paymentId, txId} | {code, message}>
```

**데모 모드**: `VITE_IMP_CODE` 미설정 시 `demo-pay-{timestamp}` 반환

### `src/utils/supabase.js`

| 함수 | 설명 | 테이블 |
|------|------|--------|
| `createOrder(orderData)` | 주문 + 주문상세 생성 | `ah_orders`, `ah_order_items` |
| `getOrderByNumber(orderNumber)` | 주문번호로 조회 | `ah_orders` + JOIN |
| `updateOrderStatus(orderId, status, paymentId, cancelReason)` | 결제 상태 업데이트 | `ah_orders` |
| `verifyPayment(paymentId, orderId)` | Edge Function으로 결제 검증 | Supabase Functions |
| `getOrdersByUser(userId)` | 사용자 주문 이력 | `ah_orders` + `ah_order_items` |

---

## 주문 상태 흐름

```
pending → paid      (결제 성공)
pending → failed    (결제 실패)
paid    → cancelled (주문 취소)
paid    → refunded  (환불 처리)
```

---

## Checkout.tsx 결제 프로세스

### 1단계: 폼 유효성 검사
- 이름: 빈 값 불가
- 이메일: 정규식 검증 (`/^[^\s@]+@[^\s@]+\.[^\s@]+$/`)
- 전화번호: 최소 10자리 숫자

### 2단계: 주문 생성
```javascript
const orderData = {
  order_number: generateOrderNumber(), // AIH-YYMMDD-XXXXX
  user_email, user_name, user_phone,
  total_amount: cartTotal,
  payment_method: paymentMethod,
  user_id: user?.id || null,
  items: cartItems.map(item => ({
    product_title, quantity, unit_price, subtotal
  }))
};
await createOrder(orderData);
```

### 3단계: PortOne 결제
```javascript
const paymentResult = await requestPayment({
  orderId: orderId,
  orderName: `DreamIT AI Hub 상품 ${itemCount}건`,
  totalAmount: cartTotal,
  payMethod: paymentMethod === 'card' ? 'CARD' : 'TRANSFER',
  customer: { fullName, email, phoneNumber }
});
```

### 4단계: 결제 검증 & 완료
```javascript
// 1차: Edge Function 검증
await verifyPayment(paymentResult.paymentId, orderId);
// 2차 (fallback): 직접 상태 업데이트
await updateOrderStatus(orderId, 'paid', paymentResult.paymentId);
// 장바구니 비우고 확인 페이지로 이동
clearCart();
navigate(`/order-confirmation?orderNumber=${orderNumber}`, { state: confirmState });
```

---

## 환경 변수 (.env)

```env
VITE_IMP_CODE=imp12345678          # PortOne 가맹점 식별코드
VITE_PG_PROVIDER=html5_inicis      # PG사 식별자 (KG이니시스)
VITE_SUPABASE_URL=https://xxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJ...
```

---

## 관련 페이지

| 페이지 | 경로 | 설명 |
|--------|------|------|
| Shop | `/shop` | 상품 목록 (카테고리 필터, 장바구니 담기) |
| Cart | `/cart` | 장바구니 (수량 변경, 삭제) |
| Checkout | `/checkout` | 결제 (고객정보, 결제수단, PortOne 연동) |
| OrderConfirmation | `/order-confirmation` | 결제 완료 확인 |
| OrderHistory | `/mypage/orders` | 주문 이력 (페이지네이션, 상세보기) |
| Admin Orders | `/admin/orders` | 관리자 주문 관리 |
