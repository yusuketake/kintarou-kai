import { GetServerSideProps } from "next";
import "./style.css";

export default function Header() {
  const userName = getServerSideProps;

  return (
    <>
      <div className="flex justify-between bg-gray-200 p-5">
        <div>{getServerSideProps.name}</div>
        <div>部署</div>
        <div>ログアウト</div>
      </div>
    </>
  );
}

// https://nextjs.org/docs/pages/building-your-application/data-fetching/get-server-side-props#:~:text=getServerSideProps-,getServerSideProps,-getServerSideProps
export const getServerSideProps: GetServerSideProps = (async () => {
  const axios = require("axios");
  const userName = await axios.get("http://localhost:8000/api/users/");
  return {
    props: { userName },
  };
}) satisfies GetServerSideProps<{ userName: UserName }>;

// satsifiesで型判定するのに使用する
type UserName = {
  name: string;
};
