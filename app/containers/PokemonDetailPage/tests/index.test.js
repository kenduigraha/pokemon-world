/**
 *
 * Tests for PokemonDetailPage
 *
 * @see https://github.com/react-boilerplate/react-boilerplate/tree/master/docs/testing
 *
 */

import React from 'react';
import { render } from 'react-testing-library';
import { IntlProvider } from 'react-intl';
import { Provider } from 'react-redux';
import { BrowserRouter, browserHistory } from 'react-router-dom';
// import 'jest-dom/extend-expect'; // add some helpful assertions
import { initialState } from 'containers/PokemonHomePage/reducer';
import configureStore from '../../../configureStore';

import { PokemonDetailPage } from '../index';
import { DEFAULT_LOCALE } from '../../../i18n';

describe('<PokemonDetailPage />', () => {
  let store;
  beforeAll(() => {
    store = configureStore({}, browserHistory);
  });
  it('Expect to not log errors in console', () => {
    const spy = jest.spyOn(global.console, 'error');
    const dispatch = jest.fn();
    render(
      <Provider store={store}>
        <IntlProvider locale={DEFAULT_LOCALE}>
          <BrowserRouter>
            <PokemonDetailPage
              dispatch={dispatch}
              pokemonHomePage={{
                pokemonList: { ...initialState.pokemonList },
                pokemonTypes: { ...initialState.pokemonTypes },
                pokemonDetail: { ...initialState.pokemonDetail },
              }}
              match={
                {
                  params: {
                    pokemonName: ''
                  }
                }
              }
            />
          </BrowserRouter>
        </IntlProvider>
      </Provider>,
    );
    expect(spy).not.toHaveBeenCalled();
  });

  /**
   * Unskip this test to use it
   *
   * @see {@link https://jestjs.io/docs/en/api#testskipname-fn}
   */
  it.skip('Should render and match the snapshot', () => {
    const {
      container: { firstChild },
    } = render(
      <IntlProvider locale={DEFAULT_LOCALE}>
        <BrowserRouter>
          <PokemonDetailPage
            dispatch={dispatch}
            pokemonHomePage={{
              pokemonList: { ...initialState.pokemonList },
              pokemonTypes: { ...initialState.pokemonTypes },
              pokemonDetail: { ...initialState.pokemonDetail },
            }}
            match={
              {
                params: {
                  pokemonName: ''
                }
              }
            }
          />
        </BrowserRouter>
      </IntlProvider>,
    );
    expect(firstChild).toMatchSnapshot();
  });
});
