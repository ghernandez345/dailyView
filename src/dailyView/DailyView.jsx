/**
 * The daily view container component. Will render the daily view
 * and an event container in the view.
 */

import * as React from 'react';

import HourCell from './hourCell/HourCell';
import EventsContainer from './eventsContainer/EventsContainer';

function renderHourCells(startTime, hours) {
  const hourCells = [];

  for (let i = 0; i <= hours; i++) {
    const start = startTime * i;
    hourCells.push(<HourCell
      key={i}
      startTime={startTime + i}
    />);
  }
  return hourCells;
}

function DailyView(props) {

  // NOTE: These could be passed into props later if we needed
  // the calendar view to have a dynamic time frame.
  const startTime = 9;
  const hours = 11;

  return (
    <div>
      {renderHourCells(startTime, hours)}
    </div>
  );
}

DailyView.propTypes = {
  events: React.PropTypes.array
};

export default DailyView;
