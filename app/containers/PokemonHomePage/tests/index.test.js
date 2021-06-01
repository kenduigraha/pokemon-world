/**
 *
 * Tests for PokemonHomePage
 *
 * @see https://github.com/react-boilerplate/react-boilerplate/tree/master/docs/testing
 *
 */

import React from 'react';
import renderer from 'react-test-renderer';
import { IntlProvider } from 'react-intl';
import { Provider } from 'react-redux';
import { browserHistory } from 'react-router-dom';

import { initialState } from 'containers/PokemonHomePage/reducer';
import configureStore from '../../../configureStore';
// import 'jest-dom/extend-expect'; // add some helpful assertions

import { PokemonHomePage } from '../index';
// import { DEFAULT_LOCALE } from '../../../i18n';

describe('<PokemonHomePage />', () => {
  let store;

  beforeAll(() => {
    store = configureStore({}, browserHistory);
  });

  it.skip('should render and match the snapshot', () => {
    const dispatch = jest.fn();
    const renderedComponent = renderer
      .create(
        <Provider store={store}>
          <IntlProvider locale="en">
            <PokemonHomePage
              pokemonHomePage={{
                pokemonList: { ...initialState.pokemonList },
                pokemonTypes: { ...initialState.pokemonTypes },
                pokemonDetail: { ...initialState.pokemonDetail },
              }}
              dispatch={dispatch}
            />
          </IntlProvider>
        </Provider>,
      )
      .toJSON();

    expect(renderedComponent).toMatchSnapshot();
  });
});
