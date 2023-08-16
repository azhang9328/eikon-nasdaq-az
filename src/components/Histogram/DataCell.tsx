interface Props {
  title: string;
  value: number | string;
  isLastCell: boolean;
}

function DataCell({ title, value, isLastCell }: Props) {
  if (isLastCell) {
    return (
      <div className="data-cell last-cell">
        <div className="data" title={title}>
          {value}
        </div>
      </div>
    );
  }

  return (
    <div className="data-cell" title={title}>
      <div className="data" style={{ height: value }} />
    </div>
  );
}

export default DataCell;
