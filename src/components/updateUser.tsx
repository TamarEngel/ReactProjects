import { FormEvent, useContext, useRef } from 'react'
import { Modal, Box, TextField, Button } from '@mui/material'
import { userContext } from './UserProvider';

function UpdateUser({ open, setOpen }: { open: boolean; setOpen: (open: boolean) => void }) {
    const firstNameRef = useRef<HTMLInputElement>(null)
    const lastNameRef = useRef<HTMLInputElement>(null)
    const emailRef = useRef<HTMLInputElement>(null)
    const passwordRef = useRef<HTMLInputElement>(null)
    const addressRef = useRef<HTMLInputElement>(null)
    const phoneRef = useRef<HTMLInputElement>(null)
    const userCon = useContext(userContext)
    if (!userCon)
        throw new Error ("ERROR Profile must be used within a UserContext.Provider")
    const { dispatch } = userCon
    const handleSave = (e: FormEvent) => {
        e.preventDefault()

        dispatch({
            type: 'UPDATE', data: {
                firstName: firstNameRef.current?.value,
                lastName: lastNameRef.current?.value,
                address: addressRef.current?.value,
                email: emailRef.current?.value,
                password: passwordRef.current?.value,
                phone: phoneRef.current?.value
            }
        })
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
