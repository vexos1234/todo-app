import { Box, Button, Center, Checkbox, Flex, Heading, Input, Spacer, Stack } from "@chakra-ui/react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverArrow,
  PopoverCloseButton,
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import "./styles.css";
import { useForm, SubmitHandler } from "react-hook-form";
import axios from "axios";
import { DevTool } from "@hookform/devtools";
import { useQuery } from "@tanstack/react-query";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from '@chakra-ui/react'
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { RiDeleteBin5Line } from 'react-icons/ri'

function Form() {
  const queryClient = useQueryClient();
  const { register, control, handleSubmit, reset } = useForm();

  const request = useQuery(["FetchProduct"], () =>
    axios.get("https://64b8141d21b9aa6eb07987de.mockapi.io/task")
  );

  const createTask = useMutation((data) =>
    axios.post("https://64b8141d21b9aa6eb07987de.mockapi.io/task", data), {
    onSuccess: () => queryClient.invalidateQueries('FetchProduct')
  }
  );

  const deletePost = useMutation((id) =>
    axios.delete(`https://64b8141d21b9aa6eb07987de.mockapi.io/task/${id}`), {
    onSuccess: () => queryClient.invalidateQueries('FetchProduct')

  });

  const onSubmit = async (data) => {
    const response = await createTask.mutateAsync(data);
    console.log(response);
    reset();
  };



  const tasks = request.data?.data;
  console.log(tasks);
  if (tasks === undefined) return null;

  return (
    <div className="centered-box">
      {/* add tasks */}
      <Box className="box">
        <Center>
          <Heading>To Do List</Heading>
        </Center>
        <Flex>
          <Spacer />
          <Popover >
            <PopoverTrigger>
              <Button>+</Button>
            </PopoverTrigger>
            <PopoverContent>
              <PopoverArrow />
              <PopoverCloseButton />
              <PopoverHeader>Write A Task For Today!</PopoverHeader>
              <PopoverBody>
                <form className="form">
                  <Input
                    type="task"
                    placeholder="What you want to do?"
                    {...register("name")}></Input>
                  <Input
                    type="datetime-local"
                    placeholder="When?"
                    {...register("date")}></Input>
                  <Input
                    type="text"
                    placeholder="Describe (optional)"
                    {...register("description")}></Input>
                  <Button type="submit" placeholder="submit" onClick={handleSubmit(onSubmit)} style={{ marginTop: 5 }}>ADD</Button>
                </form>
              </PopoverBody>
            </PopoverContent>
          </Popover>
        </Flex>


        <DevTool control={control} />
        {/* table */}

        <TableContainer>
          <Table variant='simple'>
            <TableCaption>You can do wathever you want with persistance</TableCaption>
            <Thead>
              <Tr>
                <Th></Th>
                <Th>Tasks</Th>
                <Th>Date</Th>
                <Th>Completed</Th>
              </Tr>
            </Thead>
            <Tbody>
              <Box
                overflowX="auto"
                maxW="100vw"
                h="100%"
                whiteSpace="nowrap"
                pb="17px"
                color="white"
                px="32px"
                sx={
                  {
                    '::-webkit-scrollbar': {
                      display: 'none'
                    }
                  }
                }
              >

              </Box>
              {tasks?.map((task) => (
                <Tr>
                  <RiDeleteBin5Line onClick={() => deletePost.mutate(task.id)} />
                  <Td sx={
                    {
                      '::-webkit-scrollbar': {
                        display: 'none'
                      }
                    }
                  }>{task.name.substring(0, 20)}</Td>
                  <Td >{task.date}</Td>
                  <Td className="center"><Checkbox /></Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </Box>
    </div>
  );
}

export default Form;
