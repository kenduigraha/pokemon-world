/**
 *
 * Asynchronously loads the component for PokemonHomePage
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
