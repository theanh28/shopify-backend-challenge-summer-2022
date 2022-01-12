import React, { useState, useEffect } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useNavigate, useParams } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import {
  Button,
  CircularProgress,
  Divider,
  TextField,
  Typography,
} from '@mui/material';
import { Save } from '@mui/icons-material';

import {
  apiGetWarehouseById,
  apiPutWarehouseById,
} from '../../apiService/helper/warehouses';

const WarehouseEdit = () => {
  const [formData, setformData] = useState();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const { id } = useParams();

  useEffect(() => {
    apiGetWarehouseById(id).then((data) => setformData(data));
  }, [id]);

  return (
    <>
      {formData ? (
        <Formik
          initialValues={{
            name: formData.name,
            address: formData.address,
          }}
          onSubmit={async (values, { resetForm }) => {
            try {
              await apiPutWarehouseById(id, values);
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
              <Typography>New warehouse </Typography>
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

export default WarehouseEdit;
