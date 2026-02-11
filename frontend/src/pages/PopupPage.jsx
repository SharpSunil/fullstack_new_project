import React, { useState, useRef } from "react";
import "./Popup.scss";

const PopupPage = () => {
  const [position, setPosition] = useState(null);
  const [showWarning, setShowWarning] = useState(false);
  const [trackingTime, setTrackingTime] = useState(0);

  const boxRef = useRef(null);
  const noBtnRef = useRef(null);
  const intervalRef = useRef(null);

  const startTracking = () => {
    if (!intervalRef.current) {
      intervalRef.current = setInterval(() => {
        setTrackingTime((prev) => {
          const newTime = prev + 1;

          if (newTime >= 10) {
            setShowWarning(true);
            clearInterval(intervalRef.current);
            intervalRef.current = null;
          }

          return newTime;
        });
      }, 1000);
    }
  };

  const moveButton = () => {
    startTracking();

    const box = boxRef.current;
    const btn = noBtnRef.current;

    if (box && btn) {
      const boxRect = box.getBoundingClientRect();
      const btnRect = btn.getBoundingClientRect();

      const maxX = boxRect.width - btnRect.width;
      const maxY = boxRect.height - btnRect.height;

      const randomX = Math.random() * maxX;
      const randomY = Math.random() * maxY;

      setPosition({
        left: randomX,
        top: randomY,
      });
    }
  };

  return (
    <div className="popup-parent">
      <div className="popup-cont">
        <div className="content-box" ref={boxRef}>

          {!showWarning ? (
            <>
              <h2>Popup Heading</h2>
              <p>Try to click NO 😏</p>

              <div className="btn-group">
                <button className="btn yes-btn">YES</button>

                <button
                  ref={noBtnRef}
                  className="btn no-btn"
                  onMouseEnter={moveButton}
                  style={
                    position
                      ? {
                        position: "absolute",
                        left: position.left,
                        top: position.top,
                        zIndex: 10,
                      }
                      : {}
                  }
                >
                  NO
                </button>
              </div>
            </>
          ) : (
            <>
              <div className="final-warning">
                <h2>Goli Mar Dunga 🔫</h2>
                <p>Ache se Bata raha YES click kr le 😈</p>
              </div>

              <button className="btn yes-btn big-yes">YES</button>
            </>
          )}

        </div>
      </div>
    </div>
  );
};

export default PopupPage;
