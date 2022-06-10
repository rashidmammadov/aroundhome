/**
 * @description Returns name of a weekday in English.
 * @param time Given time data as ISO 8601 (2018-07-09T08:00:00.000+02:00).
 * @returns {string} Long name of the weekday (Monday, Tuesday, ...).
 */
export const getWeekDayName = (time) => {
    return new Date(time).toLocaleDateString('en', { weekday: 'long' });
};

/**
 * @description Returns time in milliseconds.
 * @param time Given time data as ISO 8601 (2018-07-09T08:00:00.000+02:00).
 * @returns {number} Milliseconds (1654851183475).
 */
export const getTime = (time) => new Date(time).getTime();

/**
 * @description Returns hour of the given time.
 * @param time Given time data as ISO 8601 (2018-07-09T08:00:00.000+02:00).
 * @returns {number} Hours (13)
 */
export const getHours = (time) => new Date(time).getHours();

/**
 * @description Returns minute of the given time.
 * @param time Given time data as ISO 8601 (2018-07-09T08:00:00.000+02:00).
 * @returns {number} Minutes (30)
 */
export const getMinutes = (time) => new Date(time).getMinutes();

/**
 * @description Converts value to the 2 digits format if less than 10.
 * @param value Hours or minutes.
 * @returns {string | number} Hours/Minutes (08, 00).
 */
export const roll2Digits = (value) => value < 10 ? `0${value}` : value;

/**
 * @description Sorts slots ara increasing.
 * @param slots Array of the available time slots.
 */
export const sortByDate = (slots) => slots.sort((a, b) => getTime(a.start_time) - getTime(b.start_time));

/**
 * @description Converts ISO 8601 time to the readable format.
 * @param time Given time data as ISO 8601 (2018-07-09T08:00:00.000+02:00).
 * @returns {string} Readable time (08:00)
 */
export const getReadableTime = (time) => {
    return roll2Digits(getHours(time)) + ':' + roll2Digits(getMinutes(time));
};

/**
 * @description Returns human-readable time ranges with or without weekday names.
 * @param slot Holds the start_time and end_time as a slot.
 * @param showDay Boolean value for checking if weekday name will be added.
 * @returns {string} 3 possible output types (Monday, 08:00 - 09:30 | 08:00 - 09:30 | --.--).
 */
export const convertReadableTimeRange = (slot, showDay = false) => {
    return slot ?
        (showDay ? getWeekDayName(slot.start_time) + ', ' : '') +
        getReadableTime(slot.start_time) + ' - ' + getReadableTime(slot.end_time)
         :
        '--:--';
}

/**
 * @description Groups the slots by weekday name.
 * @param slots Holds all available slots.
 * @returns {*} Example output: {
 *     "Monday": {
 *       "start_time": "2018-07-09T08:00:00.000+02:00",
 *        "end_time": "2018-07-09T09:30:00.000+02:00"
 *     },
 *     ...
 * }
 */
export const groupByWeeDayName = (slots) => {
    const sortedSlots = sortByDate(slots);
    return sortedSlots.reduce((group, slot) => {
        const day = getWeekDayName(slot.start_time);
        group[day] = group[day] ?? [];
        group[day].push(slot);
        return group;
    }, {});
};