import axios from 'axios';
import type { LUser } from '../pages/login';
import type { RUser } from '../pages/register';
import type { AUser } from '../features/users/addUser';
import type { TicketToAdd } from '../features/tickets/addTicket';
import type { ticketToUpdate } from '../features/tickets/updateTicket';


export const registerUserCall = async (user: RUser) => {
  try {
    const response = await axios.post('http://localhost:4000/auth/register', user);
    return response.data;
  } catch (error) {
    console.error('Error authorizing user:', error);
    throw error;
  }
}



export const authorizeUserCall = async (user: LUser) => {
  try {
    const response = await axios.post('http://localhost:4000/auth/login', user);
    const token = response.data.token;
    localStorage.setItem('authToken', token);
     await axios.get('http://localhost:4000/auth/me', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })


    return response.data;
  } catch (error) {
    console.error('Error authorizing user:', error);
    throw error;
  }
};




export const getUsersCall = async (token: string) => {
  try {
    const response = await axios.get('http://localhost:4000/users', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error in getting all users:', error);
    throw error;
  }
}


export const addUserCall = async (token: string, user: AUser) => {
  try {
    const response = await axios.post('http://localhost:4000/users', user, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    return response.data;
  } catch (error) {
    console.error('Error in adding user:', error);
    throw error;
  }
}

export const getUsersByIdCall = async (token: string, id: number) => {
  try {
    const response = await axios.get(`http://localhost:4000/users/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error in getting user by id:', error);
    throw error;
  }
}

export const getTicketsCall = async (token: string) => {
  try {
    const response = await axios.get('http://localhost:4000/tickets', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error in getting all tickets:', error);
    throw error;
  }
}

export const addTicketCall = async (token: string, ticket: TicketToAdd) => {
  try {
    const response = await axios.post('http://localhost:4000/tickets', ticket, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    return response.data;
  } catch (error) {
    console.error('Error in adding ticket:', error);
    throw error;
  }
}


export const getTicketByIdCall = async (token: string, id: number) => {
  try {
    const response = await axios.get(`http://localhost:4000/tickets/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error in getting ticket by id:', error);
    throw error;
  }
}


export const updateTicketCall = async (token: string, id: number, ticket: ticketToUpdate) => {
  try {
    const response = await axios.patch(`http://localhost:4000/tickets/${id}`, ticket, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  } catch (error) {
    console.error('Error in updatting ticket by id:', error);
    throw error;
  }
}

export const deleteTicketCall=async(token: string, id: number)=>{
  try {
  const response=await axios.delete(`http://localhost:4000/tickets/${id}`,{
          headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  } catch (error) {
    console.error('Error in deleting ticket by id:', error);
    throw error;
  }
}

export const getCommentsByIdCall = async (token: string, id: number) => { 
  try {
    
    const response = await axios.get(`http://localhost:4000/tickets/${id}/comments`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error in getting comments by id:', error);
    throw error;
  }
}


export const addCommentByIdCall = async (token: string, id: number, comment: string) => {
  try {
        const response = await axios.post(`http://localhost:4000/tickets/${id}/comments`,  {content:comment}, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error in adding comment by id:', error);
    throw error;
  }
}
