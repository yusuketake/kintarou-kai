import DisplayCalendar from './calendar';
import Header from './Header';
import Bar from './bar';
import Totalbar from './totalbar';
import { AttendanceForm } from '@/components/AttendanceForm';

export default function Home() {
  return (
    <div>
      <div className="w-full h-screen flex">
        <div className="w-1/2 flex-none">
          <div className="">
            <Header userName={'yusuke_takeuchi'} />
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
          </div>
          <div className="p-2 w-1/2 flex w-full">
            <div className="p-2 w-1/8 timeBar-container">
              <Bar classname={'timeBar'} />
            </div>
            <div className="p-2 w-1/4">
              <Bar classname={'bar'} />
            </div>
            <AttendanceForm />
          </div>
        </div>
      </div>
    </div>
  );
}
