import React from 'react';
import Servers from '../servers';
import Teams from '../teams';
import TestsWrapper from './TestsWrapper';
import styles from '../styles/reporter';

class Reporter extends React.Component {
  constructor(props) {
    super(props);

    this.updateEnv = this.updateEnv.bind(this);
    this.updateTeam = this.updateTeam.bind(this);
    this.toggleFailing = this.toggleFailing.bind(this);
    this.searchTag = this.searchTag.bind(this);

    this.state = {
      env: this.props.routeParams.env || 'qa',
      team: this.props.routeParams.team || 'all',
      onlyFailing: false,
      searchTerm: ''
    };
    if (!this.props.routeParams.env) {
      this.props.history.push('/qa');
    }
  }

  updateEnv(event) {
    this.setState({ env: event.target.value });
    let url = `/${event.target.value}/${this.state.team}`;
    if (this.state.team === 'all') {
      url = `/${event.target.value}`;
    }
    this.props.history.push(url);
  }

  updateTeam(event) {
    this.setState({ team: event.target.value });
    let url = `/${this.state.env}/${event.target.value}`;
    if (event.target.value === 'all') {
      url = `/${this.state.env}`;
    }
    this.props.history.push(url);
  }

  toggleFailing() {
    this.setState({ onlyFailing: !this.state.onlyFailing });
  }

  searchTag(event) {
    this.setState({ searchTerm: event.target.value });
  }

  render() {
    const serverOptions = Servers.map((server) => {
      return (<option value={server} key={server}>{server}</option>)
    });
    const teamOptions = Teams.map((team) => {
      return (<option value={team} key={team}>{team}</option>)
    });
    return (
      <div>
        <h1 style={styles.aggroHeader}>Mecha Godzilla Aggregate Report</h1>
        <hr/>
        <p style={styles.description}>Each of the test names below is a link that
          goes to the most recent test run. The tests shown are less than
          14 days old. This page will be updated every time an MG test
          completes. Come back here often tosee what is passing, and what is
          failing.<span style={styles.teamNote}> Teams currently do not filter down,
          despite being able to select them.</span>
        </p>
        <div style={styles.selectDiv}>
          <select style={styles.selectStyle} value={this.state.env} onChange={this.updateEnv}>{serverOptions}</select>
          <select style={styles.selectStyle} value={this.state.team} onChange={this.updateTeam}>{teamOptions}</select>
        </div>
        <div style={styles.selectDiv}>
          <label htmlFor='toggleFailing' style={styles.labelText}>Display only failing tests</label>
          <input id='toggleFailing' style={styles.failingCheckbox} type='checkbox' value={this.state.onlyFailing} onChange={this.toggleFailing} />
        </div>
        <div style={styles.selectDiv}>
          <label htmlFor='searchBar' style={styles.labelText}>Search within displaying tests </label>
          <input id='searchBar' style={styles.searchBar} type='text' value={this.state.searchTerm} placeholder='Tag to search' onChange={this.searchTag} />
        </div>
        <TestsWrapper searchTerm={this.state.searchTerm} onlyFailing={this.state.onlyFailing} env={this.state.env} team={this.state.team}></TestsWrapper>
      </div>
    );
  }
}

export default Reporter;
