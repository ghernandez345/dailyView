/**
 * Responsible for generating the collection of events to render into the UI.
 * Consider the events in the UI to be rendered into columns. An event will try
 * to be in the furthest left column group it can be in without a collision.
 * When we do this, we end with sets of 2D martix event data, where
 * each event in it's respective group will have the same width and left offset.
 * That offset and width is determined by the total number of groups.
 *
 * example 2D matix data:
 *
 *    [[event1, event2], [event3]]

 *    - event1 and event2 will have the same left offset and width.
 *    - event 3 will have a a differnt offset and witdh, considering it is
 *      a differnt event group.
 *    - all events offset and widths is determined by which event group it is in
 *      and how many event groups there are.
 *
 * NOTE: used this handy algorithm as guidence.
 * http://stackoverflow.com/questions/11311410/visualization-of-calendar-events-algorithm-to-layout-events-with-maximum-width
 */

/**
 * Utiltiy to sorts events by start and end for simpler processing.
 */
function sortEvents(events) {
  return events.sort((event1, event2) => {
    if (event1.start < event2.start) return -1;
    if (event1.start > event2.start) return 1;
    if (event1.end < event2.end) return -1;
    if (event1.end > event2.end) return 1;
    return 0;
  });
}

/**
 * Utility to see if two events collide.
 */
function collidesWith(event1, event2) {
  return event1.end > event2.start && event1.start < event2.end;
}

function calculateEventLeftOffset(eventIndex, numEventColumns) {
  return (eventIndex / numEventColumns) * 100 + '%';
}

function calculateEventWidth(viewWidth, numEventColumns) {
  return viewWidth / numEventColumns;
}

export const EventPresenter = {

  prevEventEnd: null,

  generateEventPresenterData(events, viewWidth) {
    let eventGroups = [];

    events = sortEvents(events);

    events.forEach((event, i) => {

      // Check if events needs updating and a new event needs to be created
      if (this.prevEventEnd !== null && event.start >= this.prevEventEnd) {
        this.updateEventPresentationData(eventGroups, viewWidth);
        eventGroups = [];  // Start new event group.
        this.prevEventEnd = null;
      }

      // Try to place the event inside an existing group.
      const isInserted = this.insertEventInExistingGroup(event, eventGroups);

      // It was not possible to place the event. Add a new event group.
      if (!isInserted) {
        eventGroups.push([event]);
      }

      // Remember the latest event end time of the current group.
      // This is later used to determine if a new groups starts.
      if (this.prevEventEnd === null || event.end > this.prevEventEnd) {
        this.prevEventEnd = event.end;
      }
    });

    // Final updating of remaining events in the event groups.
    if (eventGroups.length > 0) {
      this.updateEventPresentationData(eventGroups, viewWidth);
    }
  },

  /**
   * Tries to place the event in a group which it doesn't collide with
   * that groups last event.
   *
   * NOTE: we use a traditional for loop here to be able to break out as soon as
   * we've placed the event, and return a boolean value that lets us know if
   * it was inserted or not.
   */
  insertEventInExistingGroup(event, eventGroups) {
    for (let i = 0; i < eventGroups.length; i++) {
      let eventGroup = eventGroups[i];
      const lastEventInGroup = eventGroup[eventGroup.length - 1];

      if (!collidesWith(lastEventInGroup, event)) {
        eventGroup.push(event);
        return true;
      }
    }
    return false;
  },

  updateEventPresentationData(eventGroups, viewWidth) {
    const numEventGroups = eventGroups.length;
    this.updateAllEventGroups(eventGroups, numEventGroups, viewWidth);
  },

  updateAllEventGroups(eventGroups, numEventGroups, viewWidth) {
    eventGroups.forEach((eventGroup, eventGroupIndex) => {
      this.updateAllEventsInGroup(eventGroup, eventGroupIndex, numEventGroups, viewWidth);
    }, this);
  },

  updateAllEventsInGroup(eventGroup, eventGroupIndex, numEventGroups, viewWidth) {
    eventGroup.forEach((event) => {
      this.updateEvent(event, eventGroupIndex, numEventGroups, viewWidth);
    }, this);
  },

  updateEvent(event, eventGroupIndex, numEventGroups, viewWidth) {
    event.left = calculateEventLeftOffset(eventGroupIndex, numEventGroups);
    event.width = calculateEventWidth(viewWidth, numEventGroups);
  }
};
