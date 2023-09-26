import "./LoadingShowPage.css";

const LoadingShowPage = () => {
  return (
    <div className="loading-show-container">
      <div className="loading-show-content">
        <div className="loading-title"></div>

        <div className="loading-subheading">
        </div>

        <div className="loading-photos">
          <div className="loading-main-photo"></div>

          <div className="loading-side-photos">
            <div className="loading-photo top-left"></div>
            <div className="loading-photo top-right"></div>
            <div className="loading-photo bottom-left"></div>
            <div className="loading-photo bottom-right"></div>
          </div>
        </div>

        <div className="loading-content">
          <div className="loading-left">
            <div className="loading-section-header"></div>
            <div className="loading-section-subheader"></div>
          </div>
          <div className="loading-middle">
            <div className="loading-profile-photo"></div>
          </div>

          <div className="loading-right">
            <div className="loading-reserve-top"></div>
            <div className="loading-reseve-bottom"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingShowPage;