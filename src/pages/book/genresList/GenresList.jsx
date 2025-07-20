import React,{useState,useEffect} from "react";
import API from "../../../api/axiosInstance";
import Swal from "sweetalert2";
import Table from "../../../components/Table/Table";
import { useNavigate } from "react-router-dom";
import { swap } from "formik";

const GenresList = () =>{
  const [genres,setGenres] = useState([]);

  const navigate=useNavigate()
  
  const handleAddGenre = () => {
    navigate('/add/genre');
  };

  const handleDelete = async (id) =>{
    try{
        await API.delete(`book/delete/genre/${id}/`)
        Swal.fire("Deleted!", "Genre has been deleted.", "success")
    }catch(err){
        Swal.fire('genre delete failed')
    }
  }

  const columns =[
    {title:'ID',key:'id'},
    {title:'Name',key:'name'},
    {title:'Actions',key:'actions',render:(row) =>(
        <button onClick={() =>handleDelete(row.id)} className="text-red-500 hover:text-red-700 font-semibold">
            Remove
        </button>
    )}
  ];

 const fetchGenres = async () =>{
    try{
        const res = await API.get('book/genres/list/');
        const GenresList=res.data.data;
        setGenres(GenresList);    
    }catch(err){
        console.err("error fetching genres",err)
        Swal.fire("Error","something went wrong ","error")
    }
   } 
    useEffect(()=>{
        fetchGenres();
    },[]);

    return(
        <>
        <div className="max-w-7xl mx-auto mt-5 p-4 bg-white shadow-sm">
            <h2 className="text-3xl font-bold p-4 text-cyan-800">Available Genres</h2>
        <button
          onClick={handleAddGenre}
          className="bg-blue-400 hover:bg-blue-500 text-white font-medium py-2 px-4 rounded-lg shadow-md transition ml-[88%]"
        >
         + Add Genre
        </button>
        <div className="mt-4">
        <Table columns={columns} data={genres} />
      </div>
        </div>
        </>
    )

};

export default GenresList;