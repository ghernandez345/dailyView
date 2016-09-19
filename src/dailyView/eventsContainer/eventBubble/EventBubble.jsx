/**
 * A event bubble component.
 */

import * as React from 'react';
import styles from './EventBubbleStyles.css';

/**
 * Generate the styles dynamically for each event bubble component. This allows
 * is to edit the styles, and keep the spacing for events correct in the
 * event container display.
 */
function generateStyles(event) {
  const calculatedHeight = event.end - event.start;
  const borderWidth = 5;
  const paddingLeft = 15;

  return {
    top: `${event.start}px`,
    left: event.left,
    width: `${event.width - borderWidth - paddingLeft}px`,
    height: `${calculatedHeight}px`,
    borderLeftWidth: `${borderWidth}px`,
    paddingLeft: `${paddingLeft}px`
  };
}

function EventBubble(props) {
  const {event} = props;
  return (
    <div style={generateStyles(event)} className={styles.eventBubble}>
      <span className={styles.eventTitle}>Sample Item</span>
      <span className={styles.eventLocation}>Sample Location</span>
    </div>
  );
}

EventBubble.propTypes = {
  event: React.PropTypes.object
}

export default EventBubble;
