import React, {useEffect, useState } from "react"
import axios from "axios";
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.css'

function SearchFilm() {

    const [result,setresult] = useState([]);
    useEffect(() =>{
        axios({
            method: "GET",
            url:"/fs",
        })
        .then((response) => {
            setresult(JSON.parse(JSON.stringify(response.data)));
            console.log('yes')
        })
        .catch((error) => {
            if (error.response){
                console.log(error.response.title)
            }
        })
    },[])

    let topdata = result.data;
    return (
        <div>
            <div class="form-outline" data-mdb-input-init>
  <input type="search" id="form1" class="form-control" placeholder="Type query" aria-label="Search" />
</div>
        </div>
    )
}

export default SearchFilm;