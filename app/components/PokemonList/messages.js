/*
 * PokemonList Messages
 *
 * This contains all the text for the PokemonList component.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.components.PokemonList';

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: 'This is the PokemonList component!',
  },
});
