import React, { memo, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import { Card } from 'antd';
import { POKEMON_IMAGE_URL } from 'utils/constants';
import { TextLinkDetailPage, CharactersCardCol, IconHeart } from './styles';
const { Meta } = Card;

const getIdPokemon = url => url.split('/')[url.split('/').length - 2];

export const LIST_FAV_POKEMON = 'listFavouritePokemon';

const CharactersCard = ({
  data,
  span,
  loading,
  showModal,
  doFavPokemon,
  doUnFavPokemon,
  ...props
}) => {
  const [dataCharacter, setDataCharacter] = useState({ ...data, like: false, });

  useEffect(() => {
    const getDataLocalStorage = localStorage.getItem(LIST_FAV_POKEMON) ? JSON.parse(localStorage.getItem(LIST_FAV_POKEMON)) : [];

    if (getDataLocalStorage.indexOf(dataCharacter.name) >= 0) {
      setDataCharacter({
        ...dataCharacter,
        like: true,
      })
    }
  }, []);

  const handleOnClickName = (e) => {
    e.stopPropagation();

    props.history.push(`pokemon/${dataCharacter.name}`);
  };

  const handleOnClickLike = (e, { name: pokemonName, like }) => {
    e.stopPropagation();
    
    let getDataLocalStorage = localStorage.getItem(LIST_FAV_POKEMON) ? JSON.parse(localStorage.getItem(LIST_FAV_POKEMON)) : [pokemonName];


    if (!like) {
      if (getDataLocalStorage.length >= 0 && getDataLocalStorage.indexOf(pokemonName) < 0) {
        getDataLocalStorage.push(pokemonName);
      }
      
      if (getDataLocalStorage.indexOf(dataCharacter.name) >= 0) {
        setDataCharacter({
          ...dataCharacter,
          like: true,
        })
      }
      doFavPokemon(dataCharacter.name);
    } else {
      const indexRemove = getDataLocalStorage.indexOf(pokemonName);

      if (getDataLocalStorage.indexOf(dataCharacter.name) >= 0) {
        setDataCharacter({
          ...dataCharacter,
          like: false,
        })
      }

      if (indexRemove > -1) {
        getDataLocalStorage.splice(indexRemove, 1);
      }
      doUnFavPokemon(dataCharacter.name);
    }

    localStorage.setItem(LIST_FAV_POKEMON, JSON.stringify(getDataLocalStorage));
  }

  return (
    <CharactersCardCol
      key={`characters-card-${dataCharacter.name}-${new Date().getTime()}`}
      span={span}
      xxl={6}
      xl={span}
      lg={8}
      md={24}
      sm={24}
      xs={24}
      onClick={(e) => showModal(e, dataCharacter)}
    >
      <IconHeart
        type="heart"
        theme="twoTone"
        onClick={e => handleOnClickLike(e, dataCharacter)}
        twoToneColor={dataCharacter.like ? '#eb2f96' : '#00d451'}
      />
      <Card
        loading={loading}
        hoverable
        cover={
          <img
            key={`${dataCharacter.name}`}
            alt={dataCharacter.name}
            src={`${POKEMON_IMAGE_URL}/${getIdPokemon(dataCharacter.url)}.png`}
          />
        }
      >
        <Meta title={(
           <TextLinkDetailPage>{dataCharacter.name}</TextLinkDetailPage>
        )} onClick={handleOnClickName} />
      </Card>
    </CharactersCardCol>
  )
};

CharactersCard.defaultProps = {
  span: 6,
};

CharactersCard.propTypes = {
  data: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
  showModal: PropTypes.func,
  span: PropTypes.number,
  doFavPokemon: PropTypes.func.isRequired,
  doUnFavPokemon: PropTypes.func.isRequired,
};

export default memo(withRouter(CharactersCard));
