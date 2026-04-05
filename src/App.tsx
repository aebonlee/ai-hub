import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { LanguageProvider } from './contexts/LanguageContext';
import { CartProvider } from './contexts/CartContext';
import { AuthProvider } from './contexts/AuthContext';
import { ToastProvider } from './contexts/ToastContext';
import PublicLayout from './layouts/PublicLayout';

const AdminLayout = lazy(() => import('./layouts/AdminLayout'));

const AdminFallback = () => (
  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
    <div className="loading-spinner"></div>
  </div>
);

function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <AuthProvider>
          <ToastProvider>
            <CartProvider>
              <Router>
                <div className="App">
                  <Routes>
                    <Route
                      path="/admin/*"
                      element={
                        <Suspense fallback={<AdminFallback />}>
                          <AdminLayout />
                        </Suspense>
                      }
                    />
                    <Route path="*" element={<PublicLayout />} />
                  </Routes>
                </div>
              </Router>
            </CartProvider>
          </ToastProvider>
        </AuthProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;
