import React, { useState, useEffect } from 'react';

import {
  Accordion,
  AccordionActions,
  AccordionDetails,
  AccordionSummary,
  Button,
  Divider,
  List,
  ListItem,
  Typography,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { makeStyles } from '@mui/styles';
import { apiDeleteInventoryById } from '../../apiService/helper/inventorys';
import { useNavigate } from 'react-router-dom';
import { intersectionBy } from 'lodash';

const useStyles = makeStyles(() => ({
  accordion: {
    marginBottom: 5,
  },
  root: {
    width: '100%',
    height: '80vh',
    overflowY: 'auto',
    padding: 5,
  },
}));

const Inventory = ({ data, onDeleteInventory }) => {
  const classes = useStyles();
  const navigate = useNavigate();

  return (
    <Accordion key={data.id} className={classes.accordion}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        className={classes.summary}
      >
        <Typography
          sx={{ width: '33%', flexShrink: 0 }}
        >
          {data.name}
        </Typography>
        <Typography
          sx={{ color: 'text.secondary' }}
        >
          {data.desc}
        </Typography>
      </AccordionSummary>
      <Divider />
      <AccordionDetails>
        Warehouses{' '}
        {data.warehouses.length === 0 ? ': No warehouse assigned' : null}
        <>
          {data.warehouses.map((warehouse) => (
            <Accordion key={warehouse.id} sx={{border: '1px solid'}} disableGutters>
              <AccordionSummary>
                <Typography
                  sx={{ width: '33%', flexShrink: 0 }}
                >
                  {warehouse.name}
                </Typography>
                <Typography
                  sx={{ color: 'text.secondary' }}
                >
                  {warehouse.address}
                </Typography>
              </AccordionSummary>
            </Accordion>
          ))}
        </>
      </AccordionDetails>
      <AccordionActions>
        <Button
          size='small'
          color='primary'
          onClick={() => navigate(`/inventory-edit/${data.id}`)}
        >
          Edit
        </Button>
        <Button
          size='small'
          color='secondary'
          onClick={() => {
            if (window.confirm('Are you sure to delete?')) {
              apiDeleteInventoryById(data.id).then(() => {
                onDeleteInventory(data.id);
              });
            }
          }}
        >
          Delete
        </Button>
      </AccordionActions>
    </Accordion>
  );
};
const InventoryList = ({ inventorys, warehouses, onDeleteInventory }) => {
  const classes = useStyles();
  const [data, setdata] = useState();

  useEffect(() => {
    let newData = [...inventorys];
    newData = newData.map((item) => {
      const populatedWarehouses = intersectionBy(
        warehouses,
        item.warehouses,
        'id'
      );
      item.warehouses = populatedWarehouses;
      return item;
    });
    setdata(newData);
  }, []);

  return (
    <div className={classes.root}>
      {data &&
        inventorys.map((data) => (
          <Inventory
            data={data}
            onDeleteInventory={onDeleteInventory}
            key={data.id}
          />
        ))}
    </div>
  );
};

export default InventoryList;
