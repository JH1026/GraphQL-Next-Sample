import React, { FC, useEffect, useState } from 'react';
import { useLazyQuery, gql } from '@apollo/client';
import Head from 'next/head';
import { TextField } from '@material-ui/core';
import LinkComponent from '../src/components/linkComponent';
import styles from '../styles/common.module.css';

const SEARCH_LINK = gql`
  query SearchLink ($word: String!, $count: Int!){
    searchLink(word: $word, count: $count) {
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

let timeID = null;
let count = 0;

const LinkList: FC = () => {
  const [links, setLinks] = useState<LinkInfoType[]>([]);
  const [search, { loading, data }] = useLazyQuery(SEARCH_LINK);

  useEffect(() => {
    if (!loading) {
      if (data) {
        const { searchLink } = data;
        setLinks(searchLink);
      }
    }
  }, [loading]);

  const searchAction = (word: string) => {
    console.log(word);
    clearTimeout(timeID);
    count += 1;
    timeID = setTimeout(() => search({
      variables: { word, count },
    }), 750);
  };

  return (
    <>
      <Head>
        <title>Search</title>
      </Head>
      <div className={styles.container}>
        <main
          className={styles.main}
          style={{ width: '100%', minWidth: '450px', maxWidth: '1000px' }}
        >
          <TextField
            id="linkTitle-field"
            label="Input LinkTitle"
            type="text"
            variant="outlined"
            className={styles.inputSearchField}
            onChange={(e: any) => searchAction(e.target.value)}
          />
          <div
            className={styles.grid}
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

        </main>
      </div>
    </>
  );
};

export default LinkList;
