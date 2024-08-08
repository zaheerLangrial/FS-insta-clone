import "./App.css";
import CustomToast from "./components/CustomToast";

function App() {
  return (
  
    <div className="childDetail-modal">
      <div className="childDetail-content">
        <div className="childDetail-header">Child Details</div>
        <CustomToast
          variant="success"
          title="Unable to add child"
          message="Your child is older than the assessment age range."
        />
        <div className="child-detail-card">
          <div className="card-container">
            <svg
              width="48"
              height="48"
              viewBox="0 0 48 48"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="24" cy="24" r="24" fill="#E5EBF0" />
              <path
                d="M34.9168 36C34.9168 34.1392 34.9168 33.2089 34.6872 32.4518C34.1701 30.7473 32.8362 29.4134 31.1317 28.8963C30.3746 28.6667 29.4442 28.6667 27.5835 28.6667H20.9168C19.0561 28.6667 18.1257 28.6667 17.3686 28.8963C15.6641 29.4134 14.3302 30.7473 13.8131 32.4518C13.5835 33.2089 13.5835 34.1392 13.5835 36M30.2502 18C30.2502 21.3137 27.5639 24 24.2502 24C20.9365 24 18.2502 21.3137 18.2502 18C18.2502 14.6863 20.9365 12 24.2502 12C27.5639 12 30.2502 14.6863 30.2502 18Z"
                stroke="#002F70"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <h2 className="child-name">Mouna Al Ali</h2>
            <div className="child-age-container">
              <span className="child-age-label">Age:</span>
              <span className="child-age-value">1 month</span>
            </div>
          </div>
        </div>
        <div className="child-model-close">
          <button>Close</button>
        </div>
      </div>
    </div>
  );
}

export default App;
