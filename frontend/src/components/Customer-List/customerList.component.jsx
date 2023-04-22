import React, { Component } from 'react';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { API_BASE_URL } from '../../config';

class CustomerList extends Component {
  constructor() {
    super();
    this.state = {
      customers: [],
      searchField: '',
    };
  }

  componentDidMount() {
    fetch(`${API_BASE_URL}/api/customers/`)
      .then(response => response.json())
      .then(burasiaCustomers => {
        const sortedCustomers = burasiaCustomers.sort((a, b) => b.total_paid - a.total_paid);
        this.setState(() => {
          return { customers: sortedCustomers };
        });
      });
  }

  render() {
    const { customers } = this.state;

    return (
      <Container style={{ marginTop: '2rem' }}>
        <Row className="justify-content-center">
          {customers.map((customer, index) => {
            return (
              <Col xs={12} sm={6} md={4} key={index} className="mb-4">
                <Card style={{ width: '100%' }}>
                <Card.Img variant="top" src={customer.image_url ? `${API_BASE_URL}${customer.image_url}` : 'https://via.placeholder.com/150'} />
                  <Card.Body>
                    <Card.Title>{customer.name}</Card.Title>
                    <Card.Text>{customer.work}</Card.Text>
                  </Card.Body>
                  <ListGroup className="list-group-flush">
                    <ListGroup.Item>
                      <strong>Address:</strong> {customer.address}
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <strong>Total Paid:</strong> {customer.total_paid}
                    </ListGroup.Item>
                  </ListGroup>
                </Card>
              </Col>
            );
          })}
        </Row>
      </Container>
    );
  }
}

export default CustomerList;
