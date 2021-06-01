/**
 *
 * PokemonHomePage
 *
 */

import React, { memo, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { LIST_FAV_POKEMON } from 'components/CharactersCard';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import {
  getPokemonListStart,
  updateFlagInfinityStart,
  getPokemonTypesListStart,
  getPokemonListByTypeStart,
  getPokemonDetailStart,
  resetPokemonDetailStart,
  doFavPokemonStart,
  doUnFavPokemonStart,
} from 'containers/PokemonHomePage/actions';
import PokemonFilter from 'components/PokemonFilter';
import PokemonList from 'components/PokemonList';
import { notification, Menu } from 'antd';
import makeSelectPokemonHomePage from './selectors';
import reducer from './reducer';
import saga from './saga';


const MenuWrapper = styled(Menu)`
  & > .ant-menu-item-selected {
    color: #00d451 !important;
    border-bottom: 2px solid #00d451 !important;
  }
`;

const MenuItem = styled(Menu.Item)`
  width: 50%;
  text-align: center;
  color: #00d451;
`;

export function PokemonHomePage({ dispatch, pokemonHomePage }) {
  useInjectReducer({ key: 'pokemonHomePage', reducer });
  useInjectSaga({ key: 'pokemonHomePage', saga });

  const [currentMenu, setCurrentMenu] = useState('home');  
  const { pokemonList, pokemonTypes, pokemonDetail } = pokemonHomePage;
  const [pokemonListFav, setPokemonListFave] = useState(pokemonList);
  
  /**
   * dispatch actions
   */
  const getPokemonList = params => dispatch(getPokemonListStart(params));
  const getPokemonListByType = type =>
    dispatch(getPokemonListByTypeStart(type));
  const getPokemonTypesList = () => dispatch(getPokemonTypesListStart());
  const updateFlagInfinity = flag => dispatch(updateFlagInfinityStart(flag));
  const getPokemonDetail = data => dispatch(getPokemonDetailStart(data));
  const resetPokemonDetail = () => dispatch(resetPokemonDetailStart());
  
  const favPokemon = data => dispatch(doFavPokemonStart(data));
  const unFavPokemon = data => dispatch(doUnFavPokemonStart(data));

  const handleClickMenu = e => {
    setCurrentMenu(e.key);

    const { data } = pokemonList;

    const getDataLocalStorage = localStorage.getItem(LIST_FAV_POKEMON) ? JSON.parse(localStorage.getItem(LIST_FAV_POKEMON)) : [];

    const filteredPokemonList = data.filter(
      function(e) {
        return this.indexOf(e.name) >= 0;
      },
      getDataLocalStorage,
    );

    if (e.key === 'home') {
      getPokemonList({ offset: 0, limit: 20, name: '' });
    } else {
      setPokemonListFave({
        ...pokemonList,
        data: filteredPokemonList
      });
    }
    
  };

  useEffect(() => {
    getPokemonList({ offset: 0, limit: 20, name: '' });
    getPokemonTypesList();

    resetPokemonDetail();
  }, []);

  useEffect(() => {
    const { error } = pokemonList;

    // check object error is not empty
    if (Object.keys(error).length > 0) {
      if (error.response.status === 404) {
        // not found
        notification.info({
          message: 'Pokémon Not Found',
        });
      }
    }
  }, [pokemonList.data]);

  return (
    <div>
      <Helmet>
        <title>PokemonHomePage</title>
        <meta name="description" content="Description of PokemonHomePage" />
      </Helmet>

      <MenuWrapper onClick={handleClickMenu} selectedKeys={[currentMenu]} mode="horizontal">
        <MenuItem key="home">
          Home
        </MenuItem>
        <MenuItem key="my-pokemon-list">
          My Pokemon List
        </MenuItem>
      </MenuWrapper>
      {
        currentMenu === 'home' && (
          <>
            <PokemonFilter
              getPokemonList={getPokemonList}
              getPokemonListByType={getPokemonListByType}
              pokemonTypes={pokemonTypes.data}
            />
            <PokemonList
              pokemonList={pokemonList}
              getPokemonList={getPokemonList}
              updateFlagInfinity={updateFlagInfinity}
              getPokemonDetail={getPokemonDetail}
              pokemonDetail={pokemonDetail}
              resetPokemonDetail={resetPokemonDetail}
              doFavPokemon={favPokemon}
              doUnFavPokemon={unFavPokemon}
            />
          </>
        )
      }

      {
        currentMenu === 'my-pokemon-list' && (
          <div>
            <PokemonList
              pokemonList={pokemonListFav}
              getPokemonList={getPokemonList}
              updateFlagInfinity={updateFlagInfinity}
              getPokemonDetail={getPokemonDetail}
              pokemonDetail={pokemonDetail}
              resetPokemonDetail={resetPokemonDetail}
              doFavPokemon={favPokemon}
              doUnFavPokemon={unFavPokemon}
            />
          </div>
        )
      }
    </div>
  );
}

PokemonHomePage.propTypes = {
  dispatch: PropTypes.func.isRequired,
  pokemonHomePage: PropTypes.object.isRequired,
};

const mapStateToProps = createStructuredSelector({
  pokemonHomePage: makeSelectPokemonHomePage(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(PokemonHomePage);
