'use client';

import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import FullCalendar from '@fullcalendar/react';
import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import './style.css';

// 月全体のattendancesの取得はuseEffect
// 日付にクリックしたときの処理はonclickを使用している

type Props = {
    // TODO 親コンポーネントのpage.tsxのattendanceの初期値がundefinedのためエラーになる。それを?もしくはnullで誤魔化しているがいいのか。undefinedのunion型にしたほうがいいのか？
    attendance: Attendance | null; // TODO 上記に関連してnullって指定してもいいのか？
    setAttendance: Function; // 厳密に定義するならReact.Dispatch<React.SetStateAction<YourStateType>>
    highliteSelectedDateEvent: Event[];
    setHighliteSelectedDateEvent: Function;
};

export type Attendance = {
    holidayName: string;
    startTime: number;
    endTime: number;
    breakTime: number;
};

// type Events = {
//   events: Event[];
// };

export type Event = {
    start: string;
    title?: string;
    display?: string;
    color?: string;
};

function DisplayCalendar(props: Props) {
    // console.log("start DisplayCalendar()");

    // 諸々定義
    // fullcalendarオブジェクトを取得するためのref
    const calendarRef = useRef(null);

    const [calendarEvents, setCalendarEvents] = useState<Event[]>([]);
    // const [highliteSelectedDateEvent, setHighliteSelectedDateEvent] = useState<
    //   Event[]
    // >([]);

    const dateObj = new Date();
    const [calendarMonthYear, setCalendarMonthYear] = useState({
        month: dateObj.getMonth() + 1,
        year: dateObj.getFullYear(),
    });
    // console.log(calendarMonthYear);

    // その月のattendancesを取得
    async function getMonthlyevents() {
        // console.log("start getmonthlyevents()");

        const token = localStorage.getItem('token');
        // console.log(
        //   "http://localhost:8080/api/attendances/getAttendanceListByYearAndMonth?year=" +
        //     calendarMonthYear.year +
        //     "&month=" +
        //     calendarMonthYear.month +
        //     ""
        // );
        await axios
            .get(
                `http://localhost:8080/api/attendances/getAttendanceListByYearAndMonth?year=${calendarMonthYear.year}&month=${calendarMonthYear.month}`,
                {
                    headers: {
                        'X-AUTH-TOKEN': token,
                    },
                },
            )
            .then((res) => {
                // 初期化
                const eventList: Event[] = [];
                type element = Record<string, number>;

                res.data.forEach((element: element) => {
                    // データの加工
                    const calendarDay = `${element.year}-${
                        element.month.toString().padStart(2, '0') // padStartは桁数が足りない時に0を入れてくれる
                    }-${element.day.toString().padStart(2, '0')}`;

                    const event = {
                        title: '済',
                        start: calendarDay,
                    };

                    // 最後にeventを全てeventsに入れる
                    eventList.push(event);
                });

                console.log(eventList);
                setCalendarEvents(eventList);
            })
            .catch((error) => {
                console.error(error);
            })
            .finally(() => {});
        // console.log("end getMonthylyEvents()");
    }

    // events取得
    useEffect(() => {
        // clearInput;
        getMonthlyevents();
    }, [calendarMonthYear, props.highliteSelectedDateEvent]);

    // 日付をクリックした時の処理
    // info: { dateStr: string } はfullcalendarの日付をクリックしたときに得られるobjectのtype
    async function getDailyEvevnt(info: { dateStr: string }) {
        // クリックした枠の日付取得
        const calendarClickDate = new Date(info.dateStr);
        const year = calendarClickDate.getFullYear();
        const month = calendarClickDate.getMonth() + 1;
        const day = calendarClickDate.getDate();
        // console.log("click Year:" + year + " Month:" + month + " Day:" + day);

        const token = localStorage.getItem('token');
        // console.log(
        //   "http://localhost:8080/api/attendances/get?year=" +
        //     year +
        //     "&month=" +
        //     month +
        //     "&date=" +
        //     day
        // );
        await axios
            .get(
                `http://localhost:8080/api/attendances/get?year=${year}&month=${month}&date=${day}`,
                {
                    headers: {
                        'X-AUTH-TOKEN': token,
                    },
                },
            )
            .then((res) => {
                props.setAttendance(res.data);
                console.log('🚀 ~ .then ~ res.data:', res.data);
            })
            .catch((error) => {
                console.error(error);
                props.setAttendance(null);
            });
    }

    // calendarで日付を選択した際にマスを赤くする
    function highlightDayOnCalendar(info: { dateStr: string }) {
        const eventList: Event[] = [];
        const dateObj = new Date(info.dateStr);
        const calendarDay = `${dateObj.getFullYear().toString()}-${
            (dateObj.getMonth() + 1).toString().padStart(2, '0') // padStartは桁数が足りない時に0を入れてくれる
        }-${dateObj.getDate().toString().padStart(2, '0')}`;
        const event = {
            start: calendarDay,
            display: 'background',
            color: '#ff0000',
        };
        props.setHighliteSelectedDateEvent(event);
        // setCalendarEvents(calendarEvents.concat(event));
    }

    // FullCalendar のカスタム関数を定義
    const customPrev = () => {
        // console.log("start customPrev:");
        // console.log(calendarMonthYear);
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
        // console.log(calendarMonthYear);
        calendarAPI?.prev();
        // 入力欄を空にする
        props.setAttendance(null);
        // getMonthlyevents();
    };

    function customNext() {
        // console.log("start customNext:");
        // console.log(calendarMonthYear);
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
        // console.log(calendarMonthYear);
        calendarApi?.next();
        // 入力欄を空にする
        props.setAttendance(null);
        // getMonthlyevents();
    }

    function customToday() {
        // console.log("start customToday; ");
        // console.log(calendarMonthYear);
        const calendarApi = calendarRef?.current?.getApi();

        setCalendarMonthYear({
            month: dateObj.getMonth() + 1,
            year: dateObj.getFullYear(),
        });

        console.log(calendarMonthYear);
        calendarApi.today();

        // 入力欄を今日の日付のものにする
        const today = new Date();
        console.log(today);
        props.setAttendance(getDailyEvevnt({ dateStr: today.toString() }));

        // getMonthlyevents();
    }

    // console.log("end DisplayCalendar()");

    const event = {
        start: '2024-03-03',
        end: '2024-03-03',
        display: 'background',
        color: '#ff0000',
    };
    // let event: Event = {
    //   title: "済",
    //   start: "2024-03-03",
    // };

    //   // TODO 作りかけ：AttendanceFormに入力した状態で他の日付を選択するとAttendanceFormの値が更新されない 2
    // const inputref = useRef<HTMLInputElement>(null);
    // const clearInput = () => {
    //   inputref.current ? (inputref.current.value = "") : {};
    // };

    return (
        <div>
            <FullCalendar
                plugins={[dayGridPlugin, interactionPlugin]}
                initialView="dayGridMonth"
                dateClick={(calendarClickInfo) => {
                    getDailyEvevnt(calendarClickInfo);
                    highlightDayOnCalendar(calendarClickInfo);
                    // clearInput;
                }}
                events={calendarEvents.concat(props.highliteSelectedDateEvent)}
                headerToolbar={{
                    left: '',
                    center: 'title',
                    right: 'customPrev,customNext customToday',
                }}
                customButtons={{
                    customPrev: { text: '<', click: customPrev },
                    customNext: { text: '>', click: customNext },
                    customToday: { text: 'today', click: customToday },
                }}
                ref={calendarRef}
            />
            <button onClick={getMonthlyevents}>test</button>
        </div>
    );
}

export default DisplayCalendar;

// https://fullcalendar.io/docs/react
