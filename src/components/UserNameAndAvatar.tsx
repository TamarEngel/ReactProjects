import { useContext, useState } from 'react'
import { userContext } from './UserProvider'
import UpdateUser from './updateUser';
import { Avatar, Button, Typography } from '@mui/material';

function UserNameAndAvatar() {
  const [open, setOpen] = useState(false)
  const userCon = useContext(userContext)
  if (!userCon)
    throw "ERROR"
  const { user } = userCon
  return (
    <div style={{marginBottom:'85px', marginRight: '800px'}}>
      {user ? (
        <>
          <Avatar sx={{ marginLeft: 27, marginTop: 3 }} style={{ background: "#1976d2" }}>{user.firstName ? user.firstName[0] : '?'}</Avatar>
          <Typography variant="h6" sx={{ marginBottom: 3 }}>{`${user.firstName} ${user.lastName}`}</Typography>
          <Button variant="outlined" onClick={() => setOpen(true)}>Update User</Button>

          <UpdateUser open={open} setOpen={setOpen} />
        </>
      ) : (
        <Typography variant="h6">Please log in</Typography>
      )}
    </div>
  )
}

export default UserNameAndAvatar

