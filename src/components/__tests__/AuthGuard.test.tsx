// @ts-nocheck
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';

// Mock react-router-dom
const mockNavigate = vi.fn();
vi.mock('react-router-dom', () => ({
  Navigate: (props) => {
    mockNavigate(props.to);
    return null;
  },
  useLocation: () => ({ pathname: '/protected' }),
}));

// Mock AuthContext
vi.mock('../../contexts/AuthContext', () => ({
  useAuth: vi.fn(),
}));

import { useAuth } from '../../contexts/AuthContext';
import AuthGuard from '../AuthGuard';

describe('AuthGuard', () => {
  it('shows loading spinner when auth is loading', () => {
    useAuth.mockReturnValue({ isLoggedIn: false, loading: true });
    render(<AuthGuard><div>Protected Content</div></AuthGuard>);
    expect(screen.queryByText('Protected Content')).not.toBeInTheDocument();
    expect(document.querySelector('.loading-spinner')).toBeInTheDocument();
  });

  it('renders children when user is logged in', () => {
    useAuth.mockReturnValue({ isLoggedIn: true, loading: false });
    render(<AuthGuard><div>Protected Content</div></AuthGuard>);
    expect(screen.getByText('Protected Content')).toBeInTheDocument();
  });

  it('redirects to /login when not logged in', () => {
    useAuth.mockReturnValue({ isLoggedIn: false, loading: false });
    render(<AuthGuard><div>Protected Content</div></AuthGuard>);
    expect(screen.queryByText('Protected Content')).not.toBeInTheDocument();
    expect(mockNavigate).toHaveBeenCalledWith('/login');
  });
});
