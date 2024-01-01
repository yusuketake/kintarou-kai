"use client";

import React from "react";
import "./style.css";
import { Calendar } from "@fullcalendar/core";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";

class DisplayCalendar extends React.Component {
  render() {
    return (
      <div>
        <FullCalendar
          plugins={[dayGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          dateClick={this.handleDateClick}
        />
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
