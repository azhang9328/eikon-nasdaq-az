interface Props {
  values: number[];
}

function LeftUnitColumn({ values }: Props) {
  return (
    <>
      {values.map((value) => {
        return (
          <div key={value} className="left-unit-cell">
            {value}
          </div>
        );
      })}
    </>
  );
}

export default LeftUnitColumn;
