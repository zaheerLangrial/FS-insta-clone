import React from "react";

const AddPdfModal = () => {
  return (
    <>
    <div className="assessment-mainContainer">
      <div className="assessment-modal-container">
        <div className="assessment-modal-header">24 - 29 months Assessment Report</div>
        <div className="assessment-pdf">
          <img src="public/pdf-icon.svg" alt="Pdf icon" />
        </div>

        <div className="assessment-btns">
            <button className="blue-variant">
                Download
            </button>
            <button className="transparent-variant">
                Close
            </button>
        </div>
      </div>
    </div>
    </>
  );
};

export default AddPdfModal;
