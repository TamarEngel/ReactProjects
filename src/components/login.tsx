import { FormEvent, useContext, useRef, useState } from 'react'
import { Button, Modal, TextField, Box, Typography } from '@mui/material';
import { userContext } from './UserProvider';


const login = ({ setLog1 }: {setLog1: (log1: boolean) => void }) => {
    const [open, setOpen] = useState(false)
    const nameRef1 = useRef<HTMLInputElement>(null)
    const passwordRef1 = useRef<HTMLInputElement>(null)
    const userCon = useContext(userContext)
    if (!userCon)
        throw "ERROR"
    const { user, dispatch } = userCon
    const handleLogin = (e: FormEvent) => {
        e.preventDefault();
        console.log(nameRef1.current?.value);
        
        if (nameRef1.current?.value == user?.firstName && passwordRef1.current?.value == user?.password) {
            dispatch({ type: 'ADD_USER', data: { firstName: nameRef1.current?.value,password: passwordRef1.current?.value } })
        }
        else {
            dispatch({ type: 'ADD_USER', data: { firstName: nameRef1.current?.value,password: passwordRef1.current?.value } })
        }
        setOpen(false);
        setLog1(true)
    }
    return (
        <>
            <Typography variant="h4"  gutterBottom>hi ! home:</Typography>
            <Button variant="contained" onClick={() => setOpen(true)}>Login</Button>
            <Modal open={open} onClose={() => setOpen(false)}>
                <Box sx={{ padding: 4, backgroundColor: 'white', width: 300, margin: 'auto', marginTop: 10 }}>
                    <h2>Login</h2>
                    <TextField label="Name" variant="outlined" fullWidth  margin="normal" inputRef={nameRef1}/>
                    <TextField label="Password" type="password" variant="outlined" fullWidth  margin="normal" inputRef={passwordRef1}/>
                    <Button variant="contained" onClick={handleLogin} fullWidth>Login</Button>
                </Box>
            </Modal>
            
        </>
    )

}

export default login
