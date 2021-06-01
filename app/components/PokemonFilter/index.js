/**
 *
 * PokemonFilter
 *
 */

import React, { memo, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import debounce from 'lodash.debounce';

import { Input, Select, Row, Col } from 'antd';

const { Search } = Input;
const { Option } = Select;

const PokemonSelect = styled(Select)`
  width: 100%;
`;

const PokemonFilterRow = styled(Row)`
  padding-left: 30px;
  padding-right: 30px;
`;

const FilterCol = styled(Col)`
  margin: 10px 0px 20px 0px;
`;

function PokemonFilter({ getPokemonList, pokemonTypes, getPokemonListByType }) {
  const [dataInput, setDataInput] = useState('');

  const handleChange = value => {
    getPokemonListByType(value);
  };

  const debouncedSearch = useCallback(
    debounce(valueSearched => getPokemonList({ name: valueSearched }), 2000),
    [],
  );

  const handleOnChangeSearchPokemon = e => {
    e.persist();
    const valueSearched = e.target.value.trim();

    if (valueSearched) {
      if (valueSearched.length >= 3) {
        debouncedSearch(valueSearched);
      }
    } else {
      debouncedSearch('');
    }
    setDataInput(valueSearched);
  };

  return (
    <div>
      <PokemonFilterRow span={24} gutter={20}>
        <FilterCol span={10} xs={24} sm={24} md={24} lg={24} xl={10}>
          <PokemonSelect
            size="large"
            placeholder="Select Pokémon's Type"
            onChange={handleChange}
          >
            {pokemonTypes.map(type => (
              <Option key={type.name} value={type.name}>
                {type.name}
              </Option>
            ))}
          </PokemonSelect>
        </FilterCol>
        <FilterCol span={14} xs={24} sm={24} md={24} lg={24} xl={14}>
          <Search
            size="large"
            value={dataInput}
            placeholder="Search for Pokémon"
            onSearch={value => getPokemonList({ name: value })}
            onChange={handleOnChangeSearchPokemon}
          />
        </FilterCol>
      </PokemonFilterRow>
    </div>
  );
}

PokemonFilter.propTypes = {
  getPokemonList: PropTypes.func.isRequired,
  getPokemonListByType: PropTypes.func.isRequired,
  pokemonTypes: PropTypes.array.isRequired,
};

export default memo(PokemonFilter);
