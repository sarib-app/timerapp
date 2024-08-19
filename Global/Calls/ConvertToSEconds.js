// utils/formatDuration.js
export const convertSecondsToTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;

    // Pad minutes and seconds with leading zeros if needed
    const minutesStr = minutes.toString().padStart(2, '0');
    const secondsStr = secs.toString().padStart(2, '0');

    return `${minutesStr}:${secondsStr}`;
};
