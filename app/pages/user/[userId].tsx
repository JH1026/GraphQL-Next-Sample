/* eslint-disable react/destructuring-assignment */
import React, { useState, useEffect, FC } from 'react';
import { useQuery, gql } from '@apollo/client';
import Head from 'next/head';
import { Button } from '@material-ui/core';
import LinkComponent from '../../src/components/linkComponent';
import styles from '../../styles/common.module.css';

const GET_USER_INFO = gql`
  query UserLinkInfo($userId: String!) {
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

type Props = {
  userId: string,
};

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

const UserInfo: FC<Props> = ({ userId }: Props) => {
  const [links, setLinks] = useState<LinkInfoType[]>([]);
  const [favLinks, setFavLinks] = useState<LinkInfoType[]>([]);
  const [shouldShowUserPost, setShouldShowUserPost] = useState<boolean>(true);
  const { loading, error, data } = useQuery(GET_USER_INFO, {
    variables: { userId },
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
      <div className={styles.container}>
        <Head>
          <title>マイリスト</title>
        </Head>

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
              {userId}
              が投稿したリンク
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
              {userId}
              がいいね！したリンク
            </Button>
          </div>

          <div
            className={styles.grid}
            style={{
              display: shouldShowUserPost ? 'flex' : 'none',
            }}
          >
            {links.length === 0
              ? (
                <h2>
                  投稿されたリンクはありません
                </h2>
              )
              : links.map((item) => (
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
            {favLinks.length === 0
              ? (
                <h2>
                  いいね!されたリンクはありません
                </h2>
              )
              : favLinks.map((item) => (
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

export async function getServerSideProps(context: any) {
  const { userId } = context.query;

  return { props: { userId } };
}

export default UserInfo;
