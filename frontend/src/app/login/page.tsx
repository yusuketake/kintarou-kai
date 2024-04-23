'use client';

import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import '../style.css';

async function test() {
    axios
        .get('http://localhost:8080/api/users/getList')
        .then((res) => {
            console.log(res);
        })
        .catch((err) => {
            console.log(err);
        });
}

// 参考：https://nextjs.org/docs/pages/building-your-application/authentication#:~:text=input%20their%20credentials%3A-,pages/login.tsx,-TypeScript
function Login() {
    // ページ遷移用のReact hook
    //   const router = useRouter();
    const [user, setUser] = useState({
        userName: '',
        password: '',
    });
    const router = useRouter();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    // console.log("login page");
    // console.log(user);

    async function handleSubmit(events: React.FormEvent<HTMLFormElement>) {
        events.preventDefault();
        // formデータを取得
        setUser((prev) => ({ ...prev, user }));

        const formData = new FormData();
        formData.append('username', user.userName);
        formData.append('password', user.password);
        // const userName = formData.get("userName");
        // const password = formData.get("password");

        // loginAPIにポストして、axios内でログインAPIのレスポンスがOKか判定
        // エラーなら再度ログイン画面のまま。OKならkintarouページに遷移
        user.userName;
        axios
            .post('http://localhost:8080/login', {
                username,
                password,
            })
            .then((response) => {
                console.log(response);
                const token = response.headers['x-auth-token'];
                console.log(token);
                localStorage.setItem('token', token);
                router.push('/');
            })
            .catch((response) => {
                console.log(`axios${response}`);
                // そのままloginページに残す。なんかメッセージとか出したい。
            });
    }

    const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUsername(e.target.value);
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    };

    //   ログイン用のフォーム
    // TODO: React-Hook-Formライブラリを使用して簡潔に書きたい。
    return (
        <div className="w-full max-w-xs">
            <form
                onSubmit={handleSubmit}
                className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
            >
                <div className="mb-4">
                    <input
                        type="text"
                        name="userName"
                        placeholder="userName"
                        onChange={handleUsernameChange}
                        required
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>
                <div>
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        onChange={handlePasswordChange}
                        required
                        className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>
                <div className="flex items-center justify-between">
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        type="submit"
                    >
                        Login
                    </button>
                    <a
                        className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
                        href="#"
                    >
                        Forgot Password?
                    </a>
                </div>
            </form>
            <button onClick={test}>test</button>
        </div>
    );
}

// css参考：https://v1.tailwindcss.com/components/forms

export default Login;
