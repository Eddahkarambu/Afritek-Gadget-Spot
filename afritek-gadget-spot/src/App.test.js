import React from 'react';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import App from './App';

jest.mock('react-router-dom', () => ({
  BrowserRouter: ({ children }) => children,
  Routes: ({ children }) => children,
  Route: ({ element }) => element,
}));
jest.mock('./components/Navbar', () => () => null);
jest.mock('./Pages/Home', () => () => null);
jest.mock('./Pages/About', () => () => null);
jest.mock('./Pages/Contact', () => () => null);
jest.mock('./Pages/Checkout', () => () => null);
jest.mock('./Pages/Payment', () => () => null);
jest.mock('./Pages/OrderConfirmation', () => () => null);
jest.mock('./Pages/Shop', () => ({ addToCart }) => (
  <button onClick={() => {
    addToCart({ id: 1, name: 'Test phone', price: 12000 });
    addToCart({ id: 1, name: 'Test phone', price: 12000 });
  }}>Add twice</button>
));
jest.mock('./Pages/Cart', () => ({ cartItems, removeFromCart }) => (
  <div><output data-testid="cart">{JSON.stringify(cartItems)}</output>
    <button onClick={() => removeFromCart(1)}>Remove</button></div>
));

beforeEach(() => localStorage.clear());
test('batched additions survive remount and removal persists', () => {
  render(<App />);
  fireEvent.click(screen.getByText('Add twice'));
  expect(JSON.parse(screen.getByTestId('cart').textContent)[0].quantity).toBe(2);
  cleanup();
  render(<App />);
  expect(JSON.parse(screen.getByTestId('cart').textContent)[0].quantity).toBe(2);
  fireEvent.click(screen.getByText('Remove'));
  cleanup();
  render(<App />);
  expect(screen.getByTestId('cart').textContent).toBe('[]');
});

test.each(['bad json', '{}', '[null,{"id":1,"quantity":-1}]'])(
  'invalid saved cart does not crash: %s', (saved) => {
    localStorage.setItem('afritek.cart.v1', saved);
    render(<App />);
    expect(screen.getByTestId('cart').textContent).toBe('[]');
  },
);
