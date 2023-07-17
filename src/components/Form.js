import { Button, FormControl, FormLabel, Input } from "@chakra-ui/react";
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
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

function Form() {
  const createProductRequest = useMutation((data: any) =>
    axios.post("http://localhost:3005/products", data)
  );

  const { register, handleSubmit } = useForm();

  return (
    <div>
      <Popover>
        <PopoverTrigger>
          <Button>Trigger</Button>
        </PopoverTrigger>
        <PopoverContent>
          <PopoverArrow />
          <PopoverCloseButton />
          <PopoverHeader>Confirmation!</PopoverHeader>
          <PopoverBody>
            <FormControl isRequired>
              <FormLabel {...register("task")}>Task</FormLabel>
              <Input placeholder="First name" />
              <FormLabel {...register("date")}>Date</FormLabel>
              <Input type="datetime-local" placeholder="First name" />
              <FormLabel {...register("desc")}>Description</FormLabel>
              <Input placeholder="First name" />
              <Button onClick={handleSubmit(onSubmit)} style={{ marginTop: 5 }}>
                ADD TASK
              </Button>
            </FormControl>
          </PopoverBody>
        </PopoverContent>
      </Popover>
    </div>
  );
}

export default Form;
