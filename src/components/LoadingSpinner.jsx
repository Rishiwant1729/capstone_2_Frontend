const LoadingSpinner = ({ label = "Loading..." }) => (
  <div className="spinner">
    <span className="spinner__circle" aria-hidden="true" />
    <span>{label}</span>
  </div>
);

export default LoadingSpinner;

