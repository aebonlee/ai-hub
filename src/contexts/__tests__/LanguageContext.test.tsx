// @ts-nocheck
import { describe, it, expect } from 'vitest';
import { render, screen, act } from '@testing-library/react';
import { LanguageProvider, useLanguage } from '../LanguageContext';

function LangTestHelper() {
  const { language, toggleLanguage, t } = useLanguage();
  return (
    <div>
      <span data-testid="lang">{language}</span>
      <span data-testid="home">{t('nav.home')}</span>
      <button data-testid="toggle" onClick={toggleLanguage}>Toggle</button>
    </div>
  );
}

describe('LanguageContext', () => {
  it('defaults to Korean', () => {
    render(<LanguageProvider><LangTestHelper /></LanguageProvider>);
    expect(screen.getByTestId('lang').textContent).toBe('ko');
    expect(screen.getByTestId('home').textContent).toBe('홈');
  });

  it('toggles to English', async () => {
    render(<LanguageProvider><LangTestHelper /></LanguageProvider>);
    await act(async () => { screen.getByTestId('toggle').click(); });
    expect(screen.getByTestId('lang').textContent).toBe('en');
    expect(screen.getByTestId('home').textContent).toBe('Home');
  });

  it('toggles back to Korean', async () => {
    render(<LanguageProvider><LangTestHelper /></LanguageProvider>);
    await act(async () => { screen.getByTestId('toggle').click(); });
    await act(async () => { screen.getByTestId('toggle').click(); });
    expect(screen.getByTestId('lang').textContent).toBe('ko');
  });

});

function MissingKeyHelper() {
  const { t } = useLanguage();
  return <span data-testid="missing">{t('nonexistent.key')}</span>;
}

describe('t() fallback', () => {
  it('returns the key string for missing translations', () => {
    render(<LanguageProvider><MissingKeyHelper /></LanguageProvider>);
    expect(screen.getByTestId('missing').textContent).toBe('nonexistent.key');
  });
});
