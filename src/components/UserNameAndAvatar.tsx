import { useContext, useState } from 'react'
import { userContext } from './UserProvider'
import { Avatar, Button, Typography } from '@mui/material';
import UpdateUser from './updateUser';

function UserNameAndAvatar() {
  const [open, setOpen] = useState(false)
  const userCon = useContext(userContext)
  if (!userCon)
    throw new Error ("ERROR Profile must be used within a UserContext.Provider")
  const { user } = userCon
  const isEmptyObject = (obj: object) => {
    return Object.values(obj).every(value => value === '');
  };
  return (
    <div style={{ position: 'fixed', top: '20px', left: '20px', display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
      {user && !isEmptyObject(user) ? (
        <>
          <div style={{ marginBottom: 15,display: 'flex', alignItems: 'center' }}>
            <Avatar style={{ background: "pink" }}>
              {user.firstName ? user.firstName[0] : '?'} 
            </Avatar>
            <Typography variant="h6" sx={{ marginLeft: '20px' }}>
              {`${user.firstName} ${user.lastName}`}
            </Typography>
          </div>
          <Button variant="outlined" onClick={() => setOpen(true)} sx={{ borderColor: 'pink',color: 'black',backgroundColor: 'transparent',transition: '0.3s','&:hover': {backgroundColor: 'transparent',borderColor: 'black',color: 'pink' }}}>Update User</Button>

          <UpdateUser open={open} setOpen={setOpen} />
        </>
      ) : (
        <Typography variant="h6">Please log in</Typography>
      )}
    </div>
  )
}
export default UserNameAndAvatar

