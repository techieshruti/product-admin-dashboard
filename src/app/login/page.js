"use client"
import { useState } from 'react';
import api from "@/lib/axios";
import {useRouter} from "next/navigation";

const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
       try {
        const response = await api.post('auth/login', { username, password });
        localStorage.setItem('accessToken', response.data.accessToken);
        console.log('Login successful:', response.data);
        router.push('/products');
      } catch (error) {
        console.log('Login failed:', error);
      }
    };

  return (
    <main>
    <h1>Login</h1>
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="username">Username:</label>
        <input type="text" id="username" name="username" placeholder="Enter your username" value={username} onChange={(e) => setUsername(e.target.value)} />
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input type="password" id="password" name="password" placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </div>
      <button type="submit">Login</button>
    </form>
    </main>
  );
};

export default LoginPage