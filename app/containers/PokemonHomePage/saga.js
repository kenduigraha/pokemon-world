import { call, put, all, takeLatest } from 'redux-saga/effects';
import {
  GET_POKEMON_LIST_START,
  GET_POKEMON_DETAIL_START,
  GET_POKEMON_TYPES_START,
  GET_POKEMON_LIST_BY_TYPES_START,
} from 'containers/PokemonHomePage/constants';
import {
  getPokemonListSuccess,
  getPokemonListFailed,
  getPokemonDetailSuccess,
  getPokemonDetailFailed,
  getPokemonTypesListSuccess,
  getPokemonTypesListFailed,
  getPokemonListByTypeSuccess,
  getPokemonListByTypeFailed,
} from 'containers/PokemonHomePage/actions';

import { POKEMON } from 'utils/api';

import request from 'utils/request';

export function* getPokemonList({
  params: { offset = 0, limit = 20, name = '' },
}) {
  try {
    const data = yield call(
      request,
      `${POKEMON.BASE_URL}/${name}?offset=${offset}&limit=${limit}`,
    );
    yield put(getPokemonListSuccess(data));
  } catch (err) {
    yield put(getPokemonListFailed(err));
  }
}

export function* getPokemonTypesList() {
  try {
    const data = yield call(request, POKEMON.TYPE);
    yield put(getPokemonTypesListSuccess(data));
  } catch (err) {
    yield put(getPokemonTypesListFailed(err));
  }
}
export function* getPokemonListByTpe({ params }) {
  try {
    const data = yield call(request, `${POKEMON.TYPE}/${params}`);
    yield put(getPokemonListByTypeSuccess(data));
  } catch (err) {
    yield put(getPokemonListByTypeFailed(err));
  }
}

export function* getPokemonDetail({ data }) {
  try {
    const response = yield call(request, `${POKEMON.BASE_URL}/${data}`);
    yield put(getPokemonDetailSuccess(response));
  } catch (err) {
    yield put(getPokemonDetailFailed(err));
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* pokemonHomePageSaga() {
  yield all([
    yield takeLatest(GET_POKEMON_LIST_START, getPokemonList),
    yield takeLatest(GET_POKEMON_DETAIL_START, getPokemonDetail),
    yield takeLatest(GET_POKEMON_TYPES_START, getPokemonTypesList),
    yield takeLatest(GET_POKEMON_LIST_BY_TYPES_START, getPokemonListByTpe),
  ]);
}
