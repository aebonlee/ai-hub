import { Component, ReactNode } from 'react';

interface ErrorBoundaryProps { children: ReactNode }
interface ErrorBoundaryState { hasError: boolean }

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: any, info: any) {
    console.error('[ErrorBoundary]', error, info?.componentStack);
  }

  handleRetry = () => {
    this.setState({ hasError: false });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          display: 'flex', flexDirection: 'column', alignItems: 'center',
          justifyContent: 'center', minHeight: '60vh', gap: '16px', padding: '40px'
        }}>
          <h2 style={{ fontSize: '20px', fontWeight: 600 }}>페이지를 불러올 수 없습니다</h2>
          <p style={{ color: '#6b7280', fontSize: '14px' }}>일시적인 오류가 발생했습니다.</p>
          <button
            onClick={this.handleRetry}
            style={{
              padding: '10px 24px', borderRadius: '8px', border: 'none',
              background: '#2563EB', color: 'white', fontWeight: 600,
              cursor: 'pointer', fontSize: '14px'
            }}
          >
            다시 시도
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
