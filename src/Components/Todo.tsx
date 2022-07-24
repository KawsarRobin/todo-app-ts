import { Box, Heading, Text } from '@chakra-ui/react';

const Todo = ({
  todo,
}: {
  todo: {
    name: string;
    works: string;
  };
}) => {
  return (
    <Box p={5} shadow="md" borderWidth="1px">
      <Heading fontSize="xl">{todo.name}</Heading>
      <Text mt={4}>{todo.works}</Text>
    </Box>
  );
};

export default Todo;
