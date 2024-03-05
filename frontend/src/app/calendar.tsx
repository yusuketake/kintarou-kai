"use client";

import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import FullCalendar from "@fullcalendar/react";
import axios from "axios";
import { useEffect, useState } from "react";
import "./style.css";

type Props = {
  // TODO 親コンポーネントのpage.tsxのattendanceの初期値がundefinedのためエラーになる。それを?もしくはnullで誤魔化しているがいいのか。undefinedのunion型にしたほうがいいのか？
  attendance: Attendance | null; // TODO 上記に関連してnullって指定してもいいのか？
  setAttendance: Function; // 厳密に定義するならReact.Dispatch<React.SetStateAction<YourStateType>>
};
export type Attendance = {
  holidayName: string;
  startTime: number;
  endTime: number;
  breakTime: number;
};

function DisplayCalendar(props: Props) {
  console.log("start function()");
  const userAPI = () => {
    const token = localStorage.getItem("token");
    axios
      .get("http://localhost:8080/api/users/getList", {
        headers: {
          "X-AUTH-TOKEN": token,
        },
      })
      .then((res) => {
        console.log(res);
      });
  };

  // fullcalendarのためのevents格納用配列の初期化
  // let events: Event[] = [];
  const [calendarEvents, setCalendarEvents] = useState({});
  // let calendarEvents = {} as Events;

  type Events = {
    events: Event[];
  };
  type Event = {
    title: string;
    start: string;
  };

  // API取得用の関数
  async function monthlyevents() {
    console.log("start monthlyevents()");

    console.log("axios start");
    const token = localStorage.getItem("token");
    await axios
      .get(
        "http://localhost:8080/api/attendances/getAttendanceListByYearAndMonth?year=2024&month=3",
        {
          headers: {
            "X-AUTH-TOKEN": token,
          },
        }
      )
      .then((res) => {
        // 初期化
        let eventList: Event[] = [];
        type element = Record<string, number>;

        res.data.forEach((element: element) => {
          // データの加工
          let calendarDay =
            element["year"] +
            "-" +
            element["month"].toString().padStart(2, "0") + // padStartは桁数が足りない時に0を入れてくれる
            "-" +
            element["day"].toString().padStart(2, "0");

          let event = {
            title: "済",
            start: calendarDay,
          };

          let attendance = {
            holidayId: element["holiday_id"],
            startTime: element["start_time"],
            endTime: element["end_time"],
            breakTime: element["break_time"],
          };

          // 最後にeventを全てeventsに入れる
          eventList.push(event);
        });

        setCalendarEvents(eventList);
      })
      .catch((res) => {
        // console.log(res);
      })
      .finally(() => {
        console.log("finally↓");
      });
  }

  // events取得
  useEffect(() => {
    monthlyevents();
  }, []);

  // カレンダー操作時
  // const handleDateClick = (info: { dateStr: string }) => {
  //   alert("Clicked on: " + info.dateStr);

  //   let date = info.dateStr;

  //   // APIにpostしてその日のeventを取得して表示する
  // };

  // 日付をクリックした時の処理
  async function getDailyEvevnt(info: { dateStr: string }) {
    // クリックした枠の日付取得
    const day = new Date(info.dateStr).getDate();
    console.log("clickDay:" + day);

    const token = localStorage.getItem("token");
    await axios
      .get(
        "http://localhost:8080/api/attendances/get?year=2024&month=3&date=" +
          day,
        {
          headers: {
            "X-AUTH-TOKEN": token,
          },
        }
      )
      .then((res) => {
        props.setAttendance(res.data);
        console.log(props.attendance);
      });
  }

  return (
    <div>
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        dateClick={getDailyEvevnt}
        events={calendarEvents}
      />
      <button onClick={monthlyevents}>test</button>
    </div>
  );
}

export default DisplayCalendar;

// https://fullcalendar.io/docs/react
