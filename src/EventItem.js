import React, { Component } from 'react';
import moment from 'moment';

export default class EventItem extends Component {
  render() {
    const event = this.props.event;
    if (event) {
      return (
      <tr>
        <td>{event.title}</td>
        <td className='date-font'>{moment(event.start_time).format("ddd, MMM Do YYYY, h:mm a")}</td>
        <td className='date-font'>{moment(event.end_time).format("ddd, MMM Do YYYY, h:mm a")}</td>
        <td>{event.locations[0] && event.locations[0].name}</td>
      </tr>
    )
    }
  }
}

