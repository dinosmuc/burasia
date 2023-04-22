// TotalMoneyReceived.js
import React, { Component } from 'react';
import "./account.style.css"
import { API_BASE_URL } from '../../config';

class Account extends Component {
    constructor(props) {
        super(props);
        this.state = {
            totalMoney: 0,
        };
    }

    componentDidMount() {
        this.fetchData();
    }

    fetchData() {
        fetch("http://localhost:8000/api/customers/total_money_received/")
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`HTTP error ${response.status}`);
                }
                return response.json();
            })
            .then((data) => {
                this.setState({ totalMoney: data.total_money_received });
            })
            .catch((error) => {
                console.error("Error fetching total money received:", error);
            });
    }
    render() {
        const { totalMoney } = this.state;

        return (
            <div className="total-money-received">
                <h2>Total Money Received</h2>
                <div className="total-money-value">
                    <span>${totalMoney.toFixed(2)}</span>
                </div>
            </div>
        );
    }
}

export default Account;