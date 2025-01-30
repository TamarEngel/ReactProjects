import {createContext, useState } from 'react'
import { User } from '../User'
import Login from './login';
import UserNameAndAvatar from './UserNameAndAvatar';

export type Action = {
    type: 'SignIn/SignUp' | 'UPDATE' | 'DELETE',
    data: Partial<User>
}
export function userReducer(state: User, action: Action): User {
    switch (action.type) {
        case 'SignIn/SignUp':
            const { firstName, password, id } = action.data as Partial<User>
            return {
                firstName: firstName || '',
                lastName: '',
                password: password || '',
                email: '',
                address: '',
                phone: '',
                id: id || 0
            }
        case 'UPDATE':
            return {
                firstName: action.data.firstName || state.firstName,
                lastName: action.data.lastName || state.lastName,
                password: state.password,
                email: action.data.email || state.email,
                address: action.data.address || state.address,
                phone: action.data.phone || state.phone,
                id: state.id
            }
        default:
            return state;
    }
}
export const userContext = createContext<{ user: User | null; dispatch: React.Dispatch<any> } | null>(null);
function UserProvider() {
    const [log, setLog] = useState(false)
    return (<>
        {!log && <Login setLog={setLog} />}
        {log && <UserNameAndAvatar />}
    </>)
}

export default UserProvider