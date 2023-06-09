import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import {  toast } from 'react-toastify';


const Update = () => {
  const { register, handleSubmit, setValue } = useForm();
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:8080/update/${id}`)
      .then((res) => {
        if (res.status === 200) {
          return res.data;
        }
      })
      .then((data) => {
        console.log(data);
        setValue('name', data.name);
        setValue('mobile', data.mobile);
        setValue('email', data.email);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  const onSubmit = (data) => {
    axios
      .put(`http://localhost:8080/update/${id}`,data)
      .then((res) => {
        console.log(res.data);
        if(res){
            toast.success('data updated successfully', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                });
        }
        navigate('/')
      })
      .catch((error) => {
        console.log(error);
        toast.error(`An error occured : ${error.response.data}`, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            });
      });

    console.log(data);
  };

  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="col-sm-4"></div>
          <div className="col-sm-4">
            <h1>Update ...</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
              <p>
                <input
                  type="text"
                  placeholder="Enter Name"
                  className="form-control"
                  name="name"
                  {...register('name', { required: true })}
                />
              </p>
              <p>
                <input
                  type="text"
                  placeholder="Enter Mobile"
                  className="form-control"
                  name="mobile"
                  {...register('mobile', { required: true })}
                />
              </p>
              <p>
                <input
                  type="email"
                  placeholder="Enter Email"
                  className="form-control"
                  name="email"
                  {...register('email', { required: true })}
                />
              </p>
              <input
                type="submit"
                value="Update"
                className="btn btn-outline-success"
              />
            </form>
          </div>
          <div className="col-sm-4"></div>
        </div>
      </div>
    </div>
  );
};

export default Update;
