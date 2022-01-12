import React, { useState, useEffect } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useNavigate, useParams } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import {
  Autocomplete,
  Button,
  CircularProgress,
  Divider,
  TextField,
  Typography,
} from '@mui/material';
import { Save } from '@mui/icons-material';
import { intersectionBy, differenceBy } from 'lodash';

import {
  apiGetInventoryById,
  apiPutInventoryById,
} from '../../apiService/helper/inventorys';
import { apiGetWarehouses } from '../../apiService/helper/warehouses';

const InventoryEdit = () => {
  const [warehouses, setwarehouses] = useState();
  const [formData, setformData] = useState();
  const [kidnapped, setkidnapped] = useState();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const { id } = useParams();

  useEffect(() => {
    apiGetInventoryById(id).then((inventoryData) => {
      apiGetWarehouses().then((warehousesData) => {
        setwarehouses(warehousesData);

        // 'populate' warehouses IDs with warehouse info
        // when warehouses are deleted (hidden), we will not delete them from inventory.warehouses array,
        // instead we 'kidnap' them right here so they will not appear on website, and merge them back
        // to inventory.warehouses array when submit. This helps when we UNDELETE a warehouse, inventorys
        // will have their warehouses appear again. Depends on usecase. If we need, we could NOT merge
        // the kidnapped warehouses back when submit, effectively deleting them.
        const intersection = intersectionBy(
          warehousesData,
          inventoryData.warehouses,
          'id'
        );
        setkidnapped(differenceBy(inventoryData.warehouses, intersection, 'id'));
        inventoryData.warehouses = intersection;
        setformData(inventoryData);
      });
    });
  }, [id]);

  return (
    <>
      {formData && warehouses ? (
        <Formik
          initialValues={{
            name: formData.name,
            desc: formData.desc,
            warehouses: formData.warehouses,
          }}
          onSubmit={async (values, { resetForm }) => {
            try {
              let warehouses = values.warehouses.map((item) => ({
                id: item.id,
              }));
              warehouses = [...warehouses, ...kidnapped];
              await apiPutInventoryById(id, { ...values, warehouses });
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
              .required('Address cannot be blank'),
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
              <Typography>Inventory Edit </Typography>
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
      ) : (
        <CircularProgress />
      )}
    </>
  );
};

export default InventoryEdit;
