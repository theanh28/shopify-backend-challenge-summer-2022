import React, { useEffect, useState } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import {
  Button,
  Divider,
  TextField,
  Typography,
  Autocomplete,
} from '@mui/material';
import { Save } from '@mui/icons-material';

import { apiPostInventory } from '../../apiService/helper/inventorys';
import { apiGetWarehouses } from '../../apiService/helper/warehouses';

const InventoryCreate = () => {
  const navigate = useNavigate();
  const [warehouses, setwarehouses] = useState();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    apiGetWarehouses().then((warehousesData) => {
      setwarehouses(warehousesData);
    });
  }, []);

  return (
    <>
      {warehouses ? (
        <Formik
          initialValues={{
            name: '',
            desc: '',
            warehouses: [],
          }}
          onSubmit={async (values, { resetForm }) => {
            try {
              let warehouses = values.warehouses.map((item) => ({
                id: item.id,
              }));
              await apiPostInventory({ ...values, warehouses });
              resetForm({});
              enqueueSnackbar('Inventory created successfully', {
                variant: 'success',
              });
              navigate('/');
            } catch (err) {
              enqueueSnackbar('Question create failed', { variant: 'error' });
            }
          }}
          validationSchema={Yup.object({
            name: Yup.string()
              .required('Name cannot be blank')
              .trim()
              .min(1, 'Name cannot be blank'),
            desc: Yup.string()
              .required('Description cannot be blank'),
          })}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            setFieldValue,
            isSubmitting,
          }) => (
            <form onSubmit={handleSubmit}>
              <Typography>New inventory</Typography>
              <TextField
                fullWidth
                value={values.name}
                label='Name'
                name='name'
                id='outlined-basic'
                variant='outlined'
                placeholder={'Aa'}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.name && errors.name}
                helperText={touched.name && errors.name && errors.name}
              />
              <Divider sx={{ height: 10 }} />
              <TextField
                fullWidth
                multiline
                rows={4}
                label='Description'
                placeholder={'Aa'}
                name='desc'
                value={values.desc}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.desc && errors.desc}
                helperText={touched.desc && errors.desc && errors.desc}
              />
              <Autocomplete
                autoComplete
                value={values.warehouses}
                sx={{ marginTop: 5 }}
                multiple
                onChange={(e, value) => {
                  setFieldValue('warehouses', value);
                }}
                options={warehouses}
                groupBy={(option) => option.name[0]}
                getOptionLabel={(option) => option.name}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label='Search Warehouse'
                    fullWidth
                  ></TextField>
                )}
              ></Autocomplete>
              <Button
                variant='contained'
                color='primary'
                type='submit'
                disabled={isSubmitting}
                startIcon={<Save />}
                sx={{ marginTop: 10 }}
              >
                Submit
              </Button>
            </form>
          )}
        </Formik>
      ) : null}
    </>
  );
};

export default InventoryCreate;
