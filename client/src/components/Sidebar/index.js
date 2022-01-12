import React from 'react';
import { makeStyles } from '@mui/styles';
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import { Link } from 'react-router-dom';
import { ViewColumn, House } from '@mui/icons-material';

const useStyles = makeStyles((theme) => ({
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: 200,
  },
}));

const Sidebar = () => {
  const classes = useStyles();
  return (
    <Drawer
      variant='permanent'
      classes={{
        paper: classes.drawerPaper,
      }}
      open={true}
    >
      <List>
        <Link exact to='/'>
          <ListItem button>
            <ListItemIcon>
              <ViewColumn />
            </ListItemIcon>
            <ListItemText primary='Inventory' />
          </ListItem>
        </Link>
        <Link to='/warehouses'>
          <ListItem button>
            <ListItemIcon>
              <House />
            </ListItemIcon>
            <ListItemText primary='Warehouse' />
          </ListItem>
        </Link>
      </List>
    </Drawer>
  );
};

export default Sidebar;
