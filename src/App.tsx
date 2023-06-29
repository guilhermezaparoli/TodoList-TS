import { Header } from "./components/Header";
import "./global.css";

import { Tasks } from "./components/Tasks";

export function App() {
  return (
    <>
      <div>
        <Header />
        <div>
          <Tasks />
        </div>
      </div>
    </>
  );
}
