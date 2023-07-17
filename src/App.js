import "./styles.css";
import PasswordGenerator from "./PasswordGeneratorComp";
export default function App() {
  return (
    <div
      className="App"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <PasswordGenerator />
    </div>
  );
}
