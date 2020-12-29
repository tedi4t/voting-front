import React from "react";
import makeTwoDigit from "../../utils/makeTwoDigit";

export default ({ start_date, end_date }) => {
  if (typeof start_date !== Date)
    start_date = new Date(start_date);
  if (!typeof end_date !== Date)
    end_date = new Date(end_date);
  const beginDay = start_date.getDate();
  const endDay = end_date.getDate();
  if (beginDay === endDay) {
    const day = makeTwoDigit(start_date.getDate());
    const month = makeTwoDigit(start_date.getMonth());
    const year = start_date.getFullYear();
    const beginHour = makeTwoDigit(start_date.getHours());
    const beginMinute = makeTwoDigit(start_date.getMinutes());
    const endHour = makeTwoDigit(end_date.getHours());
    const endMinute = makeTwoDigit(end_date.getMinutes());
    return (
      <span>
        {day}.{month}.{year} {beginHour}:{beginMinute} - {endHour}:{endMinute}
      </span>
    )
  }

  const beginMonth = makeTwoDigit(start_date.getMonth());
  const beginYear = start_date.getFullYear();
  const beginHour = makeTwoDigit(start_date.getHours());
  const beginMinute = makeTwoDigit(start_date.getMinutes());
  const endMonth = makeTwoDigit(end_date.getMonth());
  const endYear = end_date.getFullYear();
  const endHour = makeTwoDigit(end_date.getHours());
  const endMinute = makeTwoDigit(end_date.getMinutes());
  return (
    <span>
      {beginDay}.{beginMonth}.{beginYear} {beginHour}:{beginMinute} -&nbsp;
      {endDay}.{endMonth}.{endYear} {endHour}:{endMinute}
    </span>
  )  
}