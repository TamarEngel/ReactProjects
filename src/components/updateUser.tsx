import { FormEvent, useContext, useRef } from 'react'
import { Modal, Box, TextField, Button } from '@mui/material'
import { Action, userContext } from './HomePage';
import axios from 'axios';

function UpdateUser({ open, setOpen }: { open: boolean; setOpen: (open: boolean) => void }) {
    const firstNameRef = useRef<HTMLInputElement>(null)
    const lastNameRef = useRef<HTMLInputElement>(null)
    const emailRef = useRef<HTMLInputElement>(null)
    const addressRef = useRef<HTMLInputElement>(null)
    const phoneRef = useRef<HTMLInputElement>(null)
    const userCon = useContext(userContext)
    if (!userCon)
        throw new Error("ERROR Profile must be used within a UserContext.Provider")
    const { user, dispatch } = userCon
    const handleSave = async (e: FormEvent) => {
        e.preventDefault()
        try {
            const userId = user?.id;
            const act: Action = {
                type: 'UPDATE',
                data: {
                    firstName: firstNameRef.current?.value,
                    lastName: lastNameRef.current?.value,
                    address: addressRef.current?.value,
                    email: emailRef.current?.value,
                    phone: phoneRef.current?.value
                }
            }
            const res = await axios.put('http://localhost:3000/api/user', act.data, {
                headers: {
                    'user-id': userId
                }
            });
            dispatch(act)
        } catch (e) {
            if (axios.isAxiosError(e)) {
                if (e.status === 404) {
                    alert('משתמש לא נמצא');
                } else if (e.status === 403) {
                    alert('גישה לא מורשית');
                } else {
                    alert('שגיאה לא ידועה');
                }
            }
        }
        setOpen(false)
    }
    return (
        <div >
            <Modal open={open} onClose={() => setOpen(false)}>
                <Box sx={{ padding: 4, backgroundColor: 'white', width: 300, margin: 'auto', marginTop: 10 }}>
                    <h2>Update User</h2>
                    <TextField label="First Name" variant="outlined" fullWidth margin="normal" inputRef={firstNameRef} sx={{ '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: '#B0B0B0' }, '&:hover fieldset': { borderColor: 'pink' }, '&.Mui-focused fieldset': { borderColor: 'pink' } }, '& .MuiInputLabel-root': { color: '#B0B0B0' }, '& .MuiInputLabel-root.Mui-focused': { color: 'black' } }} />
                    <TextField label="Last Name" variant="outlined" fullWidth margin="normal" inputRef={lastNameRef} sx={{ '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: '#B0B0B0' }, '&:hover fieldset': { borderColor: 'pink' }, '&.Mui-focused fieldset': { borderColor: 'pink' } }, '& .MuiInputLabel-root': { color: '#B0B0B0' }, '& .MuiInputLabel-root.Mui-focused': { color: 'black' } }} />
                    <TextField label="Email" variant="outlined" fullWidth margin="normal" inputRef={emailRef} sx={{ '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: '#B0B0B0' }, '&:hover fieldset': { borderColor: 'pink' }, '&.Mui-focused fieldset': { borderColor: 'pink' } }, '& .MuiInputLabel-root': { color: '#B0B0B0' }, '& .MuiInputLabel-root.Mui-focused': { color: 'black' } }} />
                    <TextField label="Address" variant="outlined" fullWidth margin="normal" inputRef={addressRef} sx={{ '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: '#B0B0B0' }, '&:hover fieldset': { borderColor: 'pink' }, '&.Mui-focused fieldset': { borderColor: 'pink' } }, '& .MuiInputLabel-root': { color: '#B0B0B0' }, '& .MuiInputLabel-root.Mui-focused': { color: 'black' } }} />
                    <TextField label="Phone" variant="outlined" fullWidth margin="normal" inputRef={phoneRef} sx={{ '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: '#B0B0B0' }, '&:hover fieldset': { borderColor: 'pink' }, '&.Mui-focused fieldset': { borderColor: 'pink' } }, '& .MuiInputLabel-root': { color: '#B0B0B0' }, '& .MuiInputLabel-root.Mui-focused': { color: 'black' } }} />
                    <Button variant="outlined" onClick={handleSave} fullWidth sx={{ marginTop: 2.5, borderColor: 'pink', color: 'black', backgroundColor: 'transparent', '&:hover': { backgroundColor: 'transparent', borderColor: 'black', color: 'pink' }, '&:active': { backgroundColor: 'transparent', color: 'pink' } }}>Save</Button>
                </Box>
            </Modal>
        </div>
    )
}
export default UpdateUser
