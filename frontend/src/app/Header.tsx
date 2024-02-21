import axios from 'axios';
import { setDefaultResultOrder } from 'dns';
import { InferGetServerSidePropsType } from 'next';
import './style.css';
setDefaultResultOrder('ipv4first');

export default function Header(
  userName: InferGetServerSidePropsType<typeof getServerSideProps>,
) {
  // const userName = getServerSideProps;
  var http = require('http');
  const agent = new http.Agent({ family: 4 });
  const response = axios.get('http://127.0.0.1:8080/login', {
    method: 'get',
    responseType: 'json',
    httpAgent: agent,
  });
  response.then(function (response) {
    console.log('localhost1: ' + response.data);
  });

  return (
    <>
      <div className="flex justify-between bg-gray-200 p-5">
        <div>response1</div>
        <div>部署</div>
        <div>ログアウト</div>
      </div>
    </>
  );
}

// https://nextjs.org/docs/pages/building-your-application/data-fetching/get-server-side-props#:~:text=getServerSideProps-,getServerSideProps,-getServerSideProps
export const getServerSideProps = async () => {
  try {
    // const userName = await axios.get("http://localhost:8000/api/users/");
    const userName = '';
    // console.log("getServerSideProps内");
    // console.log(userName);
    return {
      props: { userName },
    };
  } catch (error) {
    // console.error(error);
  }
};

// satsifiesで型判定するのに使用する
type User = {
  userName: string;
};
