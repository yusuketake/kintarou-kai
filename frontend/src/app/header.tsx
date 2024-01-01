import "./style.css";

export default function Header() {
  return (
    <>
      <div className="flex justify-between bg-gray-200 p-5">
        <div>名前</div>
        <div>部署</div>
        <div>ログアウト</div>
      </div>
    </>
  );
}
