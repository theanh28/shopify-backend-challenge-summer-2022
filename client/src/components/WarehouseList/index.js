import React from 'react';
import { useNavigate } from 'react-router-dom';

import {
  Accordion,
  AccordionActions,
  AccordionSummary,
  Button,
  Divider,
  Typography,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { makeStyles } from '@mui/styles';
import { apiDeleteWarehouseById } from '../../apiService/helper/warehouses';

const useStyles = makeStyles(() => ({
  listItem: {
    border: '1px solid',
    borderRadius: '5px',
  },
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

const Warehouse = ({ data, onDeleteWarehouse }) => {
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
          className={classes.truncated}
        >
          {data.name}
        </Typography>
        <Typography
          sx={{ color: 'text.secondary' }}
          className={classes.truncated}
        >
          {data.address}
        </Typography>
      </AccordionSummary>
      <Divider />
      <AccordionActions>
        <Button
          size='small'
          color='primary'
          onClick={() => {
            navigate(`/warehouse-edit/${data.id}`);
          }}
        >
          Edit
        </Button>
        <Button
          size='small'
          color='secondary'
          onClick={() => {
            if (window.confirm('Are you sure to delete?')) {
              apiDeleteWarehouseById(data.id).then(() => {
                onDeleteWarehouse(data.id);
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
const WarehouseList = ({ warehouses, onDeleteWarehouse }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      {warehouses.map((data) => (
        <Warehouse
          data={data}
          onDeleteWarehouse={onDeleteWarehouse}
          key={data.id}
        />
      ))}
    </div>
  );
};

export default WarehouseList;
