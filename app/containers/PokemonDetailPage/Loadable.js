/**
 *
 * Asynchronously loads the component for PokemonDetailPage
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
