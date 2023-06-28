import styles from "./Header.module.css";

import rocket from "../assets/rocket.svg";
import logo from "../assets/todo-logo.svg";

export function Header() {
  return (
    <header className={styles.header}>
      <img src={rocket} alt="" />
      <img src={logo} alt="" />
    </header>
  );
}
