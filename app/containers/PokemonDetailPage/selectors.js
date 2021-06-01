import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the pokemonDetailPage state domain
 */

const selectPokemonDetailPageDomain = state =>
  state.pokemonDetailPage || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by PokemonDetailPage
 */

const makeSelectPokemonDetailPage = () =>
  createSelector(
    selectPokemonDetailPageDomain,
    substate => substate,
  );

export default makeSelectPokemonDetailPage;
export { selectPokemonDetailPageDomain };
