import React, {useEffect, useState } from "react"
import axios from "axios";
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.css';
import SplitPane from 'react-split-pane';



function Home() {
    const [show,setShow] = useState(false);
    const [show2,setShow2] = useState(false);
    const [actor5,setActor5] = useState([])
    const [i,setI] = useState(0);
    const [top5,setTop5] = useState([]);
    const [top5act, setTop5act] = useState([]);
    useEffect(() =>{
        axios({
            method: "GET",
            url:"/homepage",
        })
        .then((response) => {
            setTop5(JSON.parse(JSON.stringify(response.data)));
            console.log(top5)
        })
        .catch((error) => {
            if (error.response){
                console.log(error.response.title)
            }
        })
        axios({
            method: "GET",
            url:"/homepage2",
        })
        .then((response) => {
            setTop5act(JSON.parse(JSON.stringify(response.data)));
            console.log(top5)
        })
        .catch((error) => {
            if (error.response){
                console.log(error.response.title)
            }
        })
        
        
    },[])

    let topdata = top5.data;
    let topdata2 = top5act.data;


    return (
        <div>
            <SplitPane split="vertical" defaultSize='60%' primary="second">
            <div>
             <p>Top 5 Movie List: </p>
             
                    {topdata? topdata.map((data,idx) => (
                        <Card key={data.film_id} style={{width:'80%'}}>
                                <Card.Title>{data.title}</Card.Title>
                                <Button type="secondary" onClick={() => {setShow(!show); setI(data)}}>More Info</Button>
                                <Card.Text>
                                    <div name="description">
                                    </div>
                                    <div name="release year"></div>
                                </Card.Text>
                        </Card>
                    )) : null}
             <p>Top 5 Actors List: </p>
                    {topdata2? topdata2.map((data,{idx}) => (
                        <Card key={data.actor_id} style={{width:'80%'}}>
                                <Card.Title>{data.first_name} {data.last_name}</Card.Title>
                                <Button type="secondary" onclick={() => {
        axios({
            method: "GET",
            url:"/actor5?actorId={data.actor_id}",
        })
        .then((response) => {
            setActor5(JSON.parse(JSON.stringify(response.data)));
            console.log(actor5)

        })
        .catch((error) => {
            if (error.response){
                console.log(error.response.title)
            }
        });setShow2(!show2); setI(data)}} >More Info</Button>
                        </Card>
                    )) : null}
             </div>
             <div><left>
                {show?<><p>{"Movie Information: "}</p>
                <Card style={{width:'80%'}}><Card.Title>{i.title}</Card.Title><Card.Text>
                    <b>{"Film ID: "}</b> {i.film_id}<br/>
                    <b>{"Category: "}</b>{i.category}<br/>
                    <b>{"Rental Count: "}</b>{i.rental_count}<br/>
                    <b>{"Last Updated: "}</b>{i.last_update}<br/>
                    <b>{"Release Year: "}</b>{i.release_year}<br/>
                    <b>{"Rental Count: "}</b>{i.rental_count}<br/>
                    <b>{"Length"}</b>{i.length}<br/>
                    <b>{"Rating:"} </b>{i.rating}<br/>
                    <b>{"Special Features:"} </b>{i.special_features}<br/>
                    <b>{"Description:"} </b>{i.description}<br/>
                    </Card.Text></Card></>:null}

                    {show2?<><p>{"Actor Information: "}</p>
                    <Card style={{width:'80%'}}><Card.Title>{i.first_name}{" "}{i.last_name}</Card.Title><Card.Text>
                        <b>{"Film ID: "}</b> {i.film_id}<br/>
                        <b>{"Category: "}</b>{i.category}<br/>
                        <b>{"Rental Count: "}</b>{i.rental_count}<br/>
                        <b>{"Last Updated: "}</b>{i.last_update}<br/>
                        <b>{"Release Year: "}</b>{i.release_year}<br/>
                        <b>{"Rental Count: "}</b>{i.rental_count}<br/>
                        <b>{"Length"}</b>{i.length}<br/>
                        <b>{"Rating:"} </b>{i.rating}<br/>
                        <b>{"Special Features:"} </b>{i.special_features}<br/>
                        <b>{"Description:"} </b>{i.description}<br/>
                        </Card.Text></Card></>:null}
                    
             </left></div>
             </SplitPane>
        </div>
    )
}

export default Home;