
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Button, Modal, Form } from 'react-bootstrap';

const ShowDetails = () => {
  const { id } = useParams();
  const [show, setShow] = useState(null);
  const [bookingFormVisible, setBookingFormVisible] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    const fetchShowDetails = async () => {
      const response = await axios.get(`https://api.tvmaze.com/shows/${id}`);
      setShow(response.data);
    };

    fetchShowDetails();
  }, [id]);

  const showBookingForm = () => {
    setBookingFormVisible(true);
  };

  const hideBookingForm = () => {
    setBookingFormVisible(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!name.trim()) {
      alert('Please enter your name.');
      return;
    }

    if (!email.trim() || !email.includes('@')) {
      alert('Please enter a valid email address.');
      return;
    }
    const bookingDetails = { name, email, show: show.name };
    localStorage.setItem('bookingDetails', JSON.stringify(bookingDetails));
    setBookingFormVisible(false);
  };

  if (!show) {
    return <div className="container"><h1>Loading...</h1></div>;
  }

  return (
    <div className="container">
      <h1>{show.name}</h1>
      <img src={show.image?.original} alt={show.name} className="img-fluid" />
      <p>{show.summary}</p>
      <Button variant="success" onClick={showBookingForm}>Book a Movie Ticket</Button>
      <Modal show={bookingFormVisible} onHide={hideBookingForm}>
        <Modal.Header closeButton>
          <Modal.Title>Book a Movie Ticket</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" name="name" value={name} onChange={e => setName(e.target.value)} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" name="email" value={email} onChange={e => setEmail(e.target.value)} />
            </Form.Group>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default ShowDetails;
