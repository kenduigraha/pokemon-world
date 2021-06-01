/**
 *
 * Asynchronously loads the component for PokemonList
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
