import React, { useState, useEffect, FC } from 'react';
import { useQuery, gql } from '@apollo/client';
import Head from 'next/head';
import { Card } from '@material-ui/core';
import LinkComponent from '../../src/components/linkComponent';
import styles from '../../styles/common.module.css';

const GET_LINK_INFO = gql`
  query LinkInfo($linkId: String!) {
    linkInfo(linkId: $linkId) {
      link{
        id
        title
        url
        favoritePoint
        userStatus
        postedBy {
          userId
        }
      }
      favUsers{
        userId
      }
    }
  }
`;

type Props = {
  linkId: string,
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

const UserInfo: FC<Props> = ({ linkId }: Props) => {
  const [link, setLink] = useState<LinkInfoType>();
  const [favoriteUsers, setFavUsers] = useState<LinkInfoType[]>([]);
  const { loading, error, data } = useQuery(GET_LINK_INFO, {
    variables: { linkId },
    fetchPolicy: 'network-only',
  });

  useEffect(() => {
    if (!loading) {
      if (error) {
        alert('データの取得に失敗しました');
      } else if (data) {
        const { linkInfo } = data;
        setLink(linkInfo.link);
        setFavUsers(linkInfo.favUsers);
      }
    }
  }, [loading]);

  return (
    <>
      <Head>
        <title>
          Link:
          {' '}
          {link && link.title}
        </title>
      </Head>
      <div className={styles.container}>
        <main className={styles.main}>
          {link && (
          <LinkComponent
            key={link.id}
            linkId={link.id}
            title={link.title}
            url={link.url}
            userStatus={link.userStatus}
            currentPoint={link.favoritePoint}
            userId={link.postedBy.userId}
          />
          )}
          <h2>
            {favoriteUsers.length > 0 ? 'いいね!したユーザー一覧' : 'いいね!したユーザーはいません'}
          </h2>
          <div
            className={styles.grid}
          >

            {favoriteUsers && favoriteUsers.map((item: any) => (
              <Card
                style={{
                  width: '50%',
                  minWidth: '150px',
                  maxWidth: '300px',
                  float: 'left',
                  margin: '4px',
                  padding: '15px',
                  textAlign: 'center',
                }}
                key={item.userId}
              >
                {item.userId}
              </Card>

            ))}
          </div>
        </main>
      </div>
    </>
  );
};

export async function getServerSideProps(context: any) {
  const { linkId } = context.query;

  return { props: { linkId } };
}

export default UserInfo;
