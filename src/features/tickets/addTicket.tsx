import { yupResolver } from "@hookform/resolvers/yup"
import { useForm } from "react-hook-form"
import * as yup from "yup"
import { useAuth } from "../auth/loginLogic"

import { addTicketCall } from "../../api/helpdeskApi"

import { useNavigate } from "react-router-dom";


export interface TicketToAdd {
    
    subject?: string,
    description?: string,
    priority_name?: string ,
}

const schema = yup
    .object({
        subject: yup.string().max(100).required(),
        description: yup.string().min(20).required(),
        priority_name: yup.string().oneOf(['low', 'middle', 'high',undefined]).required("עדיפות"),
       
    })
    .required()




const addUser = () => {
const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    })
    const { state } = useAuth()

    const onSubmit = async (data: TicketToAdd) => {

        try {
            if (state.token === null) return;
            const response = await addTicketCall(state.token, data);
            console.log("User added successfully:", response);
            navigate("/dashboard", { replace: true });
            // המשך טיפול (לדוגמה הפניה לדף אחר, הודעה למשתמש וכו')
        } catch (error) {
            console.log("Adding user failed, please try again.");
            console.error(error);
        }
        console.log(data)

    }

    return (
        <>

            <h2>Add ticket</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
    

                <input {...register("subject")} />
                <p>{errors.subject?.message}</p>

                <input {...register("description")} />
                <p>{errors.description?.message}</p>

                <label htmlFor="priority">priority</label>
                <select id="priority" {...register("priority_name")}>
                    <option value="low">low</option>
                    <option value="middle">middle</option>
                    <option value="high">high</option>
                </select>
                <p>{errors.priority_name?.message}</p>

            

                <input type="submit" />
            </form>
        </>
    )
}

export default addUser