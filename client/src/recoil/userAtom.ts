import { atom, selector } from 'recoil';
import { User } from '../models/user';

export const userState = atom<User>({
    key: 'userState',
    default: new User()
})

export const userSelector = selector<User>({
    key: 'userSelector',
    get: ({get}) => get(userState)
})