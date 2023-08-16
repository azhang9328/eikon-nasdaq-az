import Spinner from 'react-bootstrap/Spinner';

interface Props {
  loadingText: string;
}

function LoadingIndicator({ loadingText }: Props) {
  return (
    <div className="loading-indicator">
      <Spinner />
      <span>{loadingText}</span>
    </div>
  );
}

export default LoadingIndicator;
