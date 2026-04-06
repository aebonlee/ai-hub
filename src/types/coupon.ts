export interface Coupon {
  id: string;
  code: string;
  label: string;
  lecture_date: string;
  expires_at: string;
  is_active: boolean;
  created_by: string | null;
  created_at: string;
}

export interface CouponUse {
  id: string;
  coupon_id: string;
  user_id: string;
  redeemed_at: string;
}

export interface CouponWithStats extends Coupon {
  use_count: number;
}

export interface MyCoupon {
  id: string;
  code: string;
  label: string;
  lecture_date: string;
  expires_at: string;
  redeemed_at: string;
}
