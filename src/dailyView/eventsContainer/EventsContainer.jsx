/**
 * The container for rendering all events
 */

import * as React from 'react';
import styles from './EventsContainerStyles.css';

import {EventPresenter} from './EventPresenter';

import EventBubble from './eventBubble/EventBubble';

const VIEW_WIDTH = 600;

function renderEvents(events) {
  console.log(events);
  return events.map((event, i) => {
    return (
      <EventBubble key={i} event={event} />
    );
  });
}

function EventsContainer(props) {

  const events = EventPresenter.generateEventPresenterData(props.events, VIEW_WIDTH);

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
