// @ts-nocheck
import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, act } from '@testing-library/react';
import { CartProvider, useCart } from '../CartContext';

function CartTestHelper() {
  const { cartItems, cartTotal, cartCount, addItem, removeItem, updateQuantity, clearCart } = useCart();
  return (
    <div>
      <span data-testid="count">{cartCount}</span>
      <span data-testid="total">{cartTotal}</span>
      <span data-testid="items">{JSON.stringify(cartItems)}</span>
      <button data-testid="add" onClick={() => addItem({ id: 1, title: 'A', price: 1000 })}>Add</button>
      <button data-testid="add-soldout" onClick={() => addItem({ id: 2, title: 'B', price: 500, isSoldOut: true })}>AddSold</button>
      <button data-testid="remove" onClick={() => removeItem(1)}>Remove</button>
      <button data-testid="qty" onClick={() => updateQuantity(1, 3)}>Qty3</button>
      <button data-testid="clear" onClick={() => clearCart()}>Clear</button>
    </div>
  );
}

beforeEach(() => {
  sessionStorage.clear();
});

describe('CartContext', () => {
  it('starts with empty cart', () => {
    render(<CartProvider><CartTestHelper /></CartProvider>);
    expect(screen.getByTestId('count').textContent).toBe('0');
    expect(screen.getByTestId('total').textContent).toBe('0');
  });

  it('adds an item to cart', async () => {
    render(<CartProvider><CartTestHelper /></CartProvider>);
    await act(async () => { screen.getByTestId('add').click(); });
    expect(screen.getByTestId('count').textContent).toBe('1');
    expect(screen.getByTestId('total').textContent).toBe('1000');
  });

  it('increments quantity on duplicate add', async () => {
    render(<CartProvider><CartTestHelper /></CartProvider>);
    await act(async () => { screen.getByTestId('add').click(); });
    await act(async () => { screen.getByTestId('add').click(); });
    expect(screen.getByTestId('count').textContent).toBe('2');
    expect(screen.getByTestId('total').textContent).toBe('2000');
  });

  it('does not add sold-out items', async () => {
    render(<CartProvider><CartTestHelper /></CartProvider>);
    await act(async () => { screen.getByTestId('add-soldout').click(); });
    expect(screen.getByTestId('count').textContent).toBe('0');
  });

  it('removes an item', async () => {
    render(<CartProvider><CartTestHelper /></CartProvider>);
    await act(async () => { screen.getByTestId('add').click(); });
    await act(async () => { screen.getByTestId('remove').click(); });
    expect(screen.getByTestId('count').textContent).toBe('0');
  });

  it('updates quantity', async () => {
    render(<CartProvider><CartTestHelper /></CartProvider>);
    await act(async () => { screen.getByTestId('add').click(); });
    await act(async () => { screen.getByTestId('qty').click(); });
    expect(screen.getByTestId('count').textContent).toBe('3');
    expect(screen.getByTestId('total').textContent).toBe('3000');
  });

  it('clears all items', async () => {
    render(<CartProvider><CartTestHelper /></CartProvider>);
    await act(async () => { screen.getByTestId('add').click(); });
    await act(async () => { screen.getByTestId('clear').click(); });
    expect(screen.getByTestId('count').textContent).toBe('0');
  });
});
