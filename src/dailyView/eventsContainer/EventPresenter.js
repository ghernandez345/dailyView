/**
 * Responsible for generating the collection of events
 * to render into the UI.
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

function packEvents(eventColumns, viewWidth) {
  const numEventColumns = eventColumns.length;

  for (let i = 0; i < numEventColumns; i++) {
    const col = eventColumns[i];

    for (let j = 0; j < col.length; j++) {
      var bubble = col[j];
      bubble.obj.css('left', (i / numEventColumns) * 100 + '%');
      bubble.obj.css('width', viewWidth / numEventColumns - 1);
    }
  }
}

export const EventPresenter = {

  generateEventPresenterData(events, viewWidth) {
    const prevEventEnd = null;
    const eventColumns = [];
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
      let placed = false;
      for (let i = 0; i < eventColumns.length; i++) {
        let col = eventColumns[i];
        if (!collidesWith(col[col.length-1], event)) {
          col.push(event);
          placed = true;
          break;
        }
      }

      // It was not possible to place the event. Add a new column
      // for the current event group.
      if (!placed) {
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
