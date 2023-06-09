import React from 'react'
import { useForm } from 'react-hook-form'
import axios from "axios";

import { ToastContainer, toast } from 'react-toastify';

const Add = () => {
    const {register , handleSubmit , reset} = useForm();

    const onSubmit=(data)=>{
         axios.post('http://localhost:8080/register',data)
         .then((res)=>{
            console.log(res.data);
            toast.success('registered', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                });
            reset();
         }).catch((error)=>{
            console.log(error)
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

         })


        // console.log(data)

    };
    const date = new Date().toLocaleDateString()
    console.log(date);


  return (
    <div>
     <div className="container">
        <div className="row">
            <div className="col-sm-4"></div>
            <div className="col-sm-4">
                <h1>Add ....</h1>
                <form onSubmit={handleSubmit(onSubmit)}>
                       <ToastContainer/>
                    <p>
                        <input type="text"
                        placeholder='Enter Name'
                        className='form-control'
                        name="name"
                        {...register('name' , {required:true})}
                         />
                    </p>
                    <p>
                        <input type="number"
                        placeholder='Enter Mobile'
                        className='form-control'
                        name="mobile"
                        {...register('mobile' , {required:true})}
                         />
                    </p>
                    <p>
                        <input type="email"
                        placeholder='Enter Email'
                        className='form-control'
                        name="email"
                        {...register('email' , {required:true})}
                         />
                    </p>
                    <p>
                        <input type="password"
                        placeholder='Enter Password'
                        className='form-control'
                        name="password"
                        {...register('password' , {required:true})}
                         />
                    </p>
                    <p>
                        <input type="text"
                        className='form-control'
                        name="date"
                        {...register('date' ,{ value:`${date}`})}
                         />
                    </p>
                    <input type="submit"
                    value="Save"
                    className='btn btn-outline-success' />

                </form>
            </div>
            <div className="col-sm-4"></div>
        </div>
     </div>
    </div>
  )
}

export default Add
