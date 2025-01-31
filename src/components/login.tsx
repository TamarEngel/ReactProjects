import { FormEvent, useContext, useRef, useState } from 'react'
import { Button, Modal, TextField, Box } from '@mui/material';
import { userContext } from './UserProvider';
import { Action } from './UserProvider'
import axios from 'axios';

const login = ({ setLog }: { setLog: (log: boolean) => void }) => {
    const [open, setOpen] = useState(false)
    const [typeB, setTypeB] = useState(false)
    const nameRef1 = useRef<HTMLInputElement>(null)
    const passwordRef1 = useRef<HTMLInputElement>(null)
    const userCon = useContext(userContext)
    if (!userCon)
        throw new Error("ERROR Profile must be used within a UserContext.Provider")
    const { dispatch } = userCon 
    const handleLogin = async (e: FormEvent) => {
        e.preventDefault();
        if (!nameRef1.current?.value || !passwordRef1.current?.value) {
            setLog(false);
            setOpen(false)
            return; 
        }
        const act: Action = {
            type: 'SignIn/SignUp',
            data: { firstName: nameRef1.current?.value, password: passwordRef1.current?.value }
        }
        //logIn
        if (typeB) {
            try {
                const res = await axios.post('http://localhost:3000/api/user/login', act.data)
                act.data.id = res.data.user.id
                setLog(true) 
                dispatch(act)
            }
            catch (e) {
                if (axios.isAxiosError(e))
                    if (e.status === 401)
                        alert(`${e.message} הנתונים שהזנת שגויים`)
            }
        }
        //signUp
        else {
            try {
                const res = await axios.post('http://localhost:3000/api/user/register', act.data)
                act.data.id = res.data.userId
                setLog(true)
                dispatch(act)
            }
            catch (e) {
                if (axios.isAxiosError(e))
                    if (e.status === 400)
                        alert(`${e.message}\n .הנתונים שהזנת כבר רשומים במערכת. אנא התחבר במקום להירשם מחדש`)
            }
        }
        setOpen(false);
        setTypeB(false)
    }
    return (
        <>
            <div style={{ position: 'absolute', top: 0, left: 0, marginLeft: '20px', marginTop: '20px' }}>
                <Button variant="outlined" onClick={() => { setOpen(true); setTypeB(true); }} sx={{ marginRight: '10px', borderColor: 'pink', color: 'black', backgroundColor: 'transparent', transition: '0.3s', '&:hover': { backgroundColor: 'transparent', borderColor: 'black', color: 'pink' } }}>
                    Log In
                </Button>
                <Button variant="outlined" onClick={() => setOpen(true)} sx={{ borderColor: 'pink',color: 'black',backgroundColor: 'transparent',transition: '0.3s','&:hover': {backgroundColor: 'transparent',borderColor: 'black',color: 'pink' }}}>
                     Sign Up
                </Button>
                <Modal open={open} onClose={() => {setOpen(false);setTypeB(false)}}>
                    <Box sx={{ padding: 4, backgroundColor: 'white', width: 300, margin: 'auto', marginTop: 10 }}>
                        {typeB?<h2>Login</h2>:<h2>Sign Up</h2>}
                        <TextField label="Name" variant="outlined" fullWidth margin="normal" inputRef={nameRef1} sx={{ '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: '#B0B0B0' }, '&:hover fieldset': { borderColor: 'pink' }, '&.Mui-focused fieldset': { borderColor: 'pink' } }, '& .MuiInputLabel-root': { color: '#B0B0B0' }, '& .MuiInputLabel-root.Mui-focused': { color: 'black' } }} />
                        <TextField label="Password" type="password" variant="outlined" fullWidth margin="normal" inputRef={passwordRef1} sx={{ '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: '#B0B0B0' }, '&:hover fieldset': { borderColor: 'pink' }, '&.Mui-focused fieldset': { borderColor: 'pink' } }, '& .MuiInputLabel-root': { color: '#B0B0B0' }, '& .MuiInputLabel-root.Mui-focused': { color: 'black' } }} />
                        <Button variant="outlined" onClick={handleLogin} fullWidth sx={{ textTransform: 'none',marginTop: 2.5, borderColor: 'pink', color: 'black', backgroundColor: 'transparent', '&:hover': { backgroundColor: 'transparent', borderColor: 'black', color: 'pink' }, '&:active': { backgroundColor: 'transparent', color: 'pink' } }}>
                            You're In!
                        </Button>
                    </Box>
                </Modal>
            </div>
        </>
    )
}
export default login
