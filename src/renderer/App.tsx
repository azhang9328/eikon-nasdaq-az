import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import NavigationBar from 'components/NavigationBar';
import Histogram from 'components/Histogram/Histogram';
import { useCallback, useEffect, useRef, useState } from 'react';
import HistogramBottomToolbar from 'components/Histogram/HistogramBottomToolbar';
import HistogramTopToolbar from 'components/Histogram/HistogramTopToolbar';
import LoadingIndicator from 'components/LoadingSpinner';

export type DataPoint = {
  date: string;
  value: number;
};

function HomePage() {
  const currentDate = () => {
    const date = new Date();

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
  };

  // #region Chart State Storage
  const rawDataStorage = useRef<DataPoint[]>([]);
  const [dataStorage, setDataStorage] = useState<DataPoint[]>([]);
  const [startDate, setStartDate] = useState<string>('1940-01-01');
  const [endDate, setEndDate] = useState<string>(currentDate);
  const [order, setOrder] = useState<string>('asc');
  const [interval, setInterval] = useState<string>('monthly');
  const [clearData, setClearData] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingText, setLoadingText] = useState<string>('Loading...');
  // #endregion

  // #region Fetch initial data

  const fetchApiData = useCallback(() => {
    rawDataStorage.current = [];
    window.nasdaqApi.fetchApiData([startDate, endDate, order, interval]);
  }, [endDate, interval, order, startDate]);

  useEffect(() => {
    setLoadingText('Fetching...');
    setLoading(true);
    fetchApiData();
    setLoading(false);
  }, [fetchApiData]);

  useEffect(() => {
    window.electron.ipcRenderer.on('gotData', (event, arg) => {
      setLoadingText('Loading...');
      setLoading(true);

      const tempRawData: string[] = event.split('\n');
      tempRawData.forEach((data) => {
        const tempData: string[] = data.split(',');

        const dataPoint: DataPoint = {
          date: tempData[0],
          value: Number(tempData[1]),
        };

        if (!Number.isNaN(dataPoint.value)) {
          rawDataStorage.current.push(dataPoint);
        }
      });

      setDataStorage(rawDataStorage.current);

      setLoading(false);
    });
  }, []);
  // #endregion

  // #region Handles
  const handleSetInterval = (intervalOption: string) => {
    setInterval(intervalOption);
  };

  const handleSetStartDate = (newStartDate: string) => {
    const checkStartDate = () => {
      if (newStartDate) {
        return `${newStartDate}-01`;
      }
      return '1940-01-01';
    };
    setStartDate(checkStartDate());
  };

  const handleSetEndDate = (newEndDate: string) => {
    const checkEndDate = () => {
      if (newEndDate) {
        return `${newEndDate}-01`;
      }
      return currentDate;
    };
    setEndDate(checkEndDate());
  };

  const handleSetOrder = (orderOption: string) => {
    setOrder(orderOption);
  };

  const handleSetClearData = (clearDataOption: boolean) => {
    const tempClearDataOption = !clearDataOption;

    if (tempClearDataOption) {
      setDataStorage([]);
    } else {
      setDataStorage(rawDataStorage.current);
    }

    setClearData(tempClearDataOption);
  };
  // #endregion

  return (
    <div>
      <NavigationBar />
      <div className="main-section">
        <HistogramTopToolbar
          clearData={clearData}
          handleSetClearData={handleSetClearData}
        />
        {loading ? (
          <LoadingIndicator loadingText={loadingText} />
        ) : (
          <Histogram dataPoints={dataStorage} />
        )}
        <HistogramBottomToolbar
          startDate={startDate}
          handleSetStartDate={handleSetStartDate}
          endDate={endDate}
          handleSetEndDate={handleSetEndDate}
          interval={interval}
          handleSetInterval={handleSetInterval}
          order={order}
          handleSetOrder={handleSetOrder}
        />
      </div>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>
    </Router>
  );
}
