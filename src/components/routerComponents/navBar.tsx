import { Link } from 'react-router-dom';
import { AppBar, Button, Toolbar, Typography } from '@mui/material';

function NavBar() {
  return (
    <AppBar position="fixed" sx={{ top: 0, right: 0, height: '100%', width: '150px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
      <Toolbar sx={{ display: 'flex', flexDirection: 'column', width: '100%', justifyContent: 'center', alignItems: 'center' }}>
        <Typography variant="h6" sx={{ padding: '5px 0', marginBottom: '50px' }}>My Application</Typography>
        <Button component={Link} to="/" color="inherit" sx={{ width: '100%', textAlign: 'center', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.1)' }}}>Home</Button>
        <Button component={Link} to="/grandfather" color="inherit" sx={{ width: '100%', textAlign: 'center', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.1)' } }}>Grandfather</Button>
        <Button component={Link} to="/grandmother" color="inherit" sx={{ width: '100%', textAlign: 'center', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.1)' } }}>Grandmother</Button>
        <Button component={Link} to="/grandmother/mother" color="inherit" sx={{ width: '100%', textAlign: 'center', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.1)' } }}>Mother</Button>
        <Button component={Link} to="/grandfather/father" color="inherit" sx={{ width: '100%', textAlign: 'center', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.1)' } }}>Father</Button>
      </Toolbar>
    </AppBar>
  );
}

export default NavBar;





