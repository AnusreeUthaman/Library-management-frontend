import React from "react";
import CreateItemForm from "../../../components/createItem/CreateItem";

const CreateGenre = () =>{
    return(
        <div className="">
            <CreateItemForm
             title='Add Genre'
             endpoint='/book/genres/' 
             redirect='/genres'      
            />
        </div>
    );
};

export default CreateGenre;