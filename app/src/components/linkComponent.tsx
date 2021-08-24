/* eslint-disable react/destructuring-assignment */
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useMutation, gql } from '@apollo/client';
import { Card, Button } from '@material-ui/core';

const TOGGLE_FAVORITE = gql`
  mutation ToggleFavoriteLink($linkId: String!) {
    toggleFavoriteLink(linkId: $linkId) {
      currentPoint
      isFavorite
    }
  }
`;

type Props = {
  title: string,
  linkId: string,
  url: string,
  userStatus: boolean,
  currentPoint: number,
  userId: string,
};

const LinkComponent = (prop :Props) => {
  const router = useRouter();
  const [isFavorite, setFavorite] = useState<boolean>(prop.userStatus);
  const [currentPoint, setCurrentPoint] = useState<number>(prop.currentPoint);
  const [mutateFavorite, { data, loading, error }] = useMutation(TOGGLE_FAVORITE);

  useEffect(() => {
    if (!loading) {
      if (error) {
        console.log(error);
      } else if (data) {
        console.log(data);
        setFavorite(data.toggleFavoriteLink.isFavorite);
        setCurrentPoint(data.toggleFavoriteLink.currentPoint);
      }
    }
  }, [loading]);

  const favoriteAction = () => {
    mutateFavorite({ variables: { linkId: prop.linkId } });
  };

  const moveToLinkPage = (linkId: string) => {
    router.push(`/link/${linkId}`);
  };

  const jumpToLinkPage = (url: string) => {
    window.open(url);
  };

  return (
    <Card
      style={{
        width: '70%',
        minWidth: '400px',
        maxWidth: '600px',
        float: 'left',
        margin: '4px',
        padding: '4px',
      }}
    >
      <div
        style={{
          padding: '4px',
          margin: '4px',
          marginBottom: '6px',
          borderBottom: '1px solid #000',
          cursor: 'pointer',
        }}
        role="button"
        onKeyDown={() => moveToLinkPage(prop.linkId)}
        onClick={() => moveToLinkPage(prop.linkId)}
        tabIndex={0}
      >
        {prop.title}
      </div>
      <div
        style={{
          padding: '4px',
          margin: '4px',
          marginBottom: '6px',
          borderBottom: '1px solid #000',
          color: '#00f',
          cursor: 'pointer',
        }}
        role="button"
        onKeyDown={() => jumpToLinkPage(prop.url)}
        onClick={() => jumpToLinkPage(prop.url)}
        tabIndex={0}
      >
        {prop.url}
      </div>
      <div
        style={{
          float: 'left',
        }}
      >
        <Button
          variant="contained"
          color="primary"
          style={{
            border: isFavorite ? '2px solid #9DCCE0' : 'none',
          }}
          onClick={() => favoriteAction()}
        >
          {currentPoint}
          {' '}
          いいね
          {isFavorite ? ' !' : ''}
        </Button>
      </div>
      <div
        style={{
          paddingTop: '4px',
          margin: '4px',
          float: 'right',
        }}
      >
        Posted By
        {' '}
        {prop.userId}
      </div>
    </Card>
  );
};

export default LinkComponent;
