/**
 *
 * PokemonDetailPage
 *
 */

import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Row, Col, Icon, Typography, Skeleton } from 'antd';
import { Link } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import {
  getPokemonDetailStart,
  doFavPokemonStart,
  doUnFavPokemonStart,
} from '../PokemonHomePage/actions';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectPokemonDetailPage from '../PokemonHomePage/selectors';
import reducer from '../PokemonHomePage/reducer';
import saga from '../PokemonHomePage/saga';

import PokemonDetailDisplay from 'components/PokemonDetailDisplay';

const { Title } = Typography;

const PokemonDetailMenu = styled(Row)`
  text-align: center;
  display: flex !important;
  justify-content: center;
  align-items: center;
`;

const IconBack = styled(Icon)`
  font-size:26px;
  color: #00d451 !important;
  cursor: pointer;
`;

const TitlePokemon = styled(Title)`
  color: #00d451 !important;
`;

export function PokemonDetailPage({ dispatch, pokemonHomePage, ...props }) {
  useInjectReducer({ key: 'pokemonDetailPage', reducer });
  useInjectSaga({ key: 'pokemonDetailPage', saga });

  const getPokemonDetail = data => dispatch(getPokemonDetailStart(data));
  
  const favPokemon = data => dispatch(doFavPokemonStart(data));
  const unFavPokemon = data => dispatch(doUnFavPokemonStart(data));
  
  const { pokemonDetail } = pokemonHomePage;

  useEffect(() => {
    const { match: { params: { pokemonName } } } = props;
    getPokemonDetail(pokemonName);
  }, []);

  if (pokemonDetail.isLoading) {
    return <Skeleton active />;
  }

  return (
    <div>
      <PokemonDetailMenu>
        <Col span={4}>
          <Link to="/" >
            <IconBack type="left" />
          </Link>
        </Col>
        
        <Col span={20}>
          {!pokemonDetail.isError && (
            <TitlePokemon>{pokemonDetail.data.species.name}</TitlePokemon>
          )}
        </Col>
      </PokemonDetailMenu>

      {
        pokemonDetail.isError ? (
          'Pokémon Not Found'
        ) : (
          <Row>
            <PokemonDetailDisplay
              pokemonDetail={pokemonDetail}
              doFavPokemon={favPokemon}
              doUnFavPokemon={unFavPokemon}
            />
          </Row>
        )
      }
    </div>
  );
}

PokemonDetailPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  pokemonHomePage: makeSelectPokemonDetailPage(),
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
)(PokemonDetailPage);
