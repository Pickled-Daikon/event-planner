import { ERROR_MESSAGES, MAX_NAME_LEN, MAX_DESCRIPTION_LEN } from './constants';

const ALPHA_WC = /^[a-zA-Z]+$/;

/**
 *
 * @param {{name, description, location, date, startTime, endTime}} fieldValues
 */
export default function fieldErrorCheck(fieldValues) {
  // renamed consts since consistent names is causing problems w/ react hooks
  const eName = fieldValues.name;
  const desc = fieldValues.description;
  const eDate = fieldValues.date;
  const tStart = fieldValues.startTime;
  const tEnd = fieldValues.endTime;

  /* ****** no empty fields ****** */
  if (eName === '' || !eName) {
    return ERROR_MESSAGES.NAME_OF_EVENT_IS_EMPTY;
  }
  if (eDate === '' || !eDate) {
    return ERROR_MESSAGES.DATE_IS_EMPTY;
  }
  if (tStart === '' || !tStart) {
    return ERROR_MESSAGES.TIME_START_IS_EMPTY;
  }
  if (tEnd === '' || !tEnd) {
    return ERROR_MESSAGES.TIME_END_IS_EMPTY;
  }

  /* ******* EXCEEDED CHAR LIMIT ******* */
  if (eName.length > MAX_NAME_LEN) {
    return ERROR_MESSAGES.NAME_OF_EVENT_IS_TOO_LONG;
  }
  if (desc.length > MAX_DESCRIPTION_LEN) {
    return ERROR_MESSAGES.DESCRIPTION_IS_TOO_LONG;
  }


  /* ******* TIME END BEFORE TIME START ERROR ******* */
  if (tStart.slice(0, 2) > tEnd.slice(0, 2)) {
    return ERROR_MESSAGES.TIME_END_IS_BEFORE_TIME_START;
  }

  /* ******** CHECKING DATE AND TIME FOR INVALID CHARACTERS ******* */
  if (eDate.match(ALPHA_WC)) {
    return ERROR_MESSAGES.INVALID_DATE_ENTERED;
  }
  if (tStart.match(ALPHA_WC) || tEnd.match(ALPHA_WC)) {
    return ERROR_MESSAGES.INVALID_TIME_ENTERED;
  }
  return null;
}
