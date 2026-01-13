import React, { useState } from "react";
import Home from "./pages/Home";
import ModeratorPage from "./pages/ModeratorPage";

const App: React.FC = () => {
  const [showModerator, setShowModerator] = useState(false);

  const buttonStyle = {
    marginBottom: 20,
    padding: "8px 16px",
    backgroundColor: "#4caf50",
    color: "white",
    border: "none",
    borderRadius: 5,
    cursor: "pointer",
  };

  return (
    <div style={{ maxWidth: 800, margin: "0 auto", padding: 20 }}>
      <button style={buttonStyle} onClick={() => setShowModerator(!showModerator)}>
        {showModerator ? "Back to Posts" : "Moderator View"}
      </button>

      {showModerator ? <ModeratorPage /> : <Home />}
    </div>
  );
};

export default App;
