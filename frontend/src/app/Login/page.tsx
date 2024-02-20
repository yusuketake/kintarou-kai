"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

async function test() {
  axios
    .get("http://localhost:8080/api/users/getList")
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
    userName: "",
    password: "",
  });
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  // console.log("login page");
  // console.log(user);

  async function handleSubmit(events: React.FormEvent<HTMLFormElement>) {
    events.preventDefault();
    // formデータを取得
    setUser((prev) => ({ ...prev, user }));

    const formData = new FormData();
    formData.append("username", user.userName);
    formData.append("password", user.password);
    // const userName = formData.get("userName");
    // const password = formData.get("password");

    // loginAPIにポストして、axios内でログインAPIのレスポンスがOKか判定
    // エラーなら再度ログイン画面のまま。OKならkintarouページに遷移
    user.userName;
    axios
      .post("http://localhost:8080/login", {
        username: username,
        password: password,
      })
      .then((response) => {
        console.log(response);
        const token = response.headers["x-auth-token"];
        console.log(token)
        localStorage.setItem("token", token);
        router.push("/");
      })
      .catch((response) => {
        console.log("axios" + response);
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
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="userName"
          placeholder="userName"
          onChange={handleUsernameChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handlePasswordChange}
          required
        />
        <button type="submit">Login</button>
      </form>
      <button onClick={test}>test</button>
    </div>
  );
}

export default Login;
