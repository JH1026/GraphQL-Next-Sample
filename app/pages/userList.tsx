import React, { FC, useEffect, useState } from 'react';
import { useQuery, gql } from '@apollo/client';

import Head from 'next/head';
import UserComponent from '../src/components/userComponent';
import styles from '../styles/Home.module.css';

const GET_ALL_USERS = gql`
  query{
    allUsers {
      userId
      postCount
    }
  }
`;

type UserType = {
  userId: string,
  postCount: number,
};

const LinkList: FC = () => {
  const [users, setUsers] = useState<UserType[]>([]);

  const { loading, error, data } = useQuery(GET_ALL_USERS, {
    fetchPolicy: 'network-only',
  });

  useEffect(() => {
    if (!loading) {
      if (error) {
        alert('データの取得に失敗しました');
      } else if (data) {
        const { allUsers } = data;
        setUsers(allUsers);
      }
    }
  }, [loading]);

  return (
    <>
      <Head>
        <title>UserList</title>
      </Head>
      <div className={styles.container}>
        <main className={styles.main}>
          <h2>ユーザー一覧</h2>
          <div
            className={styles.grid}
          >
            {users.map((item) => (
              <UserComponent
                key={item.userId}
                userId={item.userId}
                postCount={item.postCount}
              />
            ))}
          </div>
        </main>
      </div>
    </>
  );
};

export default LinkList;
