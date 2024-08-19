import React, { useContext, useEffect, useState } from "react";
import Nav from "./Nav";
import { Link, useLocation } from "react-router-dom";
import {ProductContext} from "../utils/Context";
import Loading from "./Loading";
import axios from "../utils/axios";
function Home() {
  const [products] =useContext(ProductContext);
  console.log(products);
  const {search} = useLocation();
  const category=decodeURIComponent(search.split("=")[1]);
  const [filteredProducts,setfilteredProducts] =useState(null);
  const getproductscategory = async ()=>{
    try{
      const {data} =await axios.get(`/products/category/${category}`);
      setfilteredProducts(data);
    }catch(err){
      console.log(err);
    };
  }
  useEffect(() =>{
    if(!filteredProducts || category == "undefined") setfilteredProducts(products);
    if(category != "undefined"){
      getproductscategory();
    }
  },[category,products]);
  return (products ?
    <>
      <Nav />
      <div className=" w-[85%] p-10 pt-[5%] flex flex-wrap overflow-x-hidden overflow-y-auto">
        {filteredProducts && filteredProducts.map((p,i)=>(<Link key={p.id} to={`/details/${p.id}`} className="mr-3 mb-3 w-[18%] h-[30vh] card p-2 border shadow rounded flex flex-col justify-center items-center">
          <div
            className="hover:scale-110 mb-3 w-full h-[80%] bg-contain bg-no-repeat bg-center"
            style={{
              backgroundImage:
                `url(${p.image})`,
            }}
          ></div>
          <h1 className="hover:text-blue-300">
            {p.title}
          </h1>
        </Link>))}
        
      </div>
    </>:<Loading/>
  )
}

export default Home;
