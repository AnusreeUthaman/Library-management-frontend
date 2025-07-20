import React from "react";
import CreateItemForm from "../../../components/createItem/CreateItem"

const CreateAuthor = () =>{
    return(
        <div className="">
            <CreateItemForm 
             title='Add Author'
             placeholder='Author name'
             endpoint='/book/authors/'
             redirect='/authors'
            />
        </div>
    );
};

export default CreateAuthor;
