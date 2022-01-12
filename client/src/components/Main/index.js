import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Container } from '@mui/material';
import { makeStyles } from '@mui/styles';

import InventoryPage from './InventoryPage';
import InventoryCreate from './InventoryCreate';
import InventoryEdit from './InventoryEdit';
import WarehousePage from './WarehousePage';
import WarehouseCreate from './WarehouseCreate';
import WarehouseEdit from './WarehouseEdit';

const useStyles = makeStyles((theme) => ({
  content: {
    flexGrow: 1,
    height: '100vh',
    paddingLeft: 200,
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
}));

const Main = () => {
  const classes = useStyles();

  return (
    <main className={classes.content}>
      <Container maxWidth='lg' className={classes.container}>
        <Routes>
          <Route exact path='/' element={<InventoryPage />}></Route>
          <Route path='/inventory-edit/:id' element={<InventoryEdit />}></Route>
          <Route path='/inventory-create' element={<InventoryCreate />}></Route>
          <Route path='/warehouses' element={<WarehousePage />}></Route>
          <Route path='/warehouse-create' element={<WarehouseCreate />}></Route>
          <Route path='/warehouse-edit/:id' element={<WarehouseEdit />}></Route>
        </Routes>
      </Container>
    </main>
  );
};

export default Main;
