import { Outlet } from 'react-router-dom';
import { Container } from '@mui/material';
import NavBar from './navBar';

function AppLayout() {
  return (
    <div>
      <NavBar />
      <Container sx={{ marginTop: 10 }}>
        <Outlet />
      </Container>
    </div>
  );
}

export default AppLayout;

