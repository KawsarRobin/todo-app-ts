import { Button, Input, Text, Textarea } from '@chakra-ui/react';
import { useReducer, useRef } from 'react';
import Todo from './Components/Todo';
const Todos = () => {
  // Interfaces for todos
  interface Todo {
    id: number;
    text: {
      name: string;
      works: string;
    };
  }
  //Action type
  type TodoActionType =
    | {
        type: 'ADD';
        text: {
          name: string;
          works: string;
        };
      }
    | {
        type: 'REMOVE';
        id: number;
      };

  function reducer(state: Todo[], action: TodoActionType) {
    switch (action.type) {
      case 'ADD':
        return [
          ...state,
          {
            id: state.length,
            text: {
              name: action.text.name,
              works: action.text.works,
            },
          },
        ];
      case 'REMOVE':
        return state.filter(({ id }) => id !== action.id);
    }
  }
  const todoNameRef = useRef<HTMLInputElement>(null);
  const todoWorksRef = useRef<HTMLTextAreaElement>(null);
  const addNewTodo = (e: any) => {
    e.preventDefault();
    if (todoNameRef.current && todoWorksRef.current) {
      dispatch({
        type: 'ADD',
        text: {
          name: todoNameRef.current?.value,
          works: todoWorksRef.current?.value,
        },
      });
      todoNameRef.current.value = '';
      todoWorksRef.current.value = '';
    }
  };

  const [todos, dispatch] = useReducer(reducer, []);
  return (
    <div>
      <Text mb={5} fontSize="5xl">
        Todo App (Make Your own worklist){' '}
      </Text>
      <form onSubmit={addNewTodo}>
        <Input
          width="50%"
          mb={5}
          placeholder="Todo Name"
          ref={todoNameRef}
          size="lg"
        />
        <br />
        <Textarea
          width="50%"
          mb={5}
          ref={todoWorksRef}
          placeholder="Write about your todos"
        />{' '}
        <br />
        <Button type="submit" width={200} colorScheme="blue">
          Add Todo
        </Button>
      </form>
      <div>
        {todos.map((todo) => (
          <Todo key={todo.id} todo={todo.text}></Todo>
        ))}
      </div>
    </div>
  );
};

export default Todos;
