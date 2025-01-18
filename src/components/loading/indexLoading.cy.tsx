import Loading from './index';
import React from 'react';

describe('<Loading />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<Loading />);
  });
});
