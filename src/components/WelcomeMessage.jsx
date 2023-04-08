import { Button } from "react-bootstrap";
import { FiArrowRight } from "react-icons/fi";

const WelcomeMessage = () => {
  return (
    <div className="info-box p-4">
      <h3 className="me-3">Welcome to Minimal Wheater App!</h3>
      <p className="mt-3">
        What's the weather like today? Search for your city and get reliable weather info in a simple way. Enjoy the
        weather! 🌞
      </p>
      <div className="d-flex justify-content-center" style={{ height: "53px" }}>
        <Button variant="white rounded-circle bg-info">
          <FiArrowRight className="fs-2 text-light align-self-center" />
        </Button>
      </div>
    </div>
  );
};

export default WelcomeMessage;
