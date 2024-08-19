import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "../utils/axios";
import Loading from "./Loading";

const Details = () => {
  const [product,setProduct] = useState(null);
  const {id}=useParams();
  const getsingleproduct = async () => {
    try{
      const {data} =await axios.get(`/products/${id}`);
      console.log(data);
      setProduct(data);
    }catch(err){
      console.log(err);
    };


  }
  useEffect(() =>{
    getsingleproduct();
  },[id]);
  return ( product ?
    <div className="w-[80%] h-full justify-between items-center m-auto p-[10%] flex">
      <img
        className="object-contain h-[80%] w-[40%]"
        src={`${product.image}`}
        alt=""
      />
      <div className="content w-[50%]">
        <h1 className="text-5xl">
        {product.title}
        </h1>
        <h3 className="text-zinc-300 my-3">{product.category}</h3>
        <h1 className="text-red-600 mb-3">${product.price}</h1>
        <p className="mb-[5%]">
          {product.description}
        </p>
        <Link className="mr-5 py-2 px-5 border rounded border-blue-200 text-blue-500">
          Edit
        </Link>
        <Link className="py-2 px-5 border rounded border-red-200 text-red-500">
          Delete
        </Link>
      </div>
    </div>:<Loading/>
  );
};

export default Details;
