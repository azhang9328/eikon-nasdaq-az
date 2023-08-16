import type { DataPoint } from 'renderer/App';
import DataCell from './DataCell';

interface Props {
  data: DataPoint;
  minY: number;
  maxY: number;
  diffBetweenY: number;
}

const dateFormatter = new Intl.DateTimeFormat('en-US', {
  year: 'numeric',
  month: 'short',
});

function DataColumn({ data, minY, maxY, diffBetweenY }: Props) {
  const getNumOfCells = () => {
    const values = [];
    const numOfCell = (maxY - minY) / diffBetweenY;

    // (Current Data) * 100% / (Maximum Y) * (Number of cell in 1 column) / 100%;
    const totalOfColorCell = (((data.value * 100) / maxY) * numOfCell) / 100;
    const numOfFullCell = Math.floor(totalOfColorCell);

    for (let i = 0; i <= numOfCell; i += 1) {
      if (i === 0) {
        values.push(dateFormatter.format(new Date(data.date)));
      } else if (i <= numOfFullCell) {
        values.push(100);
      } else if (i === Math.ceil(totalOfColorCell)) {
        values.push((totalOfColorCell - numOfFullCell) * 100);
      } else {
        values.push(0);
      }
    }

    return values.reverse();
  };

  const getTitle = () => {
    return `${data.date}: ${data.value}`;
  };

  const numOfCells = getNumOfCells();

  return (
    <>
      {numOfCells.map((value, index) => (
        <DataCell
          // eslint-disable-next-line react/no-array-index-key
          key={`${value}-${index}`}
          title={getTitle()}
          value={value}
          isLastCell={index === numOfCells.length - 1}
        />
      ))}
    </>
  );
}

export default DataColumn;
