/* eslint-disable react/destructuring-assignment */
import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useMutation, gql } from '@apollo/client';
import { Card } from '@material-ui/core';

const TOGGLE_FAVORITE = gql`
  mutation ToggleFavoriteLink($linkId: String!) {
    toggleFavoriteLink(linkId: $linkId) {
      currentPoint
    }
  }
`;

type Props = {
  title: string,
  linkId: string,
};

const LinkComponent = (prop :Props) => {
  const router = useRouter();
  const [mutateFavorite, { data, loading, error }] = useMutation(TOGGLE_FAVORITE);

  useEffect(() => {
    if (!loading) {
      if (error) {
        console.log(error);
      } else if (data) {
        console.log(data);
      }
    }
  }, [loading]);

  const clickAction = () => {
    mutateFavorite({ variables: { linkId: prop.linkId } });
  };

  return (
    <Card
      style={{
        width: '70%',
        float: 'left',
        margin: '4px',
        padding: '4px',
      }}
      onClick={() => clickAction()}
    >
      <h2>{prop.title}</h2>

    </Card>
  );
};

export default LinkComponent;
