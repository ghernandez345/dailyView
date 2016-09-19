/**
 * The container for rendering all events
 */

import * as React from 'react';
import styles from './EventsContainerStyles.css';

function renderEvents(events) {
  console.log(events);
  return events.map((event) => {

  });
}

function EventsContainer(props) {
  return (
    <div className={styles.eventsContainer}>
      {renderEvents(props.events)}
    </div>
  );
}

EventsContainer.propTypes = {
  events: React.PropTypes.array
};

export default EventsContainer;
