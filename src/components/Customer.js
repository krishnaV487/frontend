import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Button from "react-bootstrap/Button";
import Form from 'react-bootstrap/Form';
import close from '../icons/close.png';
import { Container, Row, Col, Card } from 'react-bootstrap';


String.prototype.toProperCase = function () {
    return this.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
};

const Customer = () => {
    const [cname, setCname] = useState("");
    const [customers, setCustomers] = useState([]);
    const [moreInfo, setMoreInfo] = useState([]);
    const [menu, setMenu] = useState(false);
    const [show,setShow] = useState(false);
    const [cid, setCid] = useState("");
    


    useEffect(() => {
        if (isNaN(cname) || !cname){
        axios.get(`/customer?customername=${cname}`).then((res) => {
            console.log(res.data);
            setCustomers(res.data.data);
        });
        }
        else{
            axios.get(`/customer?customerid=${cname}`).then((res) => {
                console.log(res.data);
                setCustomers(res.data.data);
        });}
    }, [cname]);

    const NewCustomerForm = () => {
        const [fname, setFname] = useState('');
        const [lname, setLname] = useState('');
        const [email, setEmail] = useState('');
        const [address, setAddress] = useState('');
        const [storenum, setStorenum] = useState('');
        const handleSubmit = () => {
            const formdata=
                {
                    "storenum": storenum,
                    "fname" : fname,
                    "lname" : lname,
                    "email" : email,
                    "address" : address
                }
            console.log(formdata);
            axios.post(`/addcustomer`,formdata)
            .then((res) => {console.log(res.data)})
            
        };
    
        return (
            <Form>
                <Form.Group>
                    <Form.Label><h6 style={{ color: 'darkolivegreen' }}>Store Number</h6></Form.Label>
                    <Form.Control type="number" value={storenum} onChange={(e) => {setStorenum(e.target.value)}} placeholder='eg: 1'></Form.Control>
                </Form.Group><br />
                <Form.Group>
                    <Form.Label><h6 style={{ color: 'darkolivegreen' }}>Customer First Name</h6></Form.Label>
                    <Form.Control type="text" value={fname} onChange={(e) => { {setFname(e.target.value)} }} placeholder='eg: jon'></Form.Control>
                </Form.Group><br />
                <Form.Group>
                    <Form.Label><h6 style={{ color: 'darkolivegreen' }}>Customer Last Name</h6></Form.Label>
                    <Form.Control type="text" value={lname} onChange={(e) => { {setLname(e.target.value)} }} placeholder='eg: lever'></Form.Control>
                </Form.Group><br />
                <Form.Group>
                    <Form.Label><h6 style={{ color: 'darkolivegreen' }}>Customer Email</h6></Form.Label>
                    <Form.Control type="email" value={email} onChange={(e) => { {setEmail(e.target.value)} }} placeholder='eg: test@email.com'></Form.Control>
                </Form.Group><br />
                <Form.Group>
                    <Form.Label><h6 style={{ color: 'darkolivegreen' }}>Customer Address Number</h6></Form.Label>
                    <Form.Control type="number" value={address} onChange={(e) => { {setAddress(e.target.value)} }} placeholder='eg: 1'></Form.Control>
                </Form.Group><br />
                <Row>
                    <Col xs={4}>
                        <Button variant="success"  onClick={() => {handleSubmit()}}>Add Customer</Button>
                    </Col>
                    <Col xs={2}>
                        <Button variant="dark" onClick={() => { setMenu(0) }}>Cancel</Button>
                    </Col>
                    <Col xs={8} />
                </Row>
            </Form>
        );
    };

    const Cust = ({ data }) => {

        return (
            <>
            <Row onClick={() => {setCid(data.customer_id); setShow(true);}}>
                <Col>{data.first_name.toProperCase()}</Col>
                <Col>{data.last_name.toProperCase()}</Col>
                <Col>{data.customer_id}</Col>
                <Col>{data.store_id}</Col>
                <Col>{data.last_update.substr(0,16)}</Col>
            </Row>
                {show && cid == data.customer_id && (
                    <Row>
                        <Card><Card.Body><Card.Text>
                            
                                Customer Email : 
                                {data.email.toLowerCase()}<br/>
                                Create Date : 
                                {data.create_date.substr(0,16)}<br/>
                                Active : 
                                {data.active}
                                <br/>
                        </Card.Text>
                        <Button variant='secondary' onClick={() => {setShow(false)}}>close</Button>
                        </Card.Body></Card>
                    </Row>
                )}
            </>
        )
    }


    return (
        <div>
            <br />
            <Container>
                <Row>
                    <Col xs={3}><Button variant="secondary" onClick={() => {setMenu(1)}}>Search Customer</Button></Col>
                    <Col xs={3}><Button variant="secondary" onClick={() => {setMenu(2)}}>Add Customer</Button></Col>
                    <Col xs={8}></Col>
                </Row>
                <br />
                { menu === 1 && (
                <Row className="align-items-center">
                    <Col xs={2}><h5 style={{ color: 'darkolivegreen' }}>Search Customer</h5> </Col>
                    <Col xs={9}><input type="search" value={cname} onChange={(e) => setCname(e.target.value)} id="form1" className="form-control" placeholder="Customer Name" /></Col>
                    <Col xs={1}><Button variant="secondary" onClick={() => {setMenu(0)}}><img src={close} width="10px" alt="close" height="10px"></img></Button></Col>
                </Row>
                )}
                {menu === 2 && (
                    <NewCustomerForm />
                )
                }
            </Container>
            <br />
            <Container>
                    <Row>
                    <Col><h6 style={{ color: 'olive' }}>First Name</h6></Col>
                    <Col><h6 style={{ color: 'olive' }}>Last Name</h6></Col>
                    <Col><h6 style={{ color: 'olive' }}>Customer ID</h6></Col>
                    <Col><h6 style={{ color: 'olive' }}>Store No.</h6></Col>
                    <Col><h6 style={{ color: 'olive' }}>Last Update</h6></Col>
                    </Row>
                    {customers.map((data) => (
                        <Cust data={data} key={data.customer_id}/>
                    ))}
            </Container> 
        </div> 
    ) 
}

export default Customer;

