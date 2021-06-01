/**
 *
 * Tests for PokemonDetailDisplay
 *
 * @see https://github.com/react-boilerplate/react-boilerplate/tree/master/docs/testing
 *
 */

import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { render } from 'react-testing-library';
// import 'jest-dom/extend-expect'; // add some helpful assertions

import PokemonDetailDisplay from '../index';

describe('<PokemonDetailDisplay />', () => {
  it('Expect to not log errors in console', () => {
    const spy = jest.spyOn(global.console, 'error');
    render(
      <BrowserRouter>
        <PokemonDetailDisplay
          dataPokemonModal={{
            name: '',
            url: '',
          }}
          pokemonDetail={{}}
          doFavPokemon={() => {}}
          doUnFavPokemon={() => {}}
        />     
      </BrowserRouter>
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
    } = render(<PokemonDetailDisplay
      dataPokemonModal={{
        name: '',
        url: '',
      }}
      pokemonDetail={{}}
      doFavPokemon={() => {}}
      doUnFavPokemon={() => {}}
    />);
    expect(firstChild).toMatchSnapshot();
  });
});
