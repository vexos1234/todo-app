import { Box, Button, Center, Checkbox, Flex, FormControl, FormLabel, HStack, Heading, Input, Spacer, Stack } from "@chakra-ui/react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverArrow,
  PopoverCloseButton,
} from "@chakra-ui/react";
import React from "react";
import "./styles.css";
import { useForm, SubmitHandler } from "react-hook-form";
import axios from "axios";
import { DevTool } from "@hookform/devtools";
import { Form as FormRRD } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from '@chakra-ui/react'
import { BiMessageSquareAdd } from 'react-icons/bi';

function Form() {
  const request = useQuery(["FetchProduct"], () =>
    axios.get("https://jsonplaceholder.typicode.com/posts")
  );

  const form = useForm();
  const { register, control, handleSubmit } = form;

  const onSubmit = (data) => {
    console.log("Form Submited", data);
  };

  const tasks = request.data?.data;
  console.log(tasks);
  if (tasks === undefined) return null;
  return (
    <div>
      {/* add tasks */}
      <Box>
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
                <form className="form" onSubmit={handleSubmit(onSubmit)}>
                  <Input
                    type="task"
                    placeholder="What you want to do?"
                    {...register("bookTitle")}></Input>
                  <Input
                    type="datetime-local"
                    placeholder="When?"
                    {...register("date")}></Input>
                  <Input
                    type="text"
                    placeholder="Describe (optional)"
                    {...register("description")}></Input>
                  <Button type="submit" placeholder="submit" style={{ marginTop: 5 }}>ADD</Button>
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
                <Th>Task</Th>
                <Th>Date</Th>
                <Th>Completed</Th>
              </Tr>
            </Thead>
            <Tbody>
              <Tr>
                <Td>inches</Td>
                <Td >millimetres (mm)</Td>
                <Td><Checkbox /></Td>
              </Tr>
              <Tr>
                <Td>feet</Td>
                <Td>centimetres (cm)</Td>
                <Td><Checkbox /></Td>
              </Tr>
              <Tr>
                <Td>yards</Td>
                <Td>metres (m)</Td>
                <Td><Checkbox /></Td>
              </Tr>
            </Tbody>
            <Tfoot>
              <Tr>
                <Th>To convert</Th>
                <Th>into</Th>
                <Td><Checkbox /></Td>
              </Tr>
            </Tfoot>
          </Table>
        </TableContainer>
      </Box>
    </div>
  );
}

export default Form;
