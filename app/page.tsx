"use client";

import { formSchema } from "@/schemas";
import { IForm } from "@/types/index";
import { Button, Input, InputProps } from "@headlessui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { TextField } from "@mui/material";
import Image from "next/image";
import { Controller, SubmitHandler, useFieldArray, useForm } from "react-hook-form";

export default function Home() {

  const { register, handleSubmit, formState, control, reset } = useForm<IForm>({
    mode: 'onChange',
    resolver: yupResolver(formSchema),
    // formState: { errors },
  });

  const { fields, append, remove } = useFieldArray({
    name: "test",
    control,

  });

  const onSubmit:SubmitHandler<IForm> = (data: any) => { 
    console.log(data);
  };

  // const emailError = formState.errors["email"]?.message;

  return (
    <main className="flex min-h-screen flex-col items-center gap-6 p-24">
      <h1 className="font-bold text-4xl text-black">React Hook Form</h1>

      <form className="w-2/5 flex flex-col gap-3" onSubmit={handleSubmit(onSubmit)}>
        {/* <TextField label="Outlined" variant="outlined" /> */}

        <Controller 
          name="Name"
          control={control}
          render={({ field }) => <TextField {...field} label={field.name} type="text" placeholder="Name" InputLabelProps={{
            shrink: true,
          }} />}
        />

        <Controller 
          name="Surname"
          control={control}
          render={({ field }) => <TextField {...field} label={field.name} placeholder="Surname" InputLabelProps={{
            shrink: true,
          }} />}
        />

        <Controller 
          name="Count"
          control={control}
          render={({ field }) => <TextField {...field} label={field.name} placeholder="00000" type="number" InputLabelProps={{
            shrink: true,
          }} />}
        />

        <Controller 
          name="Date"
          control={control}
          render={({ field }) => <TextField {...field} label={field.name} type="date" InputLabelProps={{
            shrink: true,
          }} />}
        />

        <section>
        <ul>
          {fields.map((item, index) => (
            <li key={item.id} className="flex justify-between items-center">
              
              <Controller
                render={({ field }) => <TextField placeholder="Firstname" {...field} />}
                name={`test.${index}.firstName`}
                control={control}
              />
              <Controller
                render={({ field }) => <TextField placeholder="Lastname" {...field} />}
                name={`test.${index}.lastName`}
                control={control}
              />
              <button type="button" className="bg-black h-full ml-2.5 p-2.5 rounded-md" onClick={() => remove(index)}>Delete</button>
            </li>
          ))}
        </ul>
        </section>


        {/* <Input type="text" placeholder="Name" className="w-full p-2 text-black border data-[hover]:shadow data-[focus]:bg-slate-100  placeholder:text-sm rounded-md" {...register('name', {
          required: "This field is required",
          min: 5,
        })} /> */}

        {/* <Input type="text" placeholder="Surname" className="w-full p-2 text-black border data-[hover]:shadow data-[focus]:bg-slate-100  placeholder:text-sm rounded-md" {...register('surname', {
          required: "This field is required",
        })} />

        <Input type="email" placeholder="Email" className="w-full p-2 text-black border data-[hover]:shadow data-[focus]:bg-slate-100  placeholder:text-sm rounded-md" {...register('email', {
          required: "This field is required",
          pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
            message: "Invalid email address",
          }
        })} /> */}

        {/* {emailError && <p className="text-rose-500">{emailError}</p>} */}
        
        <Button type="button" className="rounded bg-sky-600 py-2 px-4 text-sm text-white data-[hover]:bg-sky-500 data-[active]:bg-sky-700" onClick={() => append({ firstName: "", lastName: "" })}>
          Append
        </Button>

        <Button type="submit" className="rounded bg-sky-600 py-2 px-4 text-sm text-white data-[hover]:bg-sky-500 data-[active]:bg-sky-700">
          Submit
        </Button>

      </form>
    </main>
  );
}
