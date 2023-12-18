export const calculateElapsedTime = (date) => {
  const seconds = Math.floor((new Date() - new Date(date)) / 1000);

  let displayTime = '';

  if (seconds < 60 * 60) {
    const minutes = Math.floor(seconds / 60);
    displayTime = `${minutes} ${makePluralWords(minutes, 'minute')} ago`;
  } else if (seconds < 60 * 60 * 24) {
    const hours = Math.floor(seconds / (60 * 60));
    displayTime = `${hours} ${makePluralWords(hours, 'hour')} ago`;
  } else if (seconds < 60 * 60 * 24 * 30) {
    const days = Math.floor(seconds / (60 * 60 * 24));
    displayTime = `${days} ${makePluralWords(days, 'day')} ago`;
  } else if (seconds < 60 * 60 * 24 * 30 * 12) {
    const months = Math.floor(seconds / (60 * 60 * 24 * 30));
    displayTime = `${months} ${makePluralWords(months, 'hour')} ago`;
  } else {
    const years = Math.floor(seconds / (60 * 60 * 24 * 30 * 12));
    displayTime = `${years} ${makePluralWords(years, 'year')} ago`;
  }

  return displayTime;
};

export const makePluralWords = (value, word) => (value > 1 ? word + 's' : word);
