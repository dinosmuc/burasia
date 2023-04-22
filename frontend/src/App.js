import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import React, { Component } from 'react';
import LoginForm from './components/LoginForm/login.component';

import Navigation from "./components/Navigation/navigation.component";
import Home from "./components/Home/home.component";
import CustomerList from "./components/Customer-List/customerList.component";
import ScheduleAppointment from "./components/Schedule/schedule.component";
import Account from "./components/Account/account.component";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

class App extends Component {
  constructor() {
    super();
    this.state = {
      isLoggedIn: false,
    };
  }

  handleLogin = (isLoggedIn) => {
    this.setState({ isLoggedIn });
  };

  handleLogout = () => {
    this.setState({ isLoggedIn: false });
  };

  render() {
    const { isLoggedIn } = this.state;
  
    return (
      <div className="App">
        <Router>
          {isLoggedIn && <Navigation onLogout={this.handleLogout} />}
          <Routes>
          {!isLoggedIn ? (
            <Route path="/*" element={<LoginForm onLogin={this.handleLogin} />} />
          ) : (
            <>
                <Route index path="/" element={<Home />} />
                <Route path="/home" element={<Home />} /> {/* Add this line */}
                <Route path="customer-list" element={<CustomerList />} />
                <Route path="schedule" element={<ScheduleAppointment />} />
                <Route path="account" element={<Account />} />
              </>
            )}
          </Routes>

        </Router>
      </div>
    );
  }
}
export default App;