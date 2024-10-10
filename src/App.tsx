import "./App.css";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";

export default function App() {
  return (
    <main>
      <div>
        <div>
          <a href="https://vitejs.dev" target="_blank">
            <img src={viteLogo} className="logo" alt="Vite logo" />
          </a>
          <a href="https://react.dev" target="_blank">
            <img src={reactLogo} className="logo react" alt="React logo" />
          </a>
        </div>
        <h1 className="main__title">React Components</h1>
        <p className="main__hint">
          Look into <code>src/components</code> to see all components.
        </p>
      </div>
    </main>
  );
}
