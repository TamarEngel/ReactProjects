import { Container } from '@mui/material'
import NavBar from './navBar';
import { User } from '../../User';
import { useReducer } from 'react';
import HomePage, { userReducer } from '../HomePage'
import { Outlet } from "react-router"
import { userContext } from '../HomePage';

function AppLayout() {
  const initialUser: User = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    address: '',
    phone: ''
  };
  const [user, dispatch] = useReducer(userReducer, initialUser);
  return (
    <div>
      <userContext.Provider value={{ user, dispatch }}>
        <HomePage/>
        <NavBar />
        <Outlet />
        <Container sx={{ marginTop: 10 }}>
        </Container>
      </userContext.Provider>
    </div>
  );
}

export default AppLayout;
