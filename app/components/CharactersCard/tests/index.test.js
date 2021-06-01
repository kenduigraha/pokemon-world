/**
 *
 * Tests for CharactersCard
 *
 * @see https://github.com/react-boilerplate/react-boilerplate/tree/master/docs/testing
 *
 */

import React from 'react';
import { render } from 'react-testing-library';
import { IntlProvider } from 'react-intl';
import { BrowserRouter } from 'react-router-dom';
// import 'jest-dom/extend-expect'; // add some helpful assertions

import CharactersCard from '../index';
import { DEFAULT_LOCALE } from '../../../i18n';

describe('<CharactersCard />', () => {
  it('Expect to not log errors in console', () => {
    const spy = jest.spyOn(global.console, 'error');
    render(
      <BrowserRouter>
        <IntlProvider locale={DEFAULT_LOCALE}>
          <CharactersCard
            data={{ name: '', url: '' }}
            loading={false}
            showModal={() => {}}
            doFavPokemon={() => {}}
            doUnFavPokemon={() => {}}
          />
        </IntlProvider>
      </BrowserRouter>,
    );
    expect(spy).not.toHaveBeenCalled();
  });

  /**
   * Unskip this test to use it
   *
   * @see {@link https://jestjs.io/docs/en/api#testskipname-fn}
   */
  it('Should render and match the snapshot', () => {
    const {
      container: { firstChild },
    } = render(
      <BrowserRouter>
        <IntlProvider locale={DEFAULT_LOCALE}>
          <CharactersCard
            data={{ name: '', url: '' }}
            loading={false}
            showModal={() => {}}
            doFavPokemon={() => {}}
            doUnFavPokemon={() => {}}
          />
        </IntlProvider>
      </BrowserRouter>,
    );
    expect(firstChild).toMatchSnapshot();
  });
});
