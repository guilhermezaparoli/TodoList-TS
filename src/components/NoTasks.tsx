import clipboard from "../assets/clipboard.svg";
import styles from "./NoTasks.module.css";

export function NoTasks() {
  return (
    <div className={styles.container}>
      <section className={styles.sectionBox}>
        <img src={clipboard} alt="" />
        <p>Você ainda não tem tarefas cadastradas</p>
        <p>Crie tarefas e organize seus itens a fazer</p>
      </section>
    </div>
  );
}
