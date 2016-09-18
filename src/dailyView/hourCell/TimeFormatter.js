/**
 * Object to handle time formatting. Will generate 12hr time strings based
 * off 24 hr times.
 */

function generateFormattedHour(hour) {
  if (hour <= 12) {
    return hour.toString();
  } else {
    return (hour - 12).toString();
  }
}

function generateTimePeriod(hour) {
  if (hour <= 12) {
    return 'am';
  } else {
    return 'pm';
  }
}

export const TimeFormatter = {

  generateHourTime(hour) {
    return {
      hour: generateFormattedHour(hour),
      minutes: '00',
      timePeriod: generateTimePeriod(hour)
    };
  },

  generateHalfHourTime(hour) {
    return {
      hour: generateFormattedHour(hour),
      minutes: '30',
      timePeriod: generateTimePeriod(hour)
    };
  }
}
