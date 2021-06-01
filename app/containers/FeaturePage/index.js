/*
 * FeaturePage
 *
 * List all the features
 */
import React from 'react';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';

import H1 from 'components/H1';
import messages from './messages';
import List from './List';
import ListItem from './ListItem';
import ListItemTitle from './ListItemTitle';

export default function FeaturePage() {
  return (
    <div>
      <Helmet>
        <title>Feature Page</title>
        <meta
          name="description"
          content="Feature page of Pokemon's World application"
        />
      </Helmet>
      <H1>
        <FormattedMessage {...messages.header} />
      </H1>
      <List>
        <ListItem>
          <ListItemTitle>
            <FormattedMessage {...messages.homeMenuHeader} />
          </ListItemTitle>
          <p>
            <FormattedMessage {...messages.homeMenuMessage} />
          </p>
        </ListItem>

        <ListItem>
          <ListItemTitle>
            <FormattedMessage {...messages.featuresHeader} />
          </ListItemTitle>
          <p>
            <FormattedMessage {...messages.featuresMessage} />
          </p>
        </ListItem>

        <ListItem>
          <ListItemTitle>
            <FormattedMessage {...messages.pokemonDetailPageHeader} />
          </ListItemTitle>
          <p>
            <FormattedMessage {...messages.pokemonDetailPageMessage} />
          </p>
        </ListItem>

        <ListItem>
          <ListItemTitle>
            <FormattedMessage {...messages.myPokemonListHeader} />
          </ListItemTitle>
          <p>
            <FormattedMessage {...messages.myPokemonListMessage} />
          </p>
        </ListItem>
      </List>
    </div>
  );
}
