import React from "react";
import dateDecoder from "../../utils/dateDecoder";

const startEndDate = ({ start_date, end_date }) => {
  let startDateDecoded = dateDecoder(start_date);
  let endDateDecoded = dateDecoder(end_date);

  const { 
    day: startDay, 
    month: startMonth, 
    year: startYear, 
    hour: startHour, 
    minute: startMinute 
  } = startDateDecoded;
  const { 
    day: endDay, 
    month: endMonth, 
    year: endYear, 
    hour: endHour, 
    minute: endMinute 
  } = endDateDecoded;

  if (
      startDay === endDay && 
      startMonth === endMonth &&
      startYear === endYear
  ) {
    return (
      <span>
        {startDay}.{startMonth}.{startYear} {startHour}:{startMinute} - {endHour}:{endMinute}
      </span>
    )
  }

  return (
    <span>
      {startDay}.{startMonth}.{startYear} {startHour}:{startMinute} -&nbsp;
      {endDay}.{endMonth}.{endYear} {endHour}:{endMinute}
    </span>
  )  
}

export default startEndDate;