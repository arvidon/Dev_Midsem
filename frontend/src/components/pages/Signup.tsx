// url : http://localhost:3000/signup
import {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import { apiClient } from '@/lib/axios-instance';

interface signUpResponse{
    message: string;
    user:{
        email: string,
        name: string,
        password: string
    }
}

export function SignUp() {
    const navigate = useNavigate();

    const[email, setEmail] = useState("");
    const[name, setName] = useState("");
    const[password, setPassword] = useState("");
    const[isLoading, setIsLoading] = useState("");
    const[errorMessage, setErrorMessage] = useState("");

    async function handleClick(){
        setIsLoading(true);
        setErrorMessage("");

        try{
            const response = await apiClient.post<signUpResponse>("/auth/signUp", {
                email,
                name,
                password
            })

            localStorage.setItem("token", response.data.token)
            navigate('/')
        }catch{
            setErrorMessage("Login failed.please check your credentials")
        }finally{
            setIsLoading(false)
        }
    }

    return(
        <section className='mx-auto max-w-md space-y-4'>
            <h1 className='text-2xl font-semibold'></h1>
            <input 
            type='email'
            value={email}
            onChange={event => setEmail(event.target.value)}
            placeholder='Email'
            className="w-full rounded border p-2"
            />

            <input 
            type="name"
            value={name}
            onChange={event => setName(event.target.value)}
            placeholder="name"
            className="w-full rounded p-2"
            />

            <input
            type="password"
            value={password}
            onChange={event => setPassword(event.target.value)}
            placeholder="Password"
            className="w-full rounded border p-2"
            />

            <button
            type="button"
            onClick={handleClick}
            disabled={isLoading}
            className="rounded bg-black px-4 py-2 text-white disabled:opacity-60 cursor-pointer"
            >
                {isLoading ? "Logging in..." : "Login"}
            </button>
            {errorMessage ? <p className="text-sm text-red-600">{errorMessage}</p> : null}
        </section>
    )

}