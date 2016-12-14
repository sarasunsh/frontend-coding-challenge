import React, { Component } from 'react';
import { Col, Button, ControlLabel, Form, FormControl, FormGroup } from 'react-bootstrap';
import moment from 'moment';

// Hard-coded options for location -- in a production app, these would be customizable via user input
const locationDict = {
  "eventable": {id: 1, name: 'Eventable HQ, New York, NY'},
  "prospect": {id: 2, name: 'Prospect Park, Brooklyn, NY'},
  "empire": {id: 3, name: 'Empire State Building, Midtown, NYC'},
  "jfk": {id: 4, name: 'JFK Airport, Queens, NY'},
  "met": {id: 5, name: 'Metropolitan Museum of Art, Upper East Side, NYC'},
  "coney": {id: 6, name: 'Coney Island, Brooklyn, NY'}
}

//  Component showing all events
export default class EventForm extends Component {
  constructor(props){
    super(props);
    this.state = {
      title: '',
      startDate: '',
      endDate: '',
      locations: [],
      invalid: true // Submit Button is disabled if dates are invalid
    }
    this.onTitleChange = this.onTitleChange.bind(this);
    this.onStartDateChange = this.onStartDateChange.bind(this);
    this.onEndDateChange = this.onEndDateChange.bind(this);
    this.checkDateValid = this.checkDateValid.bind(this);
    this.onLocationChange = this.onLocationChange.bind(this);
    this.onEventSubmit = this.onEventSubmit.bind(this);
  }

  // Confirms that the date is an actual calendar date and that the end date is after the start
  checkDateValid(start, stop){
    const validFormat = moment(start).isValid() && moment(stop).isValid();
    const validDuration = moment.duration(moment(start).diff(moment(stop)));
    return validFormat && validDuration.asHours() < 0;
  }

  // Handles user input on the title form
  onTitleChange(evt){
    this.setState({
      title: evt.target.value
    });
  }

  // Handles user input on the start date form
  onStartDateChange(evt){
    const validCheck = this.checkDateValid(evt.target.value, this.state.endDate);
    this.setState({
      startDate: evt.target.value,
      invalid: !validCheck
    });
  }

  // Handles user input on the end date form
  onEndDateChange(evt){
    const validCheck = this.checkDateValid(this.state.startDate, evt.target.value);
    this.setState({
      endDate: evt.target.value,
      invalid: !validCheck
    });
  }

    // Handles user input on the end date form
  onLocationChange(evt){
    this.setState({
      locations: [locationDict[evt.target.value] ]
    });
  }

  // Handles form submission by passing back the newEvent Object to the main App component
  onEventSubmit(evt){
    evt.preventDefault();
    const { title, startDate, endDate, locations } = this.state
    this.props.addEvent({ title, startDate, endDate, locations })
    this.setState({
      title: '',
      startDate: '',
      endDate: '',
      locations: []
    })
  }

  render() {
    return (
      <div>
        <Form onSubmit={this.onEventSubmit}>
          <FormGroup>

            <Col xs={3} className='form-col'>
              <ControlLabel>Event Title</ControlLabel>
            </Col>
            <Col xs={9} className='form-col'>
              <FormControl name="title" onChange={this.onTitleChange}/>
            </Col>

            <Col xs={3} className='form-col'>
              <ControlLabel>Start Date</ControlLabel>
            </Col>
            <Col xs={9} className='form-col'>
              <FormControl name="startDate" onChange={this.onStartDateChange} placeholder="YYYY/MM/DD"/>
            </Col>
            <Col xs={3} className='form-col'>
              <ControlLabel>End Date</ControlLabel>
            </Col>
            <Col xs={9} className='form-col'>
              <FormControl name="endDate" onChange={this.onEndDateChange} placeholder="YYYY/MM/DD"/>
            </Col>
            <Col xs={3} className='form-col'>
              <ControlLabel>Location</ControlLabel>
            </Col>
            <Col xs={9} className='form-col'>
              <FormControl componentClass="select" onChange={this.onLocationChange}>
                <option value="placeholder">Select location...</option>
                <option value="eventable">Eventable HQ</option>
                <option value="prospect">Prospect Park</option>
                <option value="empire">Empire State Building</option>
                <option value="jfk">JFK Airport</option>
                <option value="met">Metropolitan Museum of Art</option>
                <option value="coney">Coney Island</option>
              </FormControl>
            </Col>

            <Button type="submit" disabled={this.state.invalid}>Submit!</Button>
          </FormGroup>
        </Form>
      </div>
    )
  }
}



