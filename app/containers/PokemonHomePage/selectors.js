import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the pokemonHomePage state domain
 */

const selectPokemonHomePageDomain = state => {
  if (state.pokemonDetailPage) return state.pokemonDetailPage;
  return state.pokemonHomePage || initialState;
};

/**
 * Other specific selectors
 */

/**
 * Default selector used by PokemonHomePage
 */

const makeSelectPokemonHomePage = () =>
  createSelector(
    selectPokemonHomePageDomain,
    substate => substate,
  );

export default makeSelectPokemonHomePage;
export { selectPokemonHomePageDomain };
