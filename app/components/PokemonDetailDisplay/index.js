/**
 *
 * PokemonDetailDisplay
 *
 */

import React, { memo } from 'react';
import { Row, Col, Typography, Progress } from 'antd';
import PropTypes from 'prop-types';
import CharactersCard from 'components/CharactersCard';

import {
  PokemonTypeButton,
  PokemonProfileRow,
  PokemonStatsCol,
  PokemonTypeCol,
} from './styles';

const { Text } = Typography;

function PokemonDetailDisplay({
  pokemonDetail,
  doFavPokemon,
  doUnFavPokemon,
  dataPokemonModal,
}) {
  const renderType = types =>
    types.map(data => {
      const type = data.type.name;

      return (
        <PokemonTypeButton
          className={`btn-type-${type}`}
          key={type}
          variant={type}
        >
          {type}
        </PokemonTypeButton>
      );
    });

  const renderStats = stats =>
    stats.reverse().map(data => (
      <Row key={data.stat.name}>
        <Col span={12}>{data.stat.name}</Col>
        <Col span={12}>
          <Progress percent={data.base_stat} />
        </Col>
      </Row>
    ));

  return (
    <>
      <Row span={24} gutter={15}>
        <Col span={12}>
          <CharactersCard
            span={24}
            loading={false}
            data={
              pokemonDetail.data &&
              pokemonDetail.data.species &&
              pokemonDetail.data.species.name
                ? pokemonDetail.data.species
                : dataPokemonModal
            }
            showModal={() => {}}
            doFavPokemon={doFavPokemon}
            doUnFavPokemon={doUnFavPokemon}
          />
        </Col>
        <Col span={12}>
          <PokemonTypeCol span={24}>
            {pokemonDetail.data &&
              pokemonDetail.data.types &&
              renderType(pokemonDetail.data.types)}
          </PokemonTypeCol>

          <PokemonStatsCol span={24}>
            {pokemonDetail.data &&
              pokemonDetail.data.stats &&
              renderStats(pokemonDetail.data.stats)}
          </PokemonStatsCol>

          <Col span={24}>
            <PokemonProfileRow span={24}>
              <Col col={24}>
                <Text strong>Profile</Text>
                <div>
                  <span>Height :</span>
                  &nbsp;&nbsp;
                  {pokemonDetail.data &&
                    pokemonDetail.data.height &&
                    pokemonDetail.data.height}{' '}
                  m
                </div>
                <div>
                  <span>Weight :</span>
                  &nbsp;&nbsp;
                  {pokemonDetail.data &&
                    pokemonDetail.data.weight &&
                    pokemonDetail.data.weight}{' '}
                  kg
                </div>
                <div>
                  <span>Base Experience :</span>
                  &nbsp;&nbsp;
                  {pokemonDetail.data &&
                    pokemonDetail.data.base_experience &&
                    pokemonDetail.data.base_experience}
                </div>
              </Col>
            </PokemonProfileRow>
          </Col>
        </Col>
      </Row>
    </>
  );
}

PokemonDetailDisplay.propTypes = {
  pokemonDetail: PropTypes.object.isRequired,
  doFavPokemon: PropTypes.func.isRequired,
  doUnFavPokemon: PropTypes.func.isRequired,
  dataPokemonModal: PropTypes.object,
};

PokemonDetailDisplay.defaultProps = {
  dataPokemonModal: {
    name: '',
    url: '',
  },
};

export default memo(PokemonDetailDisplay);
