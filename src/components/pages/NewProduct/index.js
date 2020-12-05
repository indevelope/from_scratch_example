import React from 'react';

import { useForm } from 'react-hook-form';
import cx from 'classnames';

import Layout from 'components/shared/Layout';
import { createProduct } from '../../../lib/client';

import { useHistory } from 'react-router-dom';
import { productPath } from '../../../helpers/routes';

import { uploadFile } from '../../../lib/filestack';

const NewProduct = () => {
  const { errors, register, handleSubmit, formState: { isSubmitting } } = useForm();

  const history = useHistory();

  const onSubmit = async ({ Cover, ...fields }) => {
    const formData = new FormData();
    formData.append('fileUpload', Cover[0]);
    const uploadResult = await uploadFile(formData);

    const res = await createProduct({
      ...fields,
      Cover: [
        { url: uploadResult.url }
      ],
      Price: parseFloat(fields.Price)
    });
    
    const newProduct = res.records[0];
    const redirectURI = productPath(newProduct.id);

    history.push(redirectURI);
  };

  return (
    <Layout>
      <h1 className='text-3xl font-bold'>New Product</h1>
      <form onSubmit={handleSubmit(onSubmit)} className='mt-5'>
        <Field errors={errors} name='Title' label='Title' register={register} />
        <Field 
          errors={errors} 
          name='Description'
          type='textarea'
          className='w-full'
          label='Description'
          register={register}
        />
        <Field errors={errors} defaultValue={0} name='Price' type='number' label='Price' register={register} />
        <Field type='file' name='Cover' label='Upload Cover' register={register} />
        <div className='mt-3'>
          <label>
            <input type='checkbox' name='Discount' ref={register} /> Discount?
          </label>
        </div>
        <button disabled={isSubmitting} className='mt-3 bg-gray-700 px-3 py-2 text-white'>{isSubmitting ? 'Submitting...' : 'Add Product'}</button>
      </form>
    </Layout>
  );
};

export default NewProduct;

const Field = ({ errors, register, label, type, className, ...inputProps }) => {
  const Component = type === 'textarea' ? 'textarea' : 'input';

  return (
    <div>
      <label className='block' htmlFor={inputProps.name}>{label}</label>
      <Component 
        className={cx('border border-gray-500 rounded px-2 py-3 w-full', className)}
        ref={register}
        type={type}
        {...inputProps}
      />
      {errors && errors[inputProps.name] && <span className='text-red-600'>{errors[inputProps.name].message}</span>}
    </div>
  );
};