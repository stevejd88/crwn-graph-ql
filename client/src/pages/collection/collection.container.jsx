import React from 'react';
import { gql, useQuery } from '@apollo/client';
import { Query } from '@apollo/client/react/components';

import CollectionPage from './collection.component';
import Spinner from '../../components/spinner/spinner.component';

const GET_COLLECTION_BY_TITLE = gql`
  query getCollectionsByTitle($title: String!) {
    getCollectionsByTitle(title: $title) {
      id
      title
      items {
        id
        name
        price
        imageUrl
      }
    }
  }
`;

const CollectionPageContainer = ({ match }) => (
  <Query
    query={GET_COLLECTION_BY_TITLE}
    variables={{ title: match.params.collectionId }}
  >
    {({ loading, error, data }) => {
      if (loading) return <Spinner />;
      if (error) return `Error ${error.message}`;
      const { getCollectionsByTitle } = data;
      return <CollectionPage collection={getCollectionsByTitle} />;
    }}
  </Query>
);

export default CollectionPageContainer;

// const { loading, error, data } = useQuery(GET_COLLECTION_BY_TITLE, {
//   variables: { title: match.params.collectionId }
// });

// if (loading) return <Spinner />;
// if (error) return `Error ${error.message}`;

// const { getCollectionsByTitle } = data;
// console.log(match);
// return <CollectionPage collection={data.getCollectionsByTitle} />;
