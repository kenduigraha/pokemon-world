/*
 *
 * PokemonHomePage reducer
 *
 */
import produce from 'immer';
import {
  DEFAULT_ACTION,
  GET_POKEMON_LIST_START,
  GET_POKEMON_LIST_SUCCESS,
  GET_POKEMON_LIST_FAILED,
  UPDATE_FLAG_INFINITY,
  GET_POKEMON_DETAIL_START,
  GET_POKEMON_DETAIL_SUCCESS,
  GET_POKEMON_DETAIL_FAILED,
  RESET_POKEMON_DETAIL,
  GET_POKEMON_TYPES_START,
  GET_POKEMON_TYPES_SUCCESS,
  GET_POKEMON_TYPES_FAILED,
  GET_POKEMON_LIST_BY_TYPES_START,
  GET_POKEMON_LIST_BY_TYPES_SUCCESS,
  GET_POKEMON_LIST_BY_TYPES_FAILED,
  FAVOURITE_POKEMON,
  UN_FAVOURITE_POKEMON,
} from './constants';

export const initialState = {
  pokemonList: {
    data: [],
    error: {},
    isLoading: false,
    infinity: false,
  },
  pokemonDetail: {
    data: {
      species: {
        name: '',
        url: '',
      },
      types: [],
      stats: '',
      height: '',
      weight: '',
      base_experience: '',
      like: false,
    },
    error: {},
    isError: false,
    isLoading: false,
  },
  pokemonTypes: {
    data: [],
    error: {},
    isLoading: false,
  },
};

/* eslint-disable default-case, no-param-reassign */
const pokemonHomePageReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case DEFAULT_ACTION:
        break;
      case GET_POKEMON_LIST_BY_TYPES_START:
      case GET_POKEMON_LIST_START:
        draft.pokemonList.isLoading = true;
        draft.pokemonList.error = {};
        break;
      case GET_POKEMON_LIST_SUCCESS:
        draft.pokemonList.isLoading = false;
        if (!action.data.results) {
          draft.pokemonList.data = [action.data.species];
        } else {
          const doCheckExistingData = () => {
            const existingData = state.pokemonList.data;

            const filteredPokemonList = existingData.filter(
              e => this.indexOf(e.name) < 0,
              action.data.results.map(result => result.name),
            );
            console.log('filteredPokemonList')
            console.log(filteredPokemonList)
            return filteredPokemonList.length > 0 ? existingData.concat(action.data.results) : existingData;
          }

          let results =
            state.pokemonList.data.length === 0
              ? action.data.results
              : doCheckExistingData();

          results = results.map(data => ({
            ...data,
            like: false,
          }));

          draft.pokemonList.data = action.data.results ? results : [];
        }
        draft.pokemonList.error = {};
        break;

      case GET_POKEMON_LIST_BY_TYPES_SUCCESS:
        draft.pokemonList.isLoading = false;
        draft.pokemonList.data = action.data.pokemon.map(detail => ({
          ...detail.pokemon,
        }));
        break;
      case GET_POKEMON_LIST_BY_TYPES_FAILED:
      case GET_POKEMON_LIST_FAILED:
        draft.pokemonList.isLoading = false;
        draft.pokemonList.infinity = false;
        draft.pokemonList.data = [];
        draft.pokemonList.error = action.error;
        break;
      case UPDATE_FLAG_INFINITY:
        draft.pokemonList.infinity = action.data;
        break;

      // GET DETAIL POKEMON
      case GET_POKEMON_DETAIL_START:
        draft.pokemonDetail.isLoading = true;
        break;
      case GET_POKEMON_DETAIL_SUCCESS:
        draft.pokemonDetail.isLoading = false;
        draft.pokemonDetail.data = action.data;
        draft.pokemonDetail.isError = false;
        break;
      case GET_POKEMON_DETAIL_FAILED:
        draft.pokemonDetail.isLoading = false;
        draft.pokemonDetail.data = [];
        draft.pokemonDetail.error = action.error;
        draft.pokemonDetail.isError = true;
        break;
      case RESET_POKEMON_DETAIL:
        draft.pokemonDetail.data = {
          species: {
            name: '',
            url: '',
          },
          types: [],
          stats: '',
          height: '',
          weight: '',
          base_experience: '',
          like: false,
        };
        draft.pokemonDetail.error = {};
        draft.pokemonDetail.isLoading = false;
        draft.pokemonDetail.isError = false;
        break;

        // Fave or Unfav Pokemon
        case FAVOURITE_POKEMON:
          const newDataFav = state.pokemonList.data.map(pokemon => ({
            ...pokemon,
            like: pokemon.name === action.data ? true : false,
          }));

          draft.pokemonList.data = newDataFav;
          break;
        case UN_FAVOURITE_POKEMON:
          const newDataUnFav = state.pokemonList.data.map(pokemon => ({
            ...pokemon,
            like: pokemon.name === action.data ? false : true,
          }));

          draft.pokemonList.data = newDataUnFav;
          break;
        break;

      // GET LIST POKEMON TYPES
      case GET_POKEMON_TYPES_START:
        draft.pokemonTypes.isLoading = true;
        break;
      case GET_POKEMON_TYPES_SUCCESS:
        draft.pokemonTypes.isLoading = false;
        draft.pokemonTypes.data = action.data.results;
        break;
      case GET_POKEMON_TYPES_FAILED:
        draft.pokemonTypes.isLoading = false;
        draft.pokemonTypes.data = [];
        draft.pokemonTypes.error = action.error;
        break;
    }
  });

export default pokemonHomePageReducer;
