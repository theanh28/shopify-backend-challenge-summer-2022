import React, { useEffect, useState } from 'react';
import { Grid, Pagination, Button } from '@mui/material';
import {useNavigate} from 'react-router-dom';

import WarehouseList from '../WarehouseList';
import {
  apiGetWarehousesCount,
  apiGetWarehouses,
} from '../../apiService/helper/warehouses';
import { PAGINATION } from '../../apiService/constants';

const WarehousePage = () => {
  const [pageCnt, setpageCnt] = useState();
  const [page, setpage] = useState(1);
  const [warehouses, setwarehouses] = useState([]);
  const [loading, setloading] = useState(0);
  const navigate = useNavigate();

  const handleDeleteWarehouse = (delId) => {
    let newWarehouses = [...warehouses];
    newWarehouses = newWarehouses.filter((item) => item.id !== delId);
    setwarehouses(newWarehouses);
  };

  useEffect(() => {
    apiGetWarehousesCount().then((cnt) => {
      let totalPages = Math.floor(cnt / PAGINATION.PER_PAGE);
      if (cnt % PAGINATION.PER_PAGE > 0) ++totalPages;
      setpageCnt(totalPages);
      setloading((loading) => {
        if (loading < 1) return loading + 1;
        return loading;
      });
    });
  }, []);

  useEffect(() => {
    const range = [(page - 1) * PAGINATION.PER_PAGE, page * PAGINATION.PER_PAGE];
    apiGetWarehouses({ range }).then((data) => {
      setwarehouses(data);
      setloading((loading) => {
        if (loading < 2) return loading + 1;
        return loading;
      });
    });
  }, [page]);

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <WarehouseList
          warehouses={warehouses}
          onDeleteWarehouse={handleDeleteWarehouse}
        />
      </Grid>
      <Grid item xs={9} sx={{ display: 'flex', justifyContent: 'center' }}>
        {loading >= 1 ? (
          <Pagination
            color='primary'
            count={pageCnt}
            onChange={(e, page) => setpage(page)}
          />
        ) : null}
      </Grid>
      <Grid item xs={3} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Button variant='contained' onClick={() => navigate('/warehouse-create')}>Add a warehouse</Button>
      </Grid>
    </Grid>
  );
};

export default WarehousePage;
