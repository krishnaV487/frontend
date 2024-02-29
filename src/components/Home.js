import React, { useState, useEffect } from "react";
import axios from "axios";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function Home() {
  const [top5, setTop5] = useState([]);
  const [top5act, setTop5act] = useState([]);
  const [selected, setSelected] = useState(null);
  const [selected2, setSelected2] = useState(null);
  const [show, setShow] = useState(false);
  const [show2, setShow2] = useState(false);

  useEffect(() => {
    axios.get("/homepage").then((res) => setTop5(res.data.data));
    axios.get("/homepage2").then((res) => setTop5act(res.data.data));
  }, []);

  const toggleShow = () => setShow(!show);
  const toggleShow2 = () => setShow2(!show2);

  return (
    <div>
      
      <Container>
        <Row><h5>Top 5 Movie List:</h5></Row>
        <Row>
          {top5.map((data, idx) => (
            <Col md="auto" key={data.film_id}>
              <Card style={{ width: "15rem" }}>
                <Card.Body>
                  <Card.Text>{data.title}</Card.Text>
                  <Button
                    variant="secondary"
                    onClick={() => {
                      setSelected(data);
                      toggleShow();
                    }}
                  >
                    More Info
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
      {show && selected && (
        <Container>
          <Row>
            <Col>
              <Card style={{ width: "18rem" }}>
                <Card.Title>{selected.title}</Card.Title>
                <Card.Text>
                  <b>Film ID:</b> {selected.film_id}<br />
                  <b>Rental Count:</b> {selected.rental_count}<br />
                  <b>Last Updated:</b> {selected.last_update}<br />
                  <b>Release Year:</b> {selected.release_year}<br />
                  <b>Rental Count:</b> {selected.rental_count}<br />
                  <b>Length:</b> {selected.length}<br />
                  <b>Rating:</b> {selected.rating}<br />
                  <b>Special Features:</b> {selected.special_features}<br />
                  <b>Description:</b> {selected.description}<br />
                </Card.Text>
              </Card>
            </Col>
          </Row>
        </Container>
      )}

<Container>
  <Row ><h5>Top 5 Actors List:</h5></Row>
  <Row >
    {top5act.map((data) => (
      <Col md="auto" key={data.actor_id}>
        <Card style={{ width: "15rem" }}>
          <Card.Body>
            <Card.Text>{`${data.first_name} ${data.last_name}`}</Card.Text>
            <Button
              variant="secondary"
              onClick={() => {
                axios.get(`/actor5?actorId=${data.actor_id}`).then((res) => {
                  console.log(res.data);
                  setSelected2(res.data.data);
                  toggleShow2();
                });
              }}
            >
              More Info
            </Button>
          </Card.Body>
        </Card>
      </Col>
    ))}
  </Row>
</Container>
{show2 && selected2 && (
  <Container>
    <Row>
      <Col>
        <Card style={{ width: "20rem" }}>
          <Card.Text>
          <table>
            {
                selected2.map((data) => (
                    <>
                    <tr>
                    <Card style={{ width:"20rem"}}><td>
                        Film Title: {data.title}
                    </td>
                    <td>
                        Category: {data.category}
                    </td>
                    <td>
                        Rental Count: {data.rental_count}
                    </td></Card>
                    </tr>
                    </>
                ))
            }
           </table>
          </Card.Text>
        </Card>
      </Col>
    </Row>
  </Container>
)}
  </div>);
}

export default Home;