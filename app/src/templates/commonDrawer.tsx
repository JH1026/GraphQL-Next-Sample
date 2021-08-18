import React from 'react';
import { useRouter } from 'next/router';
import { useTheme } from '@material-ui/core/styles';
import clsx from 'clsx';

import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

import drawerStyles from './drawerStyles';

export default function commonDrawer() {
  const router = useRouter();
  const classes = drawerStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const title = 'Share Links';
  const menu = [
    ['Top', '/'],
    ['Register', '/register'],
    ['Search', '/search'],
    ['Users', '/users'],
  ];

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const toLink = (link :string) => {
    setOpen(false);
    router.push(link);
  };

  return (
    <>
      <div className={classes.root}>
        <AppBar
          position="fixed"
          className={clsx(classes.appBar, {
            [classes.appBarShift]: open,
          })}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              className={clsx(classes.menuButton, open && classes.hide)}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap className={classes.title}>
              {title}
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer
          className={classes.drawer}
          variant="persistent"
          anchor="left"
          open={open}
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          <div className={classes.drawerHeader}>

            <IconButton onClick={handleDrawerClose}>
              {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
            </IconButton>
          </div>
          <Divider />
          <List>
            {menu.map((linkInfo :string[]) => (
              <ListItem button key={linkInfo[1]} onClick={() => toLink(linkInfo[1])}>
                <ListItemText primary={linkInfo[0]} />
              </ListItem>
            ))}
          </List>
        </Drawer>
      </div>
      {open
        ? (
          // eslint-disable-next-line jsx-a11y/control-has-associated-label
          <div
            style={{
              position: 'absolute',
              left: 0,
              top: 0,
              width: '100%',
              height: '100%',
              background: '#333',
              opacity: 0.7,
              zIndex: 100,
            }}
            role="button"
            tabIndex={0}
            onClick={() => handleDrawerClose()}
            onKeyDown={() => handleDrawerClose()}
          />
        ) : null}
    </>
  );
}
