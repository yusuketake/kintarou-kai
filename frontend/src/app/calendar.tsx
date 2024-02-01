"use client";

import React from "react";
import "./style.css";
import { Calendar } from "@fullcalendar/core";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import axios from "axios";

class DisplayCalendar extends React.Component {
  render() {
    const userAPI = () => {
      const token = localStorage.getItem("token");
      axios
        .get("http://localhost:8080/api/users/getList", {
          headers: { "X-AUTH-TOKEN": token },
        })
        .then((res) => {
          console.log(res);
        });
    };
    return (
      <div>
        <FullCalendar
          plugins={[dayGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          dateClick={this.handleDateClick}
        />
        <button onClick={userAPI}>test</button>
      </div>
    );
  }

  handleDateClick = (info: { dateStr: string }) => {
    alert("Clicked on: " + info.dateStr);

    let date = info.dateStr;

    // APIにpostしてその日のAttendanceを取得して表示する
  };
}

export default DisplayCalendar;

// https://fullcalendar.io/docs/react
