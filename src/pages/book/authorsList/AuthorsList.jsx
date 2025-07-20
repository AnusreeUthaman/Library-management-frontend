import React,{useState,useEffect} from "react";
import API from "../../../api/axiosInstance";
import Swal from "sweetalert2";
import Table from "../../../components/Table/Table";
import { useNavigate } from "react-router-dom";


const AuthorsList = () =>{
    
  const [authors,setAuthors] = useState([]);
  const navigate= useNavigate()

   const handleAddAuthor = () => {
    navigate('/add/author');
  };

  const handleDelete = async (id) =>{
    try{
        await API.delete(`book/delete/author/${id}/`)
        Swal.fire("Deleted!", "author has been deleted.", "success")
    }catch(err){
        Swal.fire('Author deletion failed')
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

 const fetchAuthors = async () =>{
    try{
        const res = await API.get('book/authors/list/');
        const AuthorsList=res.data.data;
        setAuthors(AuthorsList);    
    }catch(err){
        console.err("error fetching authors",err)
        Swal.fire("Error","something went wrong ","error")
    }
   } 
    useEffect(()=>{
        fetchAuthors();
    },[]);

    return(
        <>
        <div className="max-w-7xl mx-auto mt-5 p-4 bg-white shadow-sm ">
            <h2 className="text-3xl font-bold p-4 text-cyan-800">Available Authors</h2>
        <button
          onClick={handleAddAuthor}
          className="bg-blue-400 hover:bg-blue-500 text-white font-medium py-2 px-4 rounded-lg shadow-md transition ml-[88%]"
        >
          + Add Author
        </button>
        <div className="mt-4">
        <Table columns={columns} data={authors} />
      </div>
        </div>
        </>
    )

};

export default AuthorsList;