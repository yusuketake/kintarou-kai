"use client";

import axios from "axios";
import { useState } from "react";

// 参考：https://nextjs.org/docs/pages/building-your-application/authentication#:~:text=input%20their%20credentials%3A-,pages/login.tsx,-TypeScript
function Login() {
  // ページ遷移用のReact hook
  //   const router = useRouter();
  const [user, setUser] = useState({
    userName: "",
    password: "",
  });
  console.log("login page");
  console.log(user);

  async function handleSubmit(events: React.FormEvent<HTMLFormElement>) {
    console.log("handlesubmit");
    // formデータを取得
    setUser((prev) => ({ ...prev, user }));

    const formData = new FormData();
    formData.append("userName", user.userName);
    formData.append("password", user.password);
    console.log(user);
    // const userName = formData.get("userName");
    // const password = formData.get("password");
    console.log(user);

    // loginAPIにポストして、axios内でログインAPIのレスポンスがOKか判定
    // エラーなら再度ログイン画面のまま。OKならkintarouページに遷移
    user.userName;
    const response = axios
      .post("http://localhost:8080/login", {
        userName: user.userName,
        password: user.password,
      })
      .then((response) => {
        console.log("axios" + response);
        // router.push("/");
      })
      .catch((response) => {
        console.log("axios" + response);
        // そのままloginページに残す。なんかメッセージとか出したい。
      });
  }

  //   ログイン用のフォーム
  // TODO: React-Hook-Formライブラリを使用して簡潔に書きたい。
  return (
    <div>
      <form onSubmit={() => console.log("onsubmit")}>
        <input type="text" name="userName" placeholder="userName" required />
        <input
          type="password"
          name="password"
          placeholder="Password"
          required
        />
        <button onClick={() => console.log("onclick")} type="submit">
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;
