import { FormEvent, useContext, useRef } from 'react'
import { Modal, Box, TextField, Button } from '@mui/material'
import { Action, userContext } from './UserProvider';
import axios from 'axios';

function UpdateUser({ open, setOpen }: { open: boolean; setOpen: (open: boolean) => void }) {
    const firstNameRef = useRef<HTMLInputElement>(null)
    const lastNameRef = useRef<HTMLInputElement>(null)
    const emailRef = useRef<HTMLInputElement>(null)
    const addressRef = useRef<HTMLInputElement>(null)
    const phoneRef = useRef<HTMLInputElement>(null)
    const userCon = useContext(userContext)
    if (!userCon)
        throw new Error ("ERROR Profile must be used within a UserContext.Provider")
    const {user, dispatch } = userCon

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
                    <TextField label="First Name" variant="outlined" fullWidth margin="normal" inputRef={firstNameRef} />
                    <TextField label="Last Name" variant="outlined" fullWidth margin="normal" inputRef={lastNameRef} />
                    <TextField label="Email" variant="outlined" fullWidth margin="normal" inputRef={emailRef} />
                    <TextField label="Address" variant="outlined" fullWidth margin="normal" inputRef={addressRef} />
                    <TextField label="Phone" variant="outlined" fullWidth margin="normal" inputRef={phoneRef} />
                    <Button variant="contained" onClick={handleSave} fullWidth>Save</Button>
                </Box>
            </Modal>
        </div>

    )
}

export default UpdateUser
