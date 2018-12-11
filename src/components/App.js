import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { addReminder, deleteReminder, clearReminders } from '../actions/index';
import moment from 'moment';

import './App.css';

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            text: '',
            dueDate: ''
        }
    }

    addReminder() {
        this.props.addReminder(this.state.text, this.state.dueDate);
    }

    deleteReminder(id) {
        this.props.deleteReminder(id);
    }

    renderReminders() {
        const { reminders } = this.props;

        return (

<ul className="list-group">
    {
        reminders.map( reminder => {
            return (
                <li key={reminder.id}
                    className="list-group-item">
                    <div className="d-flex justify-content-between align-items-center">
                        {reminder.text}

                        <span
                            className="badge"
                            onClick={ () => this.deleteReminder(reminder.id) }
                            >&#x2715;
                        </span>
                    </div>

                    <div className="font-italic">
                        {moment(new Date(reminder.dueDate)).fromNow()}
                    </div>
                </li>
            )
        })
    }
</ul>

        )
    }

    render() {
        return (
<div className="container mt-5">

    <div className="row">
        <div className="col-12 text-center">
            <h1>Reminder Pro</h1>
        </div>
    </div>

    <div className="row mt-5">
        <div className="col-12">
            <div className="form-group">
                <input
                    className="form-control"
                    placeholder="I have to ..."
                    onChange={event => this.setState({text: event.target.value})}
                />
            </div>
            <div className="form-group">
                <input
                    className="form-control"
                    type="date"
                    onChange={event => this.setState({dueDate: event.target.value})}
                />
            </div>

            <div className="d-flex justify-content-end">
                <button
                    type="button"
                    className="btn btn-danger mr-3"
                    onClick={() => this.props.clearReminders()}
                >
                    Clear Reminders
                </button>
                <button
                    type="button"
                    className="btn btn-success"
                    onClick={() => this.addReminder()}
                >
                    Add Reminder
                </button>
            </div>
        </div>
    </div>

    <div className="row mt-5">
        <div className="col-12">
            { this.renderReminders() }
        </div>
    </div>

</div>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({addReminder, deleteReminder, clearReminders}, dispatch);
}

function mapStateToProps(state) {
    return {
        reminders: state
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
