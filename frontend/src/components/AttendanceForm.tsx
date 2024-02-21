'use client';
import axios from 'axios';
import { useEffect, useState } from 'react';

export const AttendanceForm = () => {
  const token = localStorage.getItem('token');

  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [breakTime, setBreakTime] = useState('');
  const [holiday, setHoliday] = useState('');
  const [holidays, setHolidays] = useState([]);

  // 休暇情報の取得
  useEffect(() => {
    axios
      .get('http://localhost:8080/api/holidays', {
        headers: { 'X-AUTH-TOKEN': token },
      })
      .then((res) => {
        setHolidays(res.data);
      });
  }, []);

  const handleInsertAttendance = () => {
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
      .post('http://localhost:8080/api/attendances/insert', data, {
        headers: { 'X-AUTH-TOKEN': token, 'Content-Type': 'application/json' },
      })
      .then(() => {
        alert('登録に成功しました');
      })
      .catch((err) => {
        alert('登録に失敗しました' + err);
      });
  };

  const handleDeleteAttendance = () => {
    const data = {
      year: 2025,
      month: 1,
      day: 27,
    };
    axios
      .delete('http://localhost:8080/api/attendances/delete', {
        headers: { 'X-AUTH-TOKEN': token, 'Content-Type': 'application/json' },
        data: data,
      })
      .then(() => {
        alert('削除に成功しました');
      })
      .catch((err) => {
        alert('削除に失敗しました' + err);
      });
  };

  return (
    <div className='border p-5 rounded shadow'>
      <div>
        <div className="flex flex-col">
          <label>休暇</label>
          <select
            onChange={(event) => {
              setHoliday(event.target.value);
            }}
            className="mt-1 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          >
            {holidays.map((holiday) => (
              <option key={holiday['id']} value={holiday['id']}>
                {holiday['name']}
              </option>
            ))}
          </select>
        </div>
        <div className="mt-3">
          <label>開始時間</label>
          <input
            type="text"
            pattern="^(0[0-9]|1[0-9]|2[0-3])([0-5][0-9])?$"
            placeholder="0000-2359"
            onChange={(event) => setStartTime(event.target.value)}
            className="mt-1 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="mt-3">
          <label>終了時間</label>
          <input
            type="text"
            pattern="^(0[0-9]|1[0-9]|2[0-3])([0-5][0-9])?$"
            placeholder="0000-2359"
            onChange={(event) => setEndTime(event.target.value)}
            className="mt-1 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="mt-3">
          <label>休憩時間</label>
          <input
            type="text"
            pattern="^(0[0-9]|1[0-9]|2[0-3])([0-5][0-9])?$"
            placeholder="0000-2359"
            onChange={(event) => setBreakTime(event.target.value)}
            className="mt-2 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
      </div>
      <div className="flex justify-between">
        <button
          onClick={handleInsertAttendance}
          className="mt-3 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          登録
        </button>
        <button
          onClick={handleDeleteAttendance}
          className="mt-3 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          削除
        </button>
      </div>
    </div>
  );
};
