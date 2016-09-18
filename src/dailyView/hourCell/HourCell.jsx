/**
 * An hourly cell component with the times for that cell. Will render
 * a cell for the hour and render the times for that hour.
 */

import * as React from 'react';
import styles from './HourCellStyles.css';

import {TimeFormatter} from './TimeFormatter';

function HourCell(props) {

  const hourTime = TimeFormatter.generateHourTime(props.startTime);
  const halfHourTime = TimeFormatter.generateHalfHourTime(props.startTime);

  return (
    <div className={styles.hourCell}>
      <div className={`${styles.time} ${styles.hourTime}`}>
        <div className={styles.timeDigits}>
          <span>{hourTime.hour}:</span>
          <span className={styles.minutes}>{hourTime.minutes}</span>
        </div>
        <span className={styles.timePeriod}>{hourTime.timePeriod}</span>
      </div>
      <div className={`${styles.time} ${styles.halfHourTime}`}>
        <span>{halfHourTime.hour}:</span>
        <span>{halfHourTime.minutes}</span>
      </div>
      {/* <span></span> */}
    </div>
  );
}

HourCell.propTypes = {
  startTime: React.PropTypes.number
};

export default HourCell;
