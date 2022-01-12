import React, { useEffect, useState } from 'react';
import { Grid, Pagination, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import InventoryList from '../InventoryList';
import {
  apiGetInventorysCount,
  apiGetInventorys,
} from '../../apiService/helper/inventorys';
import { PAGINATION } from '../../apiService/constants';
import { apiGetWarehouses } from '../../apiService/helper/warehouses';

const InventoryPage = () => {
  const [warehouses, setwarehouses] = useState();
  const [pageCnt, setpageCnt] = useState();
  const [page, setpage] = useState(1);
  const [inventorys, setinventorys] = useState();
  const navigate = useNavigate();

  const handleDeleteInventory = (delId) => {
    let newInventorys = [...inventorys];
    newInventorys = newInventorys.filter((item) => item.id !== delId);
    setinventorys(newInventorys);
  };

  useEffect(() => {
    apiGetInventorysCount().then((cnt) => {
      let totalPages = Math.floor(cnt / PAGINATION.PER_PAGE);
      if (cnt % PAGINATION.PER_PAGE > 0) ++totalPages;
      setpageCnt(totalPages);
    });
  }, []);

  useEffect(() => {
    apiGetWarehouses().then((data) => {
      setwarehouses(data);
    });
  }, []);

  useEffect(() => {
    const range = [
      (page - 1) * PAGINATION.PER_PAGE,
      page * PAGINATION.PER_PAGE,
    ];
    apiGetInventorys({ range }).then((data) => {
      setinventorys(data);
    });
  }, [page]);

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        {warehouses && inventorys && (
          <InventoryList
            inventorys={inventorys}
            warehouses={warehouses}
            onDeleteInventory={handleDeleteInventory}
          />
        )}
      </Grid>
      <Grid item xs={9} sx={{ display: 'flex', justifyContent: 'center' }}>
        {pageCnt && (
          <Pagination
            color='primary'
            count={pageCnt}
            onChange={(e, page) => setpage(page)}
          />
        )}
      </Grid>
      <Grid item xs={3} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Button variant='contained' onClick={() => navigate('/inventory-create')}>
          Add a inventory
        </Button>
      </Grid>
    </Grid>
  );
};

export default InventoryPage;
