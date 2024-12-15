import { createContext, useReducer, useState } from 'react'
import { User } from '../User'
import Login from './login';
import UserNameAndAvatar from './UserNameAndAvatar';



type Action = {
    type: 'ADD_USER' | 'UPDATE_USER' | 'RESET_USER',
    data: Partial<User> | null 
}
function userReducer(state: User | null, action: Action): User | null {
    switch (action.type) {
        case 'ADD_USER':
            console.log("ADDING USER", action.data);
            return {
                firstName: action.data?.firstName ?? "",
                lastName: action.data?.lastName ?? "",
                address: action.data?.address ?? "",
                email: action.data?.email ?? "",
                password: action.data?.password ?? "",
                phone: action.data?.phone ?? ""
            };

        case 'UPDATE_USER':
            if (!state) return state;
            console.log("UPDATE_USER", action.data);
            return { ...state, ...action.data };

        case 'RESET_USER':
            return null;

        default:
            return state;
    }
}

export const userContext = createContext<{user: User | null; dispatch: React.Dispatch<Action> } | null>(null);

function UserProvider() {
    const initialUser: User = {
        firstName: 'tamar',
        lastName: '',
        email: '',
        password: '1234',
        address: '',
        phone: ''
    };
    const [user, dispatch] = useReducer(userReducer, initialUser);
    const [log1,setLog1] = useState(false)
    return (
        <userContext.Provider value={{ user, dispatch }}>
            <Login setLog1={setLog1}/>
            {log1 && <UserNameAndAvatar />}
        </userContext.Provider>

    )
}

export default UserProvider
