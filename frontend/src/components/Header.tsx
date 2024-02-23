"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import kintarou from "./kintarou.png";

export type User = {
  id: number;
  name: string;
  department: string;
  loginId: string;
};

type Props = {
  user?: User;
};

export const Header = (props: Props) => {
  const { user } = props;
  const router = useRouter();

  return (
    <div className="bg-blue-500 text-white pt-3">
      <div className="flex justify-center items-center">
        <Image src={kintarou} alt={""} width={60}></Image>
        <div className="ml-5 text-lg font-bold">勤太郎改</div>
      </div>
      <div className="flex justify-between p-3 font-semibold items-center">
        <span>{user ? user.name : ""}</span>
        <span>{user ? user.department : ""}</span>
        <button
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          onClick={() => {
            localStorage.removeItem("token");
            router.push("/Login");
          }}
        >
          ログアウト
        </button>
      </div>
    </div>
  );
};
