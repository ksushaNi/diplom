import { $authHost, $host } from ".";
import {jwtDecode} from "jwt-decode"

export const login = async (email, password) => {
    const {data} = await $host.post('api/user/login', {email, password})
    
    console.log('Токен получен:', data.token); 
    
    if (!data.token) {
        throw new Error('Токен не найден в ответе сервера');
    }

    // localStorage.setItem('token', data.token); // Сохраняем токен
    // return {
    //     user: jwtDecode(data.token), // Декодированные данные (id, email, role)
    //     token: data.token            // Сам токен (на случай, если нужен)
    // };
    localStorage.setItem('token', data.token)
    const user = jwtDecode(data.token);
    console.log('Декодированный пользователь:', user);
    return user; 
    //return jwtDecode(data.token)
}

export const registration = async (email, password) => {
    const {data} = await $host.post('api/user/registration', {email, password})
    localStorage.setItem('token', data.token)
    return jwtDecode(data.token);
    // return {
    //     user: jwtDecode(data.token),
    //     token: data.token
    // }
}

export const check = async () => {
    const {data} = await $authHost.get('api/user/auth')
    localStorage.setItem('token', data.token)
    return jwtDecode(data.token)
}