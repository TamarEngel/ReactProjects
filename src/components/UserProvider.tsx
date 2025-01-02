import { createContext, useReducer, useState } from 'react'
import { User } from '../User'
import Login from './login';
import UserNameAndAvatar from './UserNameAndAvatar';
import axios, { AxiosError } from "axios";


// const handleSignUp = async (state: User, action: Action) => {
//     try {
//         const res = await axios.post('http://localhost:3000/api/user/register', action.data)
//         state = res.data.user
//         console.log(state);
        
//     }
//     catch (e) {
//         if (axios.isAxiosError(e))
//             if (e.status === 400)
//                 alert(`${e.message}`)
//     }
// }

// const handleLogin = async (state: User, action: Action) => {
//     try {
//         const res = await axios.post('http://localhost:3000/api/user/login', action.data)
//         state = res.data.user
//     }
//     catch (e) {
//         if (axios.isAxiosError(e))
//             if (e.status === 401)
//                 alert(`${e.message}`)
//     }
// }

// const handleUpdate = async (state: User, action: Action) => {
//     try {
//         const res = await axios.put('http://localhost:3000/api/user/', action.data)
//         state = res.data.user
//     }
//     catch (e) {
//         if (axios.isAxiosError(e))
//             if (e.status === 404)
//                 alert(`${e.message}`)
//     }
// }

export type Action = {
    type: 'SignIn/SignUp' | 'UPDATE' | 'DELETE',
    data: Partial<User>  
}
function userReducer(state: User, action: Action): User {
    switch (action.type) {
        case 'SignIn/SignUp':
            const {firstName,password}= action.data as Partial<User>
            return {
                firstName : firstName || '',
                lastName: '',
                password: password || '',
                email:'',
                address:'',
                phone:''
            }
        case 'UPDATE':
            return {
                firstName: action.data.firstName|| state.firstName,
                lastName: action.data.lastName || state.lastName,
                password :state.password,
                email: action.data.email || state.email,
                address: action.data.address || state.address,
                phone: action.data.phone || state.phone,
            }
        //case 'DELETE':
        default:
            return state;
    }
}

export const userContext = createContext<{user: User | null; dispatch: React.Dispatch<Action> } | null>(null);

function UserProvider() {
    const initialUser: User = {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        address: '',
        phone: ''
    };
    const [user, dispatch] = useReducer(userReducer, initialUser);
    const [log,setLog] = useState(false)
    return (
        <userContext.Provider value={{ user, dispatch }}>
            {!log && <Login setLog={setLog}/>}{/*כפתור לוגין מופיע רק כאשר לא נרשמו*/}
            {log && <UserNameAndAvatar />}{/* פרופיל המשתמש מופיע רק כאשר המשתמש נרשם*/}
        </userContext.Provider>

    )
}

export default UserProvider
