function secondsToMinutesAndSeconds(seconds) {
  // Calculate the minutes and seconds
  let minutes = Math.floor(seconds / 60);
  let remainingSeconds = seconds % 60;

  // Add leading zeros if necessary
  let formattedMinutes;

  if (minutes < 10) {
    formattedMinutes = "0" + minutes;
  } else {
    formattedMinutes = minutes;
  }

  let formattedSeconds;
  if (remainingSeconds < 10) {
    formattedSeconds = "0" + remainingSeconds;
  } else {
    formattedSeconds = remainingSeconds;
  }

  // Combine minutes and seconds with a colon
  let formattedTime = formattedMinutes + ":" + formattedSeconds;

  return formattedTime;
}

export { secondsToMinutesAndSeconds };
