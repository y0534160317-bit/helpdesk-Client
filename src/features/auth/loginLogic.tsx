
import { jwtDecode, type JwtPayload } from 'jwt-decode';
import { createContext, useContext, useEffect, useReducer, type Dispatch, type ReactNode} from 'react';






type authState = {
    token: string | null,
    role: string | null,
    isLoading:boolean,
    isLogedIn: boolean
}

type authAction = {
    type: 'login',
    payload: {
        token: string,
        role: string|null
    }
} | {
    type: 'logout'
}

const initialState: authState = {
    token: null,
    role: null,
    isLoading:false,
    isLogedIn: false
};

function authreduce(state: authState, action: authAction):authState {
    switch (action.type) {
        case "login":
            return {
                token: action.payload.token,
                role:  action.payload.role,
                isLoading:false,
                isLogedIn: true
            }    
        case "logout":{
            return{...initialState,isLoading:false}
        }
    }
}

interface AuthContextProps{
    state:authState,
    dispatch:Dispatch<authAction>
}






type TokenPayload = JwtPayload & { role?: string };

function decodeTokenToAuthState(token: string): authState {
  try {
 
    const decoded = jwtDecode<TokenPayload>(token);
    return {
      token,
      role: decoded.role ?? null,
      isLoading:true,
      isLogedIn: true,
    };
  } catch (error) {
    console.error("Invalid token", error);
    return {
      token: null,
      role: null,
      isLoading:true,
      isLogedIn: false,
    };
  }
}




export const AuthContext=createContext<AuthContextProps|undefined>(undefined)

export function AuthProvider({children}:{children:ReactNode})
{
    const [state,dispatch]=useReducer(authreduce,initialState)
    useEffect(()=>{
        const token=localStorage.getItem("authToken")
        if (token){ 
            try{
            const decoded= decodeTokenToAuthState(token)
            if (decoded.isLogedIn==true)
         dispatch({type:'login',
            payload:{
                token,
                role: decoded.role ??null
            }})
            else{
                dispatch({
                    type:'logout'
                })
            }
        console.log(decoded.isLogedIn," 👍😎🙌",decoded.role)
        }
            catch{
                   dispatch({
                    type:'logout'
                }) 
            }
        }
    },[])



    return (
        <AuthContext.Provider value={{ state, dispatch }}>
            {children}
        </AuthContext.Provider>
    )


}

export function useAuth():AuthContextProps {
    const context=useContext(AuthContext);
    if (!context){
        throw new Error("useAuth must be used within an AuthProvider")
    }
    console.log(context.state.token);
    
    return context;
}