import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { authorizeUserCall, registerUserCall } from "../api/helpdeskApi"


const schema = yup
  .object({
    name: yup.string().required(),
    email: yup.string().email().required(),
    password: yup.string().min(4).required(),
  })
  .required()

export interface RUser {
  name: string;
  email: string;
  password: string;
}


const Register = () => {


  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  })
  const onSubmit = async (data: RUser) => {
    try {
      const response = await registerUserCall(data);
  
      const response2 = await authorizeUserCall({
        email: data.email,
         password: data.password
      });
      console.log("User registered successfully:", response);

    } catch (error) {
      console.log("Registration failed, please try again.");
      console.error(error);
    }
    console.log(data)

  }

  return (
    <>

      <h1>Register</h1>
      <form onSubmit={handleSubmit(onSubmit)}>


        <input {...register("name")} />
        <p>{errors.name?.message}</p>

        <input {...register("email")} />
        <p>{errors.email?.message}</p>

        <input {...register("password")} />
        <p>{errors.password?.message}</p>


        <input type="submit" />
      </form>
    </>
  )
}

export default Register









