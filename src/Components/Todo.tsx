import { Box, Button, Heading, Text } from '@chakra-ui/react';

const Todo = ({
  todo,
  removeTodo,
}: {
  todo: {
    name: string;
    works: string;
    id: number;
  };
  removeTodo: Function;
}) => {
  return (
    <Box p={5} shadow="md" borderWidth="1px">
      <Heading fontSize="xl">{todo.name}</Heading>
      <Text mt={4}>{todo.works}</Text> <br />
      <Button
        onClick={() => removeTodo('Remove', todo.id)}
        type="submit"
        colorScheme="red"
      >
        Remove Todo
      </Button>
    </Box>
  );
};

export default Todo;
