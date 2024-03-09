"use client";

import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import FullCalendar from "@fullcalendar/react";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
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
  console.log("start DisplayCalendar()");
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
  const dateObj = new Date();
  const [calendarMonthYear, setCalendarMonthYear] = useState({
    month: dateObj.getMonth() + 1,
    year: dateObj.getFullYear(),
  });
  console.log(calendarMonthYear);

  type Events = {
    events: Event[];
  };
  type Event = {
    title: string;
    start: string;
  };

  // その月のattendancesを取得
  async function getMonthlyevents() {
    console.log("start getmonthlyevents()");

    const token = localStorage.getItem("token");
    console.log(
      "http://localhost:8080/api/attendances/getAttendanceListByYearAndMonth?year=" +
        calendarMonthYear.year +
        "&month=" +
        calendarMonthYear.month +
        ""
    );
    await axios
      .get(
        "http://localhost:8080/api/attendances/getAttendanceListByYearAndMonth?year=" +
          calendarMonthYear.year +
          "&month=" +
          calendarMonthYear.month +
          "",
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

        console.log(eventList);
        setCalendarEvents(eventList);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {});
  }

  // events取得
  useEffect(() => {
    getMonthlyevents();
  }, []);

  // 日付をクリックした時の処理
  async function getDailyEvevnt(info: { dateStr: string }) {
    // クリックした枠の日付取得
    const calendarClickDate = new Date(info.dateStr);
    const year = calendarClickDate.getFullYear();
    const month = calendarClickDate.getMonth() + 1;
    const day = calendarClickDate.getDate();
    console.log("click Year:" + year + " Month:" + month + " Day:" + day);

    const token = localStorage.getItem("token");
    await axios
      .get(
        "http://localhost:8080/api/attendances/get?year=" +
          year +
          "&month=" +
          month +
          "&date=" +
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
      })
      .catch((error) => {
        console.error(error);
        props.setAttendance(null);
      });
  }
  const calendarRef = useRef(null);

  // FullCalendar のカスタム関数を定義
  const customPrev = () => {
    console.log("start customPrev:");
    console.log(calendarMonthYear);
    const calendarAPI = calendarRef?.current?.getApi();
    if (calendarMonthYear.month == 1) {
      setCalendarMonthYear({
        month: 12,
        year: calendarMonthYear.year - 1,
      });
    } else {
      setCalendarMonthYear({
        month: calendarMonthYear.month - 1,
        year: calendarMonthYear.year,
      });
    }
    console.log(calendarMonthYear);
    calendarAPI?.prev();
    // getMonthlyevents();
  };

  function customNext() {
    console.log("start customNext:");
    console.log(calendarMonthYear);
    const calendarApi = calendarRef?.current?.getApi();
    if (calendarMonthYear.month == 12) {
      setCalendarMonthYear({
        month: 1,
        year: calendarMonthYear.year + 1,
      });
    } else {
      setCalendarMonthYear({
        month: calendarMonthYear.month + 1,
        year: calendarMonthYear.year,
      });
    }
    console.log(calendarMonthYear);
    calendarApi?.next();
    // getMonthlyevents();
  }

  function customToday() {
    console.log("start customToday; ");
    console.log(calendarMonthYear);
    const calendarApi = calendarRef?.current?.getApi();

    setCalendarMonthYear({
      month: dateObj.getMonth() + 1,
      year: dateObj.getFullYear(),
    });

    console.log(calendarMonthYear);
    calendarApi.today();
    // getMonthlyevents();
  }

  console.log("end DisplayCalendar()");

  return (
    <div>
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        dateClick={getDailyEvevnt}
        events={calendarEvents}
        headerToolbar={{
          left: "",
          center: "title",
          right: "customPrev,customNext customToday",
        }}
        customButtons={{
          customPrev: { text: "<", click: customPrev },
          customNext: { text: ">", click: customNext },
          customToday: { text: "today", click: customToday },
        }}
        ref={calendarRef}
      />
      <button onClick={getMonthlyevents}>test</button>
    </div>
  );
}

export default DisplayCalendar;

// https://fullcalendar.io/docs/react
