import React, { FC, useEffect, useState } from 'react';
import { useQuery, gql } from '@apollo/client';
import Head from 'next/head';

import LinkComponent from '../src/components/linkComponent';
import styles from '../styles/Home.module.css';

const GET_ALL_USERS = gql`
  query AllUserLinks ($userId: String!){
    allUserLinks(userId: $userId) {
      id
      title
      favoritePoint
    }
    allFavoriteLinks(userId: $userId) {
      id
      title
      favoritePoint
    }
  }
`;

type LinkInfoType = {
  id: string,
  title: string,
  url: string,
  favoritePoint: number,
};

const LinkList: FC = () => {
  const [links, setLinks] = useState<LinkInfoType[]>([]);
  const [sholdShowPost, setSholdShowPost] = useState<boolean>(true);

  const { loading, error, data } = useQuery(GET_ALL_USERS, {
    variables: { userId: 'testUser001' }, // Test
    fetchPolicy: 'network-only',
  });

  useEffect(() => {
    if (!loading) {
      if (error) {
        alert('データの取得に失敗しました');
      } else if (data) {
        console.log(data);
        const { allUserLinks } = data;
        setLinks(allUserLinks);
      }
    }
  }, [loading]);

  return (
    <>
      <div className={styles.container}>
        <Head>
          <title>NicoNico Link Sample</title>
        </Head>

        <main className={styles.main}>
          <div
            className={styles.grid}
            style={{
              display: sholdShowPost ? 'flex' : 'none',
            }}
          >
            {links.map((item) => (
              <LinkComponent
                key={item.id}
                linkId="611a0380b658b6e82155c3fc"
                title={item.title}
              />
            ))}
          </div>
          <div
            className={styles.grid}
            style={{
              display: !sholdShowPost ? 'flex' : 'none',
            }}
          >
            {links.map((item) => (
              <LinkComponent
                key={item.id}
                url={`/myList/${item.url}`}
                title={item.title}
              />
            ))}
          </div>
        </main>
      </div>
    </>
  );
};

export default LinkList;
