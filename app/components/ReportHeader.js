import React from 'react';
import styles from '../styles/reportHeader';

class ReportHeader extends React.Component {

  constructor(props) {
    super(props);
    this.update = this.update.bind(this);
  }

  update() {
    this.props.onToggleDisplay(!this.props.showing);
  }

  render() {
    styles.headerLinkStyle.color = this.props.passed ? '#3c763d' : '#a94442';

    const badge = this.props.passed ?
      <p style={styles.successBadge}>Success</p> :
      <p style={styles.failedBadge}>Failures: {this.props.test.mgReporterObj.results.stats.failures}</p>

    const showTagDisplay = this.props.showing ? "hide tags" : "show tags";

    return (
      <div style={styles.headerStyle}>
        <a target='_blank' style={styles.headerLinkStyle} href={this.props.test.link}>
          {this.props.test.jobName} - [{this.props.test.timestamp}]
        </a>
        <a style={styles.toggleLink} onClick={this.update}>[{showTagDisplay}]</a>
        {badge}
      </div>
    )
  }
}

export default ReportHeader;
