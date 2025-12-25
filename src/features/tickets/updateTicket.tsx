
import { yupResolver } from "@hookform/resolvers/yup"
import { useForm } from "react-hook-form"
import * as yup from "yup"
import { useAuth } from "../auth/loginLogic"
import { updateTicketCall } from "../../api/helpdeskApi"



export interface ticketToUpdate{
  status_id: number|null,
  priority_id: number|null,
  assigned_to: number|null
}

const schema = yup
    .object({
        status_id: yup.number().required(),
        priority_id: yup.number().required(),
        assigned_to: yup.number().required(),

    })
    .required()




const updateTicket=({ id }: { id: number | null })=>{
    const { state } = useAuth()

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    })
  

    const onSubmit = async (data: ticketToUpdate) => {

        try {
            if (state.token === null) return;
            if(id===null)return;
            const response = await updateTicketCall(state.token,id, data);
            console.log("Ticket update successfully:", response);
           
            // המשך טיפול (לדוגמה הפניה לדף אחר, הודעה למשתמש וכו')
        } catch (error) {
            console.log("Updating ticket failed, please try again.");
            console.error(error);
        }
        console.log(data)

    }

    return (
        <>

       
            <form onSubmit={handleSubmit(onSubmit)}>
    

                <input {...register("status_id")} />
                <p>{errors.status_id?.message}</p>

                <input {...register("priority_id")} />
                <p>{errors.priority_id?.message}</p>

                <label htmlFor="priority">priority</label>
                <select id="priority" {...register("assigned_to")}>
                    <option value="1">low</option>
                    <option value="2">middle</option>
                    <option value="3">high</option>
                </select>
                <p>{errors.assigned_to?.message}</p>

            

                <input type="submit" />
            </form>
        </>
    )
}

export default updateTicket