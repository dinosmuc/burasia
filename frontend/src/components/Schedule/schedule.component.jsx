import React, { Component } from 'react';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import DatePicker from 'react-datepicker';
import Table from 'react-bootstrap/Table';
import "react-datepicker/dist/react-datepicker.css";
import './schedule.styles.css';
import { API_BASE_URL } from '../../config';

class ScheduleAppointment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      customers: [],
      selectedCustomer: '',
      appointmentDate: new Date(),
      appointments: [],
    };
  }

  componentDidMount() {
    // Fetch customers
    
    fetch(`${API_BASE_URL}/api/customers/`)
      .then(response => response.json())
      .then(customers => this.setState({ customers }));
  
    // Fetch appointments
    fetch(`${API_BASE_URL}/api/appointments/`)
      .then(response => response.json())
      .then(appointments => this.setState({ appointments }));
  }

  deleteAppointment = (appointmentId) => {
    fetch(`${API_BASE_URL}/api/appointments/${appointmentId}/`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.ok) {
          this.setState((prevState) => {
            return {
              appointments: prevState.appointments.filter(
                (appointment) => appointment.id !== appointmentId
              ),
            };
          });
        }
      });
  };
  
  updateAppointment = (appointmentId, newDate) => {
    fetch(`${API_BASE_URL}/api/appointments/${appointmentId}/`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        appointment_date: newDate,
      }),
    })
      .then((response) => response.json())
      .then((updatedAppointment) => {
        this.setState((prevState) => {
          const updatedAppointments = prevState.appointments.map((appointment) =>
            appointment.id === updatedAppointment.id ? updatedAppointment : appointment
          );
          return { appointments: updatedAppointments };
        });
      });
  };


  handleCustomerChange = (event) => {
    this.setState({ selectedCustomer: event.target.value });
  };

  handleDateChange = (date) => {
    this.setState({ appointmentDate: date });
  };

  handleSubmit = (event) => {
    event.preventDefault();
  
    // Create and send a POST request to your Django backend with the form data.
    fetch(`${API_BASE_URL}/api/appointments/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        customer: this.state.selectedCustomer,
        appointment_date: this.state.appointmentDate,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        // Add the newly created appointment to the component state
        this.setState((prevState) => ({
          appointments: [...prevState.appointments, data],
        }));
      });
  };
  

  render() {
    const { customers, appointmentDate, appointments } = this.state;
  
    return (
      <Container>
        <h2 className="text-center schedule-appointment">Schedule Appointment</h2>
        <Form onSubmit={this.handleSubmit} className="form-container">
          <Form.Group as={Row} controlId="customerSelect">
            <Form.Label column sm={2}>Customer</Form.Label>
            <Col sm={10}>
              <Form.Control as="select" onChange={this.handleCustomerChange}>
                <option value="">Select a customer</option>
                {customers.map((customer) => (
                  <option key={customer.id} value={customer.id}>
                    {customer.name}
                  </option>
                ))}
              </Form.Control>
            </Col>
          </Form.Group>
  
          <Form.Group as={Row} controlId="appointmentDate">
            <Form.Label column sm={2}>Date</Form.Label>
            <Col sm={10}>
              <DatePicker
                selected={appointmentDate}
                onChange={this.handleDateChange}
                showTimeSelect
                dateFormat="Pp"
                className="form-control"
              />
            </Col>
          </Form.Group>
  
          <Form.Group as={Row}>
            <Col className="text-center">
              <Button variant="success" type="submit" className="schedule-btn">
                Schedule Appointment
              </Button>
            </Col>
          </Form.Group>
        </Form>
        <h2 className="text-center mt-5">Scheduled Appointments</h2>
        <div className="table-container">
          <Table striped bordered hover responsive variant="dark">
            <thead>
              <tr>
                <th>Customer</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {appointments.map((appointment) => (
                <tr key={appointment.id}>
                  <td>{appointment.customer_name}</td>
                  <td>
                    <DatePicker
                      selected={new Date(appointment.appointment_date)}
                      onChange={(newDate) =>
                        this.updateAppointment(appointment.id, newDate)
                      }
                      showTimeSelect
                      dateFormat="Pp"
                      className="form-control"
                    />
                  </td>
                  <td>
                    <Button
                      variant="danger"
                      onClick={() => this.deleteAppointment(appointment.id)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </Container>
    );
  }
}

export default ScheduleAppointment;