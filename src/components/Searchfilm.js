import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col, Card } from 'react-bootstrap';

String.prototype.toProperCase = function () {
    return this.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
};

const FilmCard = ({ data }) => {
    const [show, setShow] = useState(false);
    const [ttl, setTtl] = useState("");


    return (
        <Card onClick={() => { setShow(!show); setTtl(data.film_id) }}>
            <Row key={data.film_id}>
                <Col xs={4}>{data.title.toProperCase()}</Col>
                <Col xs={2}>
                    {data.rating}
                </Col>
                <Col xs={2}>
                    {data.release_year}
                </Col>
                <Col xs={4}>
                    {data.last_update.substr(0,16)}
                </Col>
            </Row>
            {show && ttl && ttl === data.film_id && (
                <Container>
                    <Row>
                        <b>Description:</b><p> {data.description}</p>
                        <b>Rental Duration:</b><p> {data.rental_duration}</p>
                        <b>Rental Rate:</b><p> {data.rental_rate}</p>
                        <b>Replacement Cost:</b><p> {data.replacement_cost}</p>
                    </Row>
                </Container>
            )}
        </Card>
    )
}

const SearchFilm = () => {
    
    const [fname, setFname] = useState("");
    const [aname, setAname] = useState("");
    const [category, setCategory] = useState("");
    const [films, setFilms] = useState([]);

    useEffect(() => {
        axios.get(`/sf?actorname=${aname}&filmname=${fname}&category=${category}`).then((res) => {
            console.log(res.data);
            setFilms(res.data.data);
        });
    }, [fname, aname, category]);

    return (
        <div>
            <Container>
                <Row>
                    <Col><h5 style={{ color: 'darkolivegreen' }}>Film Name</h5></Col>
                    <Col><h5 style={{ color: 'darkolivegreen' }}>Actor Name</h5></Col>
                    <Col><h5 style={{ color: 'darkolivegreen' }}>Film Category</h5></Col>
                </Row>
                <Row>
                    <Col><input type="search" value={fname} onChange={(e) => setFname(e.target.value)} id="form1" className="form-control" placeholder="Film Name" aria-label="Searchf" /></Col>
                    <Col><input type="search" value={aname} onChange={(e) => setAname(e.target.value)} id="form2" className="form-control" placeholder="Actor Name" aria-label="Searchf" /></Col>
                    <Col><input type="search" value={category} onChange={(e) => setCategory(e.target.value)} id="form3" className="form-control" placeholder="Film Category" aria-label="Searchf" /></Col>
                </Row>
            </Container>
            <br />
            <Container><h5 style={{ color: 'darkolivegreen' }}>Films</h5></Container>
            <br />
            <div>
                <Container>
                    <Row>
                        <Col><h6 style={{ color: 'olive' }} xs={5}>Film title</h6></Col>
                        <Col><h6 style={{ color: 'olive' }} xs={1}>Rating</h6></Col> 
                        <Col><h6 style={{ color: 'olive' }} xs={2}>Release Year</h6></Col> 
                        <Col><h6 style={{ color: 'olive' }} xs={4}>Last Updated</h6></Col> 
                    </Row>
                    <br /> 
                    {films.map((data) => ( <FilmCard data={data} key={data.film_id} /> ))} 
                </Container> 
            </div> 
        </div> 
    ) 
}

export default SearchFilm;

