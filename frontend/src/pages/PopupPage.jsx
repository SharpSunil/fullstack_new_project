import React, { useRef, useEffect, useState } from "react";
import "./Popup.scss";
import { useNavigate } from "react-router-dom";

const PopupPage = () => {
  const noBtnRef = useRef(null);
  const containerRef = useRef(null);
  const navigate = useNavigate();

  const [timeUp, setTimeUp] = useState(false);

  // 🔥 Move NO button
  const moveButton = () => {
    if (timeUp) return; // stop moving after timeout

    const btn = noBtnRef.current;
    const container = containerRef.current;

    const containerRect = container.getBoundingClientRect();
    const btnRect = btn.getBoundingClientRect();

    const maxX = containerRect.width - btnRect.width;
    const maxY = containerRect.height - btnRect.height;

    const randomX = Math.floor(Math.random() * maxX);
    const randomY = Math.floor(Math.random() * maxY);

    btn.style.left = `${randomX}px`;
    btn.style.top = `${randomY}px`;

    btn.style.bottom = "auto";
    btn.style.right = "auto";
  };

  // 🔥 10 second timer
  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeUp(true);
    }, 10000);

    return () => clearTimeout(timer);
  }, []);

  const handleYesClick = () => {
    navigate("/popup");
  };

  return (
    <div className="popup-parent">
      <div className="popup-cont" ref={containerRef}>
        <div className="heading-box">

          {!timeUp ? (
            <>
              <h1 className="heading">Popup Page</h1>
              <p>This is a sample popup page content.</p>

              <div className="button-group">
                <button className="btn" onClick={handleYesClick}>
                  Yes
                </button>
                <button className="btn new-no">NO</button>
              </div>

              <button
                ref={noBtnRef}
                onMouseEnter={moveButton}
                className="btn new-button"
              >
                NO
              </button>
            </>
          ) : (
            <>
              <h1 className="heading danger-text">
                Goli mar dunga 😡
              </h1>
              <p className="danger-subtext">
                Ache se bata raha yes button click karle
              </p>

              <button className="btn big-yes" onClick={handleYesClick}>
                YES
              </button>
            </>
          )}

        </div>
      </div>
    </div>
  );
};

export default PopupPage;
