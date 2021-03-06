/**
 * Main app entry point.
 */

import * as React from 'react';
import {render} from 'react-dom';
import styles from './mainStyles.css';

import {mockData} from './mockData';

import DailyView from './dailyView/DailyView';

function layOutDay(events) {

  render(
    <DailyView events={events} />,
    document.getElementById('app-container')
  );
}

export default window.layOutDay = layOutDay;
window.layOutDay(mockData);
