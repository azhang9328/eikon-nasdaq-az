import DatePicker from 'components/DatePicker';
import {
  ButtonGroup,
  ButtonToolbar,
  Dropdown,
  DropdownButton,
} from 'react-bootstrap';

interface Props {
  startDate: string;
  handleSetStartDate: (item: string) => void;
  endDate: string;
  handleSetEndDate: (item: string) => void;
  interval: string;
  handleSetInterval: (item: string) => void;
  order: string;
  handleSetOrder: (item: string) => void;
}

function HistogramBottomToolbar({
  startDate,
  handleSetStartDate,
  endDate,
  handleSetEndDate,
  interval,
  handleSetInterval,
  order,
  handleSetOrder,
}: Props) {
  const intervalOptions = ['monthly', 'annual'];
  const orderOptions = ['asc', 'desc'];

  const minYearMonthDate = '1940-01';
  const maxYearMonthDate = () => {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    return `${year}-${month}`;
  };

  return (
    <ButtonToolbar className="histogram-bottom-toolbar">
      <ButtonGroup className="date-selectors">
        <div>
          <span>Start Date</span>
          <DatePicker
            selectedDate={startDate.slice(0, 7)}
            handleSetSelectedDate={handleSetStartDate}
            minDateOption={minYearMonthDate}
            maxDateOption={endDate.slice(0, 7)}
          />
        </div>
        <div>
          <span>End Date</span>
          <DatePicker
            selectedDate={endDate.slice(0, 7)}
            handleSetSelectedDate={handleSetEndDate}
            minDateOption={startDate.slice(0, 7)}
            maxDateOption={maxYearMonthDate()}
          />
        </div>
      </ButtonGroup>
      <ButtonGroup className="additional-selectors">
        <div>
          <span>Interval</span>
          <DropdownButton title={interval}>
            {intervalOptions.map((option) => (
              <Dropdown.Item
                key={option}
                onClick={() => handleSetInterval(option)}
              >
                {option}
              </Dropdown.Item>
            ))}
          </DropdownButton>
        </div>
        <div>
          <span>Order By</span>
          <DropdownButton title={order}>
            {orderOptions.map((option) => (
              <Dropdown.Item
                key={option}
                onClick={() => handleSetOrder(option)}
              >
                {option}
              </Dropdown.Item>
            ))}
          </DropdownButton>
        </div>
      </ButtonGroup>
    </ButtonToolbar>
  );
}

export default HistogramBottomToolbar;
