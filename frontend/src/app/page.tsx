"use client";
import { AttendanceForm } from "@/components/AttendanceForm";
import { Header } from "@/components/Header";
import axios from "axios";
import { ChangeEvent, useEffect, useState } from "react";
import Bar from "./bar";
import DisplayCalendar from "./calendar";
import Totalbar from "./totalbar";

export default function Home() {
  const token = localStorage.getItem("token");

  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [breakTime, setBreakTime] = useState("");
  const [holiday, setHoliday] = useState("");
  const [holidays, setHolidays] = useState([]);
  const [user, setUser] = useState();

  const handleChangeStartTime = (e: ChangeEvent<HTMLInputElement>) => {
    setStartTime(e.target.value);
  };

  const handleChangeEndTime = (e: ChangeEvent<HTMLInputElement>) => {
    setEndTime(e.target.value);
  };

  const handleChangeBreakTime = (e: ChangeEvent<HTMLInputElement>) => {
    setBreakTime(e.target.value);
  };

  const handleChangeHoliday = (e: ChangeEvent<HTMLSelectElement>) => {
    setHoliday(e.target.value);
  };

  // 休暇情報の取得
  useEffect(() => {
    axios
      .get("http://localhost:8080/api/holidays", {
        headers: { "X-AUTH-TOKEN": token },
      })
      .then((res) => {
        setHolidays(res.data);
      });
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/users", {
        headers: { "X-AUTH-TOKEN": token },
      })
      .then((res) => {
        console.log(res.data);
        setUser(res.data);
      });
  }, []);

  const handleClickInsert = () => {
    const data = {
      year: 2025,
      month: 1,
      day: 27,
      startTime: startTime,
      endTime: endTime,
      breakTime: breakTime,
      holidayId: holiday,
    };
    axios
      .post("http://localhost:8080/api/attendances/insert", data, {
        headers: { "X-AUTH-TOKEN": token, "Content-Type": "application/json" },
      })
      .then(() => {
        alert("登録に成功しました");
      })
      .catch((err) => {
        alert("登録に失敗しました" + err);
      });
  };

  const handleClickDelete = () => {
    const data = {
      year: 2025,
      month: 1,
      day: 27,
    };
    axios
      .delete("http://localhost:8080/api/attendances/delete", {
        headers: { "X-AUTH-TOKEN": token, "Content-Type": "application/json" },
        data: data,
      })
      .then(() => {
        alert("削除に成功しました");
      })
      .catch((err) => {
        alert("削除に失敗しました" + err);
      });
  };

  // AttendanceFormに勤務時間を反映するためのstate
  const [attendance, setAttendance] = useState(null);

  // calendarで日付を選択した時に、AttendanceFormに勤務時間を反映する
  // calendar.tsxから将来的に持ってくる
  // const handleCalendarDateClick=()=>{

  // }

  return (
    <div>
      <Header user={user} />
      <div className="w-full h-screen flex">
        <div className="w-1/2 flex-none">
          <div className="">
            <Totalbar />
          </div>
          <div className="">
            <DisplayCalendar
              attendance={attendance}
              setAttendance={setAttendance}
            />
          </div>
        </div>
        <div>
          <div className="p-2 w-1/2 flex w-full">
            <div className="p-2 w-1/8 timeBar-container">
              <Bar classname={"timeBar"} />
            </div>
            <div className="p-2 w-1/4">
              <Bar classname={"bar"} />
            </div>
            <AttendanceForm
              handleChangeStartTime={handleChangeStartTime}
              handleChangeEndTime={handleChangeEndTime}
              handleChangeBreakTime={handleChangeBreakTime}
              handleChangeHoliday={handleChangeHoliday}
              holidays={holidays}
              handleClickInsert={handleClickInsert}
              handleClickDelete={handleClickDelete}
              attendance={attendance}
              setAttendance={setAttendance}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
