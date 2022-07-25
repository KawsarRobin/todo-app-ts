import { Button, Grid, Input, Text, Textarea } from '@chakra-ui/react';
import { useEffect, useReducer, useRef, useState } from 'react';
import Todo from './Todo';
const Todos = () => {
  interface TodoArr {
    name?: string;
    works?: string;
  }
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

  const [allTodosState, SetAllTodosState] = useState<any>([]);

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

  //Add to localStorage
  const addToLS = (key: any, newTodo: {}) => {
    let todoArr: TodoArr[] = [];
    if (!localStorage.getItem(key)) {
      todoArr.push(newTodo);
      localStorage.setItem('todoStore', JSON.stringify(todoArr));
      SetAllTodosState(todoArr);
    } else {
      const AllTodos = JSON.parse(localStorage.getItem(key)!);
      const newTodoArr = [...AllTodos, newTodo];
      localStorage.setItem('todoStore', JSON.stringify(newTodoArr));
      SetAllTodosState(newTodoArr);
    }
  };

  useEffect(() => {
    const AllTodos = JSON.parse(localStorage.getItem('todoStore')!);
    SetAllTodosState(AllTodos);
  }, []);

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
      const newTodo = {
        name: todoNameRef.current.value,
        works: todoWorksRef.current.value,
      };
      addToLS('todoStore', newTodo);
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
          required
        />
        <br />
        <Textarea
          required
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
      <Grid
        mt={10}
        templateColumns={{
          base: 'repeat(1, 1fr)',
          sm: 'repeat(2, 1fr)',
          md: 'repeat(3, 1fr)',
          lg: 'repeat(4, 1fr)',
        }}
        gap={{ base: '5', sm: '5', md: '6', lg: '6' }}
      >
        {allTodosState?.map((todo: any, index: number) => (
          <Todo key={index} todo={todo}></Todo>
        ))}
      </Grid>
    </div>
  );
};

export default Todos;
