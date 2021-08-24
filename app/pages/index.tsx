import React, { FC, useEffect, useState } from 'react';
import { useQuery, gql } from '@apollo/client';
import Head from 'next/head';
import { Button } from '@material-ui/core';
import LinkComponent from '../src/components/linkComponent';
import styles from '../styles/common.module.css';

const GET_ALL_USERS = gql`
  query AllUserLinks ($userId: String!){
    allUserLinks(userId: $userId) {
      id
      title
      url
      favoritePoint
      userStatus
      postedBy {
        userId
      }
    }

    allFavoriteLinks(userId: $userId) {
      id
      title
      url
      favoritePoint
      userStatus
      postedBy {
        userId
      }
    }
  }
`;

type LinkInfoType = {
  id: string,
  title: string,
  url: string,
  favoritePoint: number,
  userStatus: boolean,
  postedBy: {
    userId: string,
  },
};

const LinkList: FC = () => {
  const [links, setLinks] = useState<LinkInfoType[]>([]);
  const [favLinks, setFavLinks] = useState<LinkInfoType[]>([]);
  const [shouldShowUserPost, setShouldShowUserPost] = useState<boolean>(true);

  const { loading, error, data } = useQuery(GET_ALL_USERS, {
    variables: { userId: 'testUser001' }, // test
    fetchPolicy: 'network-only',
  });

  useEffect(() => {
    if (!loading) {
      if (error) {
        alert('データの取得に失敗しました');
      } else if (data) {
        console.log(data);
        const { allUserLinks, allFavoriteLinks } = data;
        setLinks(allUserLinks);
        setFavLinks(allFavoriteLinks);
      }
    }
  }, [loading]);

  return (
    <>
      <Head>
        <title>Top</title>
      </Head>
      <div className={styles.container}>
        <main className={styles.main}>
          <div>
            <Button
              variant="contained"
              color="primary"
              style={{
                color: shouldShowUserPost ? '#69f' : '#fff',
              }}
              onClick={() => setShouldShowUserPost(true)}
            >
              あなたが投稿したリンク
            </Button>
            <Button
              variant="contained"
              color="primary"
              style={{
                color: !shouldShowUserPost ? '#69f' : '#fff',
                margin: '4px',
              }}
              onClick={() => setShouldShowUserPost(false)}
            >
              あなたがいいね！したリンク
            </Button>
          </div>
          <div
            className={styles.grid}
            style={{
              display: shouldShowUserPost ? 'flex' : 'none',
            }}
          >
            {links.map((item) => (
              <LinkComponent
                key={item.id}
                linkId={item.id}
                title={item.title}
                url={item.url}
                userStatus={item.userStatus}
                currentPoint={item.favoritePoint}
                userId={item.postedBy.userId}
              />
            ))}
          </div>
          <div
            className={styles.grid}
            style={{
              display: !shouldShowUserPost ? 'flex' : 'none',
            }}
          >
            {favLinks.map((item) => (
              <LinkComponent
                key={item.id}
                linkId={item.id}
                title={item.title}
                url={item.url}
                userStatus={item.userStatus}
                currentPoint={item.favoritePoint}
                userId={item.postedBy.userId}
              />
            ))}
          </div>
        </main>
      </div>
    </>
  );
};

export default LinkList;
