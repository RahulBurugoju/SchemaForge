import React from "react";

function LoadingScreen() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        fontSize: "20px",
        fontWeight: "600",
      }}
    >
      Checking Authentication...
    </div>
  );
}

export default LoadingScreen;
