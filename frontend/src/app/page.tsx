import Header from "./header";
import Totalbar from "./totalbar";
import Calendar from "./calendar";

export default function Home() {
  return (
    <div>
      <div className="flex">
        <div>
          <div>
            <Header />
          </div>
          <div>
            <Totalbar />
          </div>
          <div>
            <Calendar />
          </div>
        </div>

        <div className="flex p-2">
          <div className="border-solid border-2 p-2">棒グラフ入力欄</div>
          <div className="border-solid border-2 p-2">
            <div className="border-solid border-2 p-2 mb-32 flex justify-between">
              <div>
                <div>休暇</div>
                <div>
                  <input type="text" className="border-inherit border-2" />
                </div>
              </div>
              <div>取消</div>
              <div>登録</div>
            </div>
            <div className="border-solid border-2 p-2 flex justify-between">
              <div>
                <div>実働</div>
                <div>89:45</div>
              </div>
              <div>
                <div>非実働</div>
                <div>01:00</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
