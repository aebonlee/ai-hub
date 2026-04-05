// @ts-nocheck
import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, act } from '@testing-library/react';
import { ThemeProvider, useTheme } from '../ThemeContext';

function ThemeTestHelper() {
  const { theme, mode, toggleTheme } = useTheme();
  return (
    <div>
      <span data-testid="theme">{theme}</span>
      <span data-testid="mode">{mode}</span>
      <button data-testid="toggle" onClick={toggleTheme}>Toggle</button>
    </div>
  );
}

beforeEach(() => {
  document.cookie = 'themeMode=;path=/;max-age=0';
  document.cookie = 'colorTheme=;path=/;max-age=0';
  document.cookie = 'theme=;path=/;max-age=0';
});

describe('ThemeContext', () => {
  it('defaults to auto mode', () => {
    render(<ThemeProvider><ThemeTestHelper /></ThemeProvider>);
    expect(screen.getByTestId('mode').textContent).toBe('auto');
  });

  it('resolves to light or dark in auto mode', () => {
    render(<ThemeProvider><ThemeTestHelper /></ThemeProvider>);
    const theme = screen.getByTestId('theme').textContent;
    expect(['light', 'dark']).toContain(theme);
  });

  it('cycles auto → light → dark → auto on toggle', async () => {
    render(<ThemeProvider><ThemeTestHelper /></ThemeProvider>);
    const toggleBtn = screen.getByTestId('toggle');

    await act(async () => { toggleBtn.click(); });
    expect(screen.getByTestId('mode').textContent).toBe('light');

    await act(async () => { toggleBtn.click(); });
    expect(screen.getByTestId('mode').textContent).toBe('dark');

    await act(async () => { toggleBtn.click(); });
    expect(screen.getByTestId('mode').textContent).toBe('auto');
  });

  it('sets data-theme attribute on document', async () => {
    render(<ThemeProvider><ThemeTestHelper /></ThemeProvider>);
    await act(async () => { screen.getByTestId('toggle').click(); });
    expect(document.documentElement.getAttribute('data-theme')).toBe('light');
  });
});
