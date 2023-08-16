import type { DataPoint } from 'renderer/App';
import LeftUnitColumn from './LeftUnitColumn';
import DataColumn from './DataColumn';

interface Props {
  dataPoints: DataPoint[];
}

const minY = 0;
const maxY = 300;
const diffBetweenY = 50;

function Histogram({ dataPoints }: Props) {
  const getLeftColumnValue = () => {
    let values = [];

    for (let i = 0; i <= maxY; i += diffBetweenY) {
      values.push(i);
    }

    if (dataPoints.length === 0) {
      values = [];
    }

    return values.reverse();
  };

  const getNumOfDataColumns = () => {
    const dataColumn = [];

    for (let i = 0; i < dataPoints.length; i += 1) {
      dataColumn.push(dataPoints[i]);
    }

    return dataColumn;
  };

  return (
    <>
      <div className="graph-heading">NASDAQ Inflation Rate</div>
      <div className="graph-section">
        <div className="graph">
          <LeftUnitColumn values={getLeftColumnValue()} />
          {getNumOfDataColumns().map((data, i) => (
            <DataColumn
              // eslint-disable-next-line react/no-array-index-key
              key={`${data.date}-${i}`}
              data={data}
              minY={minY}
              maxY={maxY}
              diffBetweenY={diffBetweenY}
            />
          ))}
        </div>
      </div>
    </>
  );
}

export default Histogram;
