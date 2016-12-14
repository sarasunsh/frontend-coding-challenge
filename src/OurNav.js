import React, { Component } from 'react';
import {Navbar, FormGroup, FormControl } from 'react-bootstrap';

//  Component showing all events
export default class OurNav extends Component {
  render() {
    return (
        <Navbar>
          <Navbar.Header>
            <Navbar.Brand>
              <a href="#">Calendar Search</a>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            <Navbar.Form pullLeft>
              <FormGroup>
                <FormControl type="text" placeholder="Filter By Name" onChange={this.props.handleFilterChange}/>
              </FormGroup>
            </Navbar.Form>
          </Navbar.Collapse>
        </Navbar>
    )
  }
}
