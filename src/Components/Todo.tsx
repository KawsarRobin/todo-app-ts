const Todo = ({
  todo,
}: {
  todo: {
    name: string;
    works: string;
  };
}) => {
  return <div>{todo.name}</div>;
};

export default Todo;
