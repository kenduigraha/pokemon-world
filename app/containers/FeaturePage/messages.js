/*
 * FeaturePage Messages
 *
 * This contains all the text for the FeaturePage component.
 */
import { defineMessages } from 'react-intl';

export const scope = 'boilerplate.containers.FeaturePage';

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: 'Features',
  },
  homeMenuHeader: {
    id: `${scope}.homeMenu.header`,
    defaultMessage: "Pokemon's Home Menu Feature",
  },
  homeMenuMessage: {
    id: `${scope}.homeMenu.message`,
    defaultMessage: `List of all Pokemon's data in Pokemon's World`,
  },
  featuresHeader: {
    id: `${scope}.feature.header`,
    defaultMessage: "Pokemon's Web Features",
  },
  featuresMessage: {
    id: `${scope}.feature.message`,
    defaultMessage: `
      Enjoy the Pokemon's Word website catalog and see your favourite's Pokemon in this site.
    `,
  },
  pokemonDetailPageHeader: {
    id: `${scope}.pokemonDetail.header`,
    defaultMessage: "Pokemon's Detail Page",
  },
  pokemonDetailPageMessage: {
    id: `${scope}.pokemonDetail.message`,
    defaultMessage: `
      This page is for your detail Pokemon's information
    `,
  },
  myPokemonListHeader: {
    id: `${scope}.myPokemonList.header`,
    defaultMessage: 'My Pokemon Favourite List',
  },
  myPokemonListMessage: {
    id: `${scope}.myPokemonList.message`,
    defaultMessage: `
      This page is belong to your favourite Pokemon List
    `,
  },
});
