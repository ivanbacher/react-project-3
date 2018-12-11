import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { addReminder, deleteReminder } from '../actions/index';


import './App.css';

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            text: ''
        }
    }

    addReminder() {
        this.props.addReminder(this.state.text);
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
                    className="list-group-item d-flex justify-content-between align-items-center">

                    {reminder.text}

                    <span
                        className="badge"
                        onClick={ () => this.deleteReminder(reminder.id) }
                        >&#x2715;</span>
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
            <div className="input-group">
                <input
                    className="form-control"
                    placeholder="I have to ..."
                    onChange={event => this.setState({text: event.target.value})}
                />
                <div className="input-group-append">
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
    return bindActionCreators({addReminder, deleteReminder}, dispatch);
}

function mapStateToProps(state) {
    return {
        reminders: state
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
