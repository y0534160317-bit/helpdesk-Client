import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { authorizeUserCall } from "../api/helpdeskApi"

;     
import {  useNavigate } from "react-router-dom";



const schema = yup
  .object({

    email: yup.string().email().required(),
    password: yup.string().min(4).required(),
  })
  .required()

  export interface LUser {
    email:string;
    password:string;
  }


const Login = () => {
const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  })
   const onSubmit =async(data: LUser) => {
     try{
      const response = await authorizeUserCall(data);
      
      
      console.log("Login successful");
      console.log(response);//מה עושים הלאה
      navigate("/dashboard", { replace: true });
     } catch (error) {
       console.error("Login failed:", error);
     }
   }

  return (
    <>

      <h1>Login</h1>
      <form onSubmit={handleSubmit(onSubmit)}>

        <input {...register("email")} />
        <p>{errors.email?.message}</p>

        <input {...register("password")} />
        <p>{errors.password?.message}</p>

        <input type="submit" />
      </form>
    </>
  )
}

export default Login









