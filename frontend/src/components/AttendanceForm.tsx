import { ChangeEvent } from 'react';

type Holiday = {
  id: number;
  name: string;
};

type Props = {
  handleChangeStartTime: (e: ChangeEvent<HTMLInputElement>) => void;
  handleChangeEndTime: (e: ChangeEvent<HTMLInputElement>) => void;
  handleChangeBreakTime: (e: ChangeEvent<HTMLInputElement>) => void;
  handleChangeHoliday: (e: ChangeEvent<HTMLSelectElement>) => void;
  holidays: Holiday[];
  handleClickInsert: () => void;
  handleClickDelete: () => void;
};

export const AttendanceForm = (props: Props) => {
  return (
    <div className="border p-5 rounded shadow">
      <div>
        <div className="flex flex-col">
          <label>休暇</label>
          <select
            onChange={props.handleChangeHoliday}
            className="mt-1 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          >
            {props.holidays.map((holiday) => (
              <option key={holiday.id} value={holiday.id}>
                {holiday.name}
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
            onChange={props.handleChangeStartTime}
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
            onChange={props.handleChangeEndTime}
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
            onChange={props.handleChangeBreakTime}
            className="mt-2 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
      </div>
      <div className="flex justify-between">
        <button
          onClick={props.handleClickInsert}
          className="mt-3 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          登録
        </button>
        <button
          onClick={props.handleClickDelete}
          className="mt-3 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          削除
        </button>
      </div>
    </div>
  );
};
