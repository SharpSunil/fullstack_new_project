import MovingNoButton from "../components/MovingNoButton";

export default function PopupPage() {
  return (
    <div style={{ padding: 40 }}>
      <div
        style={{
          width: 320,
          padding: 20,
          border: "1px solid #ccc",
          position: "relative",
        }}
      >
        <h3>Dummy Popup</h3>
        <p>Do you want to continue?</p>

        <button onClick={() => alert("YES clicked")}>
          YES
        </button>

        <MovingNoButton />
      </div>
    </div>
  );
}
