import { FormEvent, act, useContext, useRef, useState } from 'react'
import { Button, Modal, TextField, Box } from '@mui/material';
import { userContext } from './UserProvider';
import { Action } from './UserProvider'
import axios from 'axios';

const login = ({ setLog }: { setLog: (log: boolean) => void }) => {
    const [open, setOpen] = useState(false)//מנהל את מצב טופס המודאל פתוח או סגור
    const [typeB, setTypeB] = useState(false)  // סוג הכפתור שנלחץ
    const nameRef1 = useRef<HTMLInputElement>(null)
    const passwordRef1 = useRef<HTMLInputElement>(null)
    const userCon = useContext(userContext)
    if (!userCon)
        throw new Error("ERROR Profile must be used within a UserContext.Provider")
    const { dispatch } = userCon //פרוק
    const handleLogin = async (e: FormEvent) => {
        e.preventDefault();

        if (!nameRef1.current?.value || !passwordRef1.current?.value) {
            setLog(false); // החזרת המצב ל-LOGIN אם השדות ריקים
            setOpen(false) //סגירת הטופס
            return; // יציאה מהפונקציה אם לא הוזנו ערכים
        }

        const act: Action = {
            type: 'SignIn/SignUp',
            data: { firstName: nameRef1.current?.value, password: passwordRef1.current?.value }
        }
        //logIn
        if(typeB){
            try {
                const res = await axios.post('http://localhost:3000/api/user/login', act.data)
                act.data.id=res.data.user.id
                setLog(true) // עדכון מצב ההרשמה לכן כדי שיסגרו כפתורי הלוגין ויופיע כפתור העדכון והפרופיל
                dispatch(act)
            }
            catch (e) {
                if (axios.isAxiosError(e))
                    if (e.status === 401)
                        alert(`${e.message} הנתונים שהזנת שגויים`)
            }
        }
        //signUp
        else{
            try {
                const res = await axios.post('http://localhost:3000/api/user/register', act.data)
                act.data.id=res.data.userId
                setLog(true) // עדכון מצב ההרשמה לכן כדי שיסגרו כפתורי הלוגין ויופיע כפתור העדכון והפרופיל
                dispatch(act)
            }
            catch (e) {
                if (axios.isAxiosError(e))
                    if (e.status === 400)
                        alert(`${e.message}\n .הנתונים שהזנת כבר רשומים במערכת. אנא התחבר במקום להירשם מחדש`)
            }
        }
       
        setOpen(false);//בכל מצב לסגור
        setTypeB(false)
    }
    return (
        <>
            {/* כפתור הלוגין בעצמו והטופס שנפתח ברגע שלוחצים על הלוגין */}
            <div style={{ position: 'absolute', top: 0, left: 0, marginLeft: '20px', marginTop: '20px' }}>
                <Button variant="contained" onClick={() => { setOpen(true); setTypeB(true); }} sx={{ marginRight: '10px' }}>Log In</Button>
                <Button variant="contained" onClick={() => setOpen(true)} >Sign Up</Button>
                <Modal open={open} onClose={() => setOpen(false)}>
                    <Box sx={{ padding: 4, backgroundColor: 'white', width: 300, margin: 'auto', marginTop: 10 }}>
                        <h2>Login</h2>
                        <TextField label="Name" variant="outlined" fullWidth margin="normal" inputRef={nameRef1} />
                        <TextField label="Password" type="password" variant="outlined" fullWidth margin="normal" inputRef={passwordRef1} />
                        <Button variant="contained" onClick={handleLogin} fullWidth>Login</Button>
                    </Box>
                </Modal>
            </div>

        </>
    )

}

export default login
