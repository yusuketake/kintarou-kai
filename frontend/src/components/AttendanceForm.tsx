import { Attendance, Event } from '@/app/calendar';
import { ChangeEvent, useEffect, useRef } from 'react';

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
    attendance: Attendance | null;
    setAttendance: Function; // 厳密に定義するならReact.Dispatch<React.SetStateAction<YourStateType>>
    highliteSelectedDateEvent: Event;
};

export function AttendanceForm(props: Props) {
    // console.log("props.attendance:");
    // console.log(props.attendance?.holidayName);

    const inputref = useRef<HTMLInputElement>(null);
    // TODO 作りかけ：AttendanceFormに入力した状態で他の日付を選択するとAttendanceFormの値が更新されない 1
    // const clearInput = () => {
    //   console.log("clearInput");
    //   console.log(inputref.current?.value);
    //   console.log(
    //     "🚀 ~ clearInput ~ inputref.current?.value:",
    //     inputref.current?.value
    //   );
    //   inputref.current ? (inputref.current.value = null) : {};
    // };

    useEffect(() => {
        console.log('🚀 ~ useEffect ~ useEffect:', useEffect);
        // clearInput();
        console.log(
            '🚀 ~ useEffect ~ props.attendance?.holidayName:',
            props.attendance?.startTime,
        );
    }),
        [props.highliteSelectedDateEvent];

    console.log(props.highliteSelectedDateEvent);

    return (
        <div className="border p-5 rounded shadow">
            <div>
                <div className="flex flex-col">
                    <label>休暇</label>
                    <select
                        onChange={props.handleChangeHoliday}
                        className="mt-1 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        defaultValue={props.attendance?.holidayName}
                        // ref={inputref}
                    >
                        {props.holidays.map((holiday) => (
                            <option key={holiday.id} value={holiday.name}>
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
                        defaultValue={props.attendance?.startTime}
                        onChange={props.handleChangeStartTime}
                        className="mt-1 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        required
                        // ref={inputref}
                    />
                </div>
                <div className="mt-3">
                    <label>終了時間</label>
                    <input
                        type="text"
                        pattern="^(0[0-9]|1[0-9]|2[0-3])([0-5][0-9])?$"
                        placeholder="0000-2359"
                        defaultValue={props.attendance?.endTime}
                        onChange={props.handleChangeEndTime}
                        className="mt-1 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        required
                        // ref={inputref}
                    />
                </div>
                <div className="mt-3">
                    <label>休憩時間</label>
                    <input
                        type="text"
                        pattern="^(0[0-9]|1[0-9]|2[0-3])([0-5][0-9])?$"
                        placeholder="0000-2359"
                        defaultValue={props.attendance?.breakTime}
                        onChange={props.handleChangeBreakTime}
                        className="mt-2 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        required
                        // ref={inputref}
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
}
