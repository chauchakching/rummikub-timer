import * as React from 'react';
import { render } from '@testing-library/react';
import { expect } from 'chai';
import App from './App';

describe('<App>', () => {
  it('renders learn react link', () => {
    const { queryAllByText } = render(<App />);
    const linkElements = queryAllByText(/60/i);
    expect(linkElements.length).to.equal(2)
  })
})
