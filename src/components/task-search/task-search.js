import { useTasks } from "../../context/context";

export const TaskSearch = () => {
  const { searchWord, onCheckWord } = useTasks();
  return (
    <input
      type="text"
      placeholder="Начните вводить дело"
      className="search"
      value={searchWord}
      onChange={onCheckWord}
    ></input>
  );
};
