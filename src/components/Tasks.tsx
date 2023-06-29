import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import styles from "./Tasks.module.css";
import { PlusCircle } from "phosphor-react";

import { TaskItem } from "./TaskItem";
import { NoTasks } from "./NoTasks";

export interface Task {
  id: number;
  title: string;
  isComplete: boolean;
}

export function Tasks() {
  const [tasks, setTasks] = useState<Task[]>([]);

  const [newTaskText, setNewTaskText] = useState("");
  const [hasError, setHasError] = useState(false);

  const [condition, setCondition] = useState(false);

  useEffect(() => {
    const data = window.localStorage.getItem("MY_TODO_TASKS");
    const json = data && JSON.parse(data);
    console.log(data);
    if (data?.length) setTasks(json);
  }, []);

  useEffect(() => {
    if (condition)
      window.localStorage.setItem("MY_TODO_TASKS", JSON.stringify(tasks));
  }, [tasks]);

  function handleNewTask(e: FormEvent) {
    setCondition(true);
    e.preventDefault();
    if (!newTaskText) {
      setHasError(true);
      return;
    }
    setHasError(false);
    setTasks([
      ...tasks,
      {
        id: tasks.length ? tasks[tasks.length - 1].id + 1 : 1,
        title: newTaskText,
        isComplete: false,
      },
    ]);
    setNewTaskText("");
  }

  function handleOnChange(e: ChangeEvent<HTMLInputElement>) {
    setNewTaskText(e.target.value);
  }

  function handleDeleteTask(id: number) {
    setCondition(true);
    const tasksWithoutDeleteOne = tasks.filter((task) => {
      return id !== task.id;
    });

    setTasks(tasksWithoutDeleteOne);
  }

  function handleCompleteTask(id: number) {
    setCondition(true);
    const newList: any = tasks.map((task) => {
      if (task.id === id) {
        const updateTask = {
          ...task,
          isComplete: !task.isComplete,
        };
        return updateTask;
      }

      return task;
    });
    setTasks(newList);
  }

  const arrCompleteTasks = tasks.filter((task) => {
    return task.isComplete === true;
  }).length;

  return (
    <div>
      <form className={styles.container} onSubmit={handleNewTask}>
        <input
          className={`${
            hasError ? styles.borderErrorInputTask : styles.inputTask
          }`}
          type="text"
          placeholder="Adicione uma nova tarefa"
          onChange={handleOnChange}
          value={newTaskText}
        />
        <div>
          <button type="submit">
            Criar <PlusCircle weight="bold" />
          </button>
        </div>
        {hasError && (
          <p className={styles.hasError}>
            Por favor, insira um título para sua tarefa.
          </p>
        )}
      </form>

      <main className={styles.sectionBox}>
        <div className={styles.content}>
          <div>
            <p className={styles.textBlue}>Tarefas criadas</p>
            <span className={styles.countTasks}>{tasks.length}</span>
          </div>

          <div>
            <p className={styles.textPurple}>Concluídas</p>
            <span className={styles.countTasks}>{arrCompleteTasks}</span>
          </div>
        </div>
      </main>
      {tasks.length === 0 ? (
        <NoTasks />
      ) : (
        tasks.map((task) => {
          return (
            <TaskItem
              task={task}
              key={task.id}
              onDeleteTask={handleDeleteTask}
              onCompleteTask={handleCompleteTask}
            />
          );
        })
      )}
    </div>
  );
}
