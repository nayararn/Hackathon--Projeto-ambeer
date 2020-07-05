import React from 'react';
import { cleanup, fireEvent, act, waitForElement } from '@testing-library/react';
import renderWithRouter from './mocks/RenderService';
import 'jest-mock';
import Login from '../pages/Login';
import Ambeer from '../context';
import Profile from '../pages/Profile';

const  saveInput = jest.fn();
const  userData = jest.fn();
const mocks = { saveInput, userData };

describe('Testing login screen', () => {
  afterEach(cleanup);

  test('renders a reading with the text Login', () => {
    const { getByText } = renderWithRouter(
      <Ambeer.Provider value={ saveInput }>
        <Login />
      </Ambeer.Provider>
    );

    act(() => {
      const login = getByText(/Login/i);
      expect(login).toBeInTheDocument();
    });
  });

  test('should check dataTestId', () => {
    const { getByTestId } = renderWithRouter(
      <Ambeer.Provider value={ saveInput }>
        <Login />
      </Ambeer.Provider>
    );

    act(() => {
      const inputEmail = getByTestId('email-input');
      const inputPassword = getByTestId('password-input');
      const inputButton = getByTestId('login-submit-btn');

      expect(inputEmail).not.toBeNull();
      expect(inputPassword).not.toBeNull();
      expect(inputButton).not.toBeNull();
    });
  });

  test('should check event', async () => {
    const { getByTestId, history } = renderWithRouter(
      <Ambeer.Provider value={ mocks }>
        <Login />
        <Profile />
      </Ambeer.Provider>
    );

    const [
      email,
      password,
      inputEmail,
      inputPassword,
      inputButton,
    ] = await waitForElement(() => [
      'test@gmail.com',
      '123456',
      getByTestId('email-input'),
      getByTestId('password-input'),
      getByTestId('login-submit-btn'),
    ]);

    act(() => {
      fireEvent.input(inputEmail, {
        target: { value: email },
      });
      fireEvent.input(inputPassword, {
        taget: { value: password },
      });
      fireEvent.click(inputButton);
      expect(history.location.pathname).toEqual('/profile');
    });
  });

  // test('testing false results', () => {
  //   const { getByTestId, getByRole } = renderWithRouter(
  //     <Ambeer.Provider value={ saveInput }>
  //     <Login />
  //   </Ambeer.Provider>
  //   );

  //   act(() => {
  //     const email = 'testgmail.com';
  //     const password = '12345';
  //     const inputEmail = getByTestId('email-input');
  //     const inputPassword = getByTestId('password-input');

  //     fireEvent.input(inputEmail, {
  //       target: { value: email },
  //     });
  //     fireEvent.input(inputPassword, {
  //       taget: { value: password },
  //     });
  //     expect(getByRole('input', { disabled: true }));
  //   });
  // });
});
