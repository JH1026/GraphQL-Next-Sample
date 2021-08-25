/* eslint-disable react/destructuring-assignment */
import React from 'react';
import { useRouter } from 'next/router';
import { Card } from '@material-ui/core';

type Props = {
  userId: string,
  postCount: number,
};

const LinkComponent = (prop :Props) => {
  const router = useRouter();
  const moveToUserPage = (userId: string) => {
    router.push(`/user/${userId}`);
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
        cursor: 'pointer',
      }}
      onKeyDown={() => moveToUserPage(prop.userId)}
      onClick={() => moveToUserPage(prop.userId)}
      tabIndex={0}
    >
      <div
        style={{
          padding: '4px',
          margin: '4px',
          marginBottom: '6px',
          borderBottom: '1px solid #000',
        }}
      >
        {prop.userId}
      </div>
      <div
        style={{
          paddingTop: '4px',
          margin: '4px',
        }}
      >
        投稿したリンク数
        {' '}
        {prop.postCount}
      </div>
    </Card>
  );
};

export default LinkComponent;
