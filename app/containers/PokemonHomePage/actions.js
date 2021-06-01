/*
 *
 * PokemonHomePage actions
 *
 */

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

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function getPokemonListStart(params) {
  return {
    type: GET_POKEMON_LIST_START,
    params,
  };
}

export function getPokemonListSuccess(data) {
  return {
    type: GET_POKEMON_LIST_SUCCESS,
    data,
  };
}

export function getPokemonListFailed(error) {
  return {
    type: GET_POKEMON_LIST_FAILED,
    error,
  };
}

export function updateFlagInfinityStart(flag) {
  return {
    type: UPDATE_FLAG_INFINITY,
    data: flag,
  };
}

export function doFavPokemonStart(data) {
  return {
    type: FAVOURITE_POKEMON,
    data,
  };
}

export function doUnFavPokemonStart(data) {
  return {
    type: UN_FAVOURITE_POKEMON,
    data,
  };
}

export function getPokemonDetailStart(data) {
  return {
    type: GET_POKEMON_DETAIL_START,
    data,
  };
}

export function getPokemonDetailSuccess(data) {
  return {
    type: GET_POKEMON_DETAIL_SUCCESS,
    data,
  };
}

export function getPokemonDetailFailed(error) {
  return {
    type: GET_POKEMON_DETAIL_FAILED,
    error,
  };
}

export function resetPokemonDetailStart() {
  return {
    type: RESET_POKEMON_DETAIL,
  };
}

export function getPokemonTypesListStart(params) {
  return {
    type: GET_POKEMON_TYPES_START,
    params,
  };
}

export function getPokemonTypesListSuccess(data) {
  return {
    type: GET_POKEMON_TYPES_SUCCESS,
    data,
  };
}

export function getPokemonTypesListFailed(error) {
  return {
    type: GET_POKEMON_TYPES_FAILED,
    error,
  };
}

export function getPokemonListByTypeStart(params) {
  return {
    type: GET_POKEMON_LIST_BY_TYPES_START,
    params,
  };
}

export function getPokemonListByTypeSuccess(data) {
  return {
    type: GET_POKEMON_LIST_BY_TYPES_SUCCESS,
    data,
  };
}

export function getPokemonListByTypeFailed(error) {
  return {
    type: GET_POKEMON_LIST_BY_TYPES_FAILED,
    error,
  };
}
