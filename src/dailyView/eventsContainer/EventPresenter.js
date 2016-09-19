/**
 * Responsible for generating the collection of events to render into the UI.
 * Consider the events in the UI to be group into columns. An event will try to
 * be in the furthest left column it can be in without a collision. When
 * we do this, we end with a 2D martix of event data, where each event in a
 * group will have the same width and left offset, which is determined by the
 * total number of groups.
 */

/**
 * Sorts events by start and end for simpler processing.
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

function collidesWith(event1, event2) {
  return event1.end > event2.start && event1.start < event2.end;
}

function calculateLeftOffset(eventIndex, numEventColumns) {
  return (eventIndex / numEventColumns) * 100 + '%';
}

function calculateWidth(viewWidth, numEventColumns) {
  return viewWidth / numEventColumns;
}

function packEvents(eventColumns, viewWidth) {
  const numEventColumns = eventColumns.length;

  for (let i = 0; i < numEventColumns; i++) {
    const eventColumn = eventColumns[i];

    for (let j = 0; j < eventColumn.length; j++) {
      var eventBubble = eventColumn[j];
      eventBubble.left = calculateLeftOffset(i, numEventColumns);
      eventBubble.width = calculateWidth(viewWidth, numEventColumns);
    }
  }
}


export const EventPresenter = {

  generateEventPresenterData(events, viewWidth) {
    let prevEventEnd = null;
    let eventColumns = [];

    events = sortEvents(events);

    events.forEach((event, i) => {

      // Check if a new event group needs to be started
      if (prevEventEnd !== null && event.start >= prevEventEnd) {

        // The latest event is later than any of the event in the
        // current group. There is no overlap. Output the current
        // event group and start a new event group.
        packEvents(eventColumns, viewWidth);
        eventColumns = [];  // This starts new event group.
        prevEventEnd = null;
      }

      // Try to place the event inside the existing columns
      let isInserted = false;
      for (let i = 0; i < eventColumns.length; i++) {
        let eventColumn = eventColumns[i];
        if (!collidesWith(eventColumn[eventColumn.length-1], event)) {
          eventColumn.push(event);
          isInserted = true;
          break;
        }
      }

      // It was not possible to place the event. Add a new event group.
      if (!isInserted) {
        eventColumns.push([event]);
      }

      // Remember the latest event end time of the current group.
      // This is later used to determine if a new groups starts.
      if (prevEventEnd === null || event.end > prevEventEnd) {
        prevEventEnd = event.end;
      }
    });

    if (eventColumns.length > 0) {
      packEvents(eventColumns, viewWidth);
    }
  }
};
