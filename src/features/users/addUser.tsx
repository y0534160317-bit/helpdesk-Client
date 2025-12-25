import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { useAuth } from "../../features/auth/loginLogic"
import { addUserCall } from "../../api/helpdeskApi"





const schema = yup
    .object({
        name: yup.string().required(),
        email: yup.string().email().required(),
        role: yup.string().oneOf(['admin', 'agent', 'customer']).required("תפקיד"),
        password: yup.string().min(4).required()
    })
    .required()

// type roleEnum{}

export interface AUser {


    name: string,
    email: string,
    role: string,
    password: string,

}


const addUser = () => {


    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    })
    const { state } = useAuth()

    const onSubmit = async (data: AUser) => {

        try {
            if (state.token === null) return;
            const response = await addUserCall(state.token, data);
            console.log("User added successfully:", response);
            // המשך טיפול (לדוגמה הפניה לדף אחר, הודעה למשתמש וכו')
        } catch (error) {
            console.log("Adding user failed, please try again.");
            console.error(error);
        }
        console.log(data)

    }

    return (
        <>

            <h2>Add user</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
    

                <input {...register("name")} />
                <p>{errors.name?.message}</p>

                <input {...register("email")} />
                <p>{errors.email?.message}</p>

                <label htmlFor="role">Role</label>
                <p>בחר תפקיד</p>
                <select id="role" {...register("role")}>
                    <option value="admin">admin</option>
                    <option value="agent">agent</option>
                    <option value="customer">customer</option>
                </select>
                <p>{errors.role?.message}</p>

                <input {...register("password")} />
                <p>{errors.password?.message}</p>

                <input type="submit" />
            </form>
        </>
    )
}

export default addUser