import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Circles } from 'react-loader-spinner'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Show = () => {
const [data, setData] = useState([]);
const [loading, setLoading] = useState(false);


  const navigate = useNavigate()

  useEffect(() => {
    axios
      .get('http://localhost:8080/show')
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [data]);


  const handleDelete=async(id)=>{
      setLoading(true);
        try {
           const del = await axios.delete("http://localhost:8080/delete/"+id)   
            if(del){
                toast.success('data deleted successfully', {
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
                    // setTimeout(()=>{
                    //     window.location.reload()

                    // },5000)  
                                  
            } catch (error) {
                console.log(error);
            }finally {
                setTimeout(() => {
              setLoading(false);
            }, 2000);
          }

  }


  const handleUpdate = (id)=>{
        navigate('/update/'+id)
  }

  return (
    <div>

     {loading ? 
    <div className="spinn-container"
    style={{position:"absolute", top:"200px", left:"500px" }}>
   <Circles
  height="80"
  width="80"
  color="#4fa94d"
  ariaLabel="circles-loading"
/>
              </div>  
      :(
        <table className='table table-bordered'>
        <thead>
          <tr>
            <th>Index</th>
            <th>Name</th>
            <th>Number</th>
            <th>Email</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
         {
            data.map((item,index)=>{
               return(
                <tr key={index}>
                <td> {index} </td>
                <td> {item.name} </td>
                <td> {item.mobile} </td>
                <td>  {item.email} </td>
                <td>
                    <button className='btn btn-outline-danger' onClick={()=>handleDelete(item._id)} >Delete</button>
                    <button className='btn btn-outline-success' onClick={()=>handleUpdate(item._id)}>Update</button>
                </td>
            </tr>
               )
            })
         }
        </tbody>
      </table>
     )
     
    }
            <ToastContainer/>

    </div>
  );
};

export default Show;

