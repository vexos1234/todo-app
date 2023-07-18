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
import axios from "axios";
import { DevTool } from "@hookform/devtools";
import { Form as FormRRD } from "react-router-dom";

function Form() {
  const form = useForm();
  const { register, control, handleSubmit } = form;

  const onSubmit = (data) => {
    console.log("Form Submited", data);
  };

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
            <form className="form" onSubmit={handleSubmit(onSubmit)}>
              <input
                type="text"
                placeholder="Book Title"
                {...register("bookTitle")}></input>
              <input
                type="text"
                placeholder="Rating"
                {...register("rating")}></input>
              <input
                type="text"
                placeholder="Review"
                {...register("review")}></input>
              <input type="submit" placeholder="Review"></input>
            </form>
          </PopoverBody>
        </PopoverContent>
      </Popover>
      <DevTool control={control} />
    </div>
  );
}

export default Form;
