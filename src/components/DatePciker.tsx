import React, { useState } from "react";
import DatePicker from "react-datepicker";
import styled from "styled-components";
import "react-datepicker/dist/react-datepicker.css";

import { colors } from "./../styles/theme";

const StyledDatePicker = styled(DatePicker)`
  font-family: "Helvetica Neue", sans-serif;
  border: 1px solid black;
  border-radius: 4px;
  padding: 10px;
  font-size: 16px;
  color: ${colors.text};

  &:focus {
    border-color: ${colors.primary};
    outline: none;
  }

  &:hover {
    cursor: pointer;
  }

  .react-datepicker__header {
    background-color: ${colors.primary};
    border-bottom: none;
  }

  .react-datepicker__current-month,
  .react-datepicker__day-name {
    color: ${colors.background};
  }

  .react-datepicker__day--selected,
  .react-datepicker__day--keyboard-selected {
    background-color: ${colors.primary};
    color: ${colors.background};
  }

  .react-datepicker__day:hover {
    background-color: ${colors.primary};
    color: ${colors.background};
    border-radius: 50%;
    cursor: pointer;
  }
`;

const DatePickerComponent: React.FC = () => {
  const [startDate, setStartDate] = useState<Date | null>(new Date());
  const today = new Date();

  return (
    <StyledDatePicker
      selected={startDate}
      onChange={(date: Date | null) => setStartDate(date)}
      minDate={today} // Set the minimum date to today
    />
  );
};

export default DatePickerComponent;
