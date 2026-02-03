import { useState } from "react";

export default function MovingNoButton() {
  const [pos, setPos] = useState({ top: 0, left: 100 });

  const move = () => {
    setPos({
      top: Math.random() * 150,
      left: Math.random() * 150,
    });
  };

  return (
    <button
      onMouseEnter={move}
      style={{
        position: "absolute",
        top: pos.top,
        left: pos.left,
      }}
    >
      NO
    </button>
  );
}
