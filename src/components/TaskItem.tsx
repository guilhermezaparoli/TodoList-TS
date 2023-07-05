import styles from "./TaskItem.module.css";
import trash from "../assets/trash.svg";
import unchecked from "../assets/unchecked.svg";
import checked from "../assets/checked.svg";

import { useState } from "react";
import { Task } from "./Tasks";

interface TaskItemProps {
  task: Task;
  onDeleteTask: (id: number) => void;
  onCompleteTask: (id: number) => void;
}

export function TaskItem({
  task,
  onDeleteTask,
  onCompleteTask,
}: TaskItemProps) {
  const [checkboxStatus, setCheckboxStatus] = useState(task.isComplete);

  function completeTask() {
    onCompleteTask(task.id);
    handleCheckbox();
  }

  function deleteTask() {
    onDeleteTask(task.id);
  }

  function handleCheckbox() {
    setCheckboxStatus(!task.isComplete);
  }

  return (
    <>
      <div className={styles.container}>
        <div className={checkboxStatus ? styles.noBorder : styles.content}>
          <img
            className={styles.iconClass}
            onClick={() => {
              handleCheckbox();
              completeTask();
            }}
            src={checkboxStatus ? checked : unchecked}
          />
          <p
            className={checkboxStatus ? styles.textThrough : styles.textNormal}
          >
            {task.title}
          </p>
          <img
            className={styles.iconClass}
            src={trash}
            alt="icone de lixo"
            onClick={deleteTask}
          />
        </div>
      </div>
    </>
  );
}
