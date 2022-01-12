import React from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { Button, Divider, TextField, Typography } from '@mui/material';
import { Save } from '@mui/icons-material';

import { apiPostWarehouse } from '../../apiService/helper/warehouses';

const WarehouseCreate = () => {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  return (
    <Formik
      initialValues={{
        name: '',
        address: '',
      }}
      onSubmit={async (values, { resetForm }) => {
        try {
          await apiPostWarehouse(values);
          resetForm({});
          enqueueSnackbar('Warehouse created successfully', {
            variant: 'success',
          });
          navigate('/warehouses');
        } catch (err) {
          enqueueSnackbar('Question create failed', { variant: 'error' });
        }
      }}
      validationSchema={Yup.object({
        name: Yup.string()
          .required('Name cannot be blank')
          .trim()
          .min(1, 'Name cannot be blank'),
        address: Yup.string()
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
        isSubmitting,
      }) => (
        <form onSubmit={handleSubmit}>
          <Typography >New warehouse </Typography>
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
          <Divider sx={{height: 10}} />
          <TextField
            fullWidth
            multiline
            rows={4}
            label='Address'
            placeholder={'Aa'}
            name='address'
            value={values.address}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.address && errors.address}
            helperText={touched.address && errors.address && errors.address}
          />
          <Button
            variant='contained'
            color='primary'
            type='submit'
            disabled={isSubmitting}
            startIcon={<Save />}
            sx={{marginTop: 10}}
          >
            Submit
          </Button>
        </form>
      )}
    </Formik>
  );
};

export default WarehouseCreate;
