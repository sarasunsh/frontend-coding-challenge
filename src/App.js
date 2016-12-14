import React, { Component } from 'react';
import logo from './logo.png';
import './App.css';
import EventList from './EventList';
import EventForm from './EventForm';
import OurNav from './OurNav';
import { AccessToken } from './secrets';
import { Col } from 'react-bootstrap';


export default class App extends Component {
  constructor(props){
    super(props);
    // Initialize the app's state to contain a list of events (to be fetched)
    this.state = {
      rawEvents: [],
      filter: ''
    }
    // Event handlers for form changes
    this.addEvent = this.addEvent.bind(this);
    this.handleFilterChange = this.handleFilterChange.bind(this);
  }

  componentDidMount(){
    // Fetch the list of events from the Eventable API
    fetch('https://api.eventable.com/v1/events/', {
      headers: {
        "Content-Type": "application/json",
        'Authorization': AccessToken
      }
    })
    .then(res => res.json())
    .then(data => this.setState({rawEvents: data.results}))
    .catch(err => console.log(err))
  }

  // Handle new event submitted via form
  addEvent(newEvent){
    newEvent.id = this.state.rawEvents.length; // React requires every item in an iterative array to have a unique ID
    this.setState({
      rawEvents: [...this.state.rawEvents, newEvent] // Add new event
    })
  }

  // Handle any user input into search bar
  handleFilterChange(evt) {
      const newFilter = evt.target.value.toLowerCase();
      this.setState({ filter: newFilter });
    }

  render() {
    // If the user has entered content into the filter, that content will be used to filter event names; otherwise the full list will be displayed
    const { filter, rawEvents } = this.state
    const filteredEvents = filter ?
      rawEvents.filter((e) => { return e.title.toLowerCase().indexOf(filter) !== -1 })
    :
      rawEvents;

    return (
      <div className="App">

        {/* Header*/}
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </div>

        {/* Navbar*/}
        <OurNav handleFilterChange={this.handleFilterChange}/>

        {/* Event table */}
        <Col xs={12} md={6} className="clearfix main-page">
          <h3> List of Events </h3>
          <hr></hr>
          <EventList events={filteredEvents}/>
        </Col>

        {/* Form for adding events */}
        <Col xs={12} md={6} className="clearfix main-page">
          <h3> Add New Event </h3>
          <hr></hr>
          <EventForm addEvent={this.addEvent}/>
        </Col>

      </div>
    );
  }
}
