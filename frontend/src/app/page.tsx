import DisplayCalendar from "./Calendar";
import Header from "./Header";
import Bar from "./bar";
import Totalbar from "./totalbar";

export default function Home() {
  return (
    <div>
      <div className="w-full h-screen flex">
        <div className="w-1/2 flex-none">
          <div className="">
            <Header userName={"yusuke_takeuchi"} />
          </div>
          <div className="">
            <Totalbar />
          </div>
          <div className="">
            <DisplayCalendar />
          </div>
        </div>
        <div>
          <div className="p-2 w-full flex">
            <div>
              <div>
                <span>Name</span>
              </div>
              <div>
                <span>2023/1/1</span>
              </div>
            </div>
            <div>
              <span>登録済</span>
            </div>
            <div>
              <div>
                <button>取消</button>
              </div>
              <div>
                <button>登録</button>
              </div>
            </div>
          </div>
          <div className="p-2 w-1/2 flex w-full">
            <div className="p-2 w-1/8 timeBar-container">
              <Bar classname={"timeBar"} />
            </div>
            <div className="p-2 w-1/4">
              <Bar classname={"bar"} />
            </div>
            <div className="border-solid border-2 p-2 w-1/2">
              <div className="border-solid border-2 p-2 mb-32 justify-between">
                <div>
                  <div>休暇</div>
                  <div>
                    <input type="text" className="border-inherit border-2" />
                  </div>
                </div>
              </div>
              <div className="border-solid border-2 p-2 justify-between">
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
    </div>
  );
}
