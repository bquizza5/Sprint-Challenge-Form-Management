import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import LoginForm from './loginForm'
import { render, cleanup, fireEvent, getByTestId } from "@testing-library/react";

afterEach(cleanup)

it('renders without crashing using ReactDOM', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('renders without crashing', () => {
  render(<App />)
})

it("renders fields and submit button", () => {
  const loginForm = render(<LoginForm />);
  
  loginForm.getByText(/submit!/i);
});

it("errors work", () => {
  
  const { container } = render(<LoginForm />);
  const submitButton = getByTestId(container, "submitButton");
  fireEvent.click(submitButton);
});


