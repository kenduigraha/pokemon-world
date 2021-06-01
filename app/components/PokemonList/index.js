/**
 *
 * PokemonList
 *
 */

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Row, Modal, Skeleton } from 'antd';
import CharactersCard from 'components/CharactersCard';
import PokemonDetailDisplay from 'components/PokemonDetailDisplay';

import { PokemonListDiv, LinkDetailPage } from './styles';

class PokemonList extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      limit: 20,
      offset: 0,
      cardLoading: false,
      visible: false,
      dataPokemonModal: {
        name: '',
        url: '',
      },
    };
  }

  /**
   * hit API pokemon list
   */
  fetchDataPokemonList = params => {
    this.props.getPokemonList(params);
  };

  componentWillReceiveProps(nextProps) {
    document.addEventListener('scroll', this.trackScrolling);

    if (nextProps.pokemonList.infinity === false) {
      this.setState({ cardLoading: false });
    }
  }

  /**
   * remove event listener scroll
   */
  componentWillUnmount() {
    document.removeEventListener('scroll', this.trackScrolling);
  }

  /**
   * check reached bottom or not
   * @param {element} el
   */
  isBottom(el) {
    if (el) return el.getBoundingClientRect().bottom <= window.innerHeight;
    return false;
  }

  /**
   * track scroll & hit API after reached
   */
  trackScrolling = () => {
    const wrappedElement = document.getElementById('content');

    if (
      this.props.pokemonList.isLoading === false &&
      this.isBottom(wrappedElement)
    ) {
      this.props.updateFlagInfinity(true);

      document.removeEventListener('scroll', this.trackScrolling);

      if (this.props.pokemonList.infinity === true) {
        this.setState(
          prevState => ({
            offset: prevState.offset + 20,
          }),
          () => {
            this.fetchDataPokemonList({
              limit: this.state.limit,
              offset: this.state.offset,
            });
          },
        );
      }
    }
  };

  showModal = (e, pokemonData) => {
    e.preventDefault();
    this.props.getPokemonDetail(pokemonData.name);
    this.setState({
      visible: true,
      dataPokemonModal: pokemonData,
    });
  };

  handleOk = () => {
    this.setState({
      visible: false,
    });
  };

  render() {
    const {
      pokemonList,
      pokemonDetail,
      doFavPokemon,
      doUnFavPokemon,
    } = this.props;

    return (
      <PokemonListDiv id="content">
        {pokemonDetail.data.length === 0 && 'Pokémon is Empty'}
        {Object.keys(pokemonList.error).length > 0 && 'Pokémon Not Found'}
        
        {pokemonList.infinity === false && pokemonList.isLoading === true ? (
          <Skeleton active />
        ) : (
          <div>
            <Row gutter={24}>
              {pokemonList.data.map(char => (
                <CharactersCard
                  key={`${char.name}-${new Date().getTime()}`}
                  loading={this.state.cardLoading}
                  data={char}
                  showModal={this.showModal}
                  doFavPokemon={doFavPokemon}
                  doUnFavPokemon={doUnFavPokemon}
                />
              ))}
            </Row>
            {pokemonList.infinity === true && <Skeleton active />}
          </div>
        )}
        <Modal
          visible={this.state.visible}
          title={pokemonDetail.data.species && pokemonDetail.data.species.name}
          onOk={this.handleOk}
          onCancel={this.handleOk}
          footer={[
            <LinkDetailPage
              key={`link-${pokemonDetail.data.species.name}-${new Date().getTime()}`}
              to={`/pokemon/${pokemonDetail.data.species.name}`}
            >
              Go to {pokemonDetail.data.species.name} Detail Page
            </LinkDetailPage>,
          ]}
        >
          <PokemonDetailDisplay
            dataPokemonModal={this.state.dataPokemonModal}
            pokemonDetail={pokemonDetail}
            doFavPokemon={doFavPokemon}
            doUnFavPokemon={doUnFavPokemon}
          />
        </Modal>
      </PokemonListDiv>
    );
  }
}

PokemonList.propTypes = {
  pokemonList: PropTypes.object.isRequired,
  getPokemonList: PropTypes.func.isRequired,
  getPokemonDetail: PropTypes.func.isRequired,
  updateFlagInfinity: PropTypes.func.isRequired,
  pokemonDetail: PropTypes.object.isRequired,
  doFavPokemon: PropTypes.func.isRequired,
  doUnFavPokemon: PropTypes.func.isRequired,
};

export default PokemonList;
