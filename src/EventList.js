import React, { Component } from 'react';
import EventItem from './EventItem';
import { Table } from 'react-bootstrap';

//  Component showing all events
export default class EventList extends Component {
  render() {
    const evts = this.props.events
    return (
      <Table striped bordered condensed hover>
        <thead>
          <tr>
            <th>Title</th>
            <th>Start</th>
            <th>End</th>
            <th>Location</th>
          </tr>
        </thead>
        <tbody>
            {
              evts.map( (event, idx) => (
                  <EventItem event={event} key={event.id}/>
              ))
            }

        </tbody>
      </Table>
    )
  }
}
