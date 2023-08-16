import React, { useRef } from 'react';

interface Props {
  selectedDate: string;
  handleSetSelectedDate: (item: string) => void;
  minDateOption: string;
  maxDateOption: string;
}

function DatePicker({
  selectedDate,
  handleSetSelectedDate,
  minDateOption,
  maxDateOption,
}: Props) {
  const dateInputRef = useRef(null);

  const handleChange = (e) => {
    handleSetSelectedDate(e.target.value);
  };

  return (
    <input
      type="month"
      onChange={handleChange}
      ref={dateInputRef}
      min={minDateOption}
      max={maxDateOption}
      value={selectedDate.slice(0, 7)}
    />
  );
}

export default DatePicker;
