import React, { useEffect, useState, FC } from 'react';
import { useMutation, gql } from '@apollo/client';
import { TextField, Button } from '@material-ui/core';
import styles from '../styles/common.module.css';

const POST_LINK = gql`
  mutation PostLink($linkTitle: String!, $url: String!) {
    postLink(title: $linkTitle, url: $url) {
      id
    }
  }
`;

const Register: FC = () => {
  const [mutateLink, { data, loading, error }] = useMutation(POST_LINK);
  const [url, setURL] = useState<string>('');
  const [linkTitle, setLinkTitle] = useState<string>('');
  const [isClickable, setIsClickable] = useState<boolean>(true);
  const [buttonText, setButtonText] = useState<string>('登録する');

  const clearInputData = () => {
    setLinkTitle('');
    setURL('');
    setButtonText('登録する');
    setIsClickable(true);
  };

  const registerAction = async (e: any) => {
    e.preventDefault();
    setButtonText('登録中...');
    mutateLink({ variables: { linkTitle, url } });
  };

  useEffect(() => {
    if (!loading) {
      if (error) {
        alert('登録に失敗しました');
        setButtonText('登録できません');
      } else if (data) {
        alert('登録されました');
        clearInputData();
      }
    }
  }, [loading]);

  return (
    <>
      <div className={styles.container}>
        <TextField
          id="URL-field"
          label="Input URL"
          type="text"
          variant="outlined"
          className={styles.inputField}
          value={url}
          onChange={(e: any) => setURL(e.target.value)}
        />
        <TextField
          id="linkTitle-field"
          label="Input LinkTitle"
          type="text"
          variant="outlined"
          className={styles.inputField}
          value={linkTitle}
          onChange={(e: any) => setLinkTitle(e.target.value)}
        />
        <div className={styles.inputButtonField}>
          <Button
            variant="contained"
            color="primary"
            className={styles.inputButton}
            onClick={(e: any) => registerAction(e)}
            disabled={!isClickable}
          >
            {buttonText}
          </Button>
        </div>
      </div>
    </>
  );
};

export default Register;
