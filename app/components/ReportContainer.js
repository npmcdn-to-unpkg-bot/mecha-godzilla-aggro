import React from 'react';
import styles from '../styles/reportContainer';

class ReportContainer extends React.Component {

  render() {
    return (
      <div style={styles.tagContainerStyle}>
        <p>{this.props.titles.join(', ').replace(/\s,/gi, ',')}</p>
      </div>
    );
  }
}

export default ReportContainer
