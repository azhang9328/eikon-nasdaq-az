import trashIcon from '../../../assets/icons/trash_icon_small.svg';
import refreshIcon from '../../../assets/icons/refresh_icon_small.svg';

interface Props {
  clearData: boolean;
  handleSetClearData: (item: boolean) => void;
}

function HistogramTopToolbar({ clearData, handleSetClearData }: Props) {
  return (
    <button
      className="histogram-clear-button"
      type="button"
      onClick={() => handleSetClearData(clearData)}
    >
      <img
        src={clearData ? refreshIcon : trashIcon}
        alt={clearData ? 'Refresh Icon' : 'Trash Icon'}
      />
      <span>{clearData ? 'Refresh' : 'Clear'}</span>
    </button>
  );
}

export default HistogramTopToolbar;
