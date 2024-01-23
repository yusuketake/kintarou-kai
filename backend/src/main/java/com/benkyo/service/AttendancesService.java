package com.benkyo.service;

import java.util.List;
import org.springframework.stereotype.Service;
import com.benkyo.dao.AttendanceDao;
import com.benkyo.dao.HolidaysDao;
import com.benkyo.entity.gen.Attendances;
import com.benkyo.model.dto.Attendance;

@Service
public class AttendancesService {
    private AttendanceDao attendanceDao;
    private HolidaysDao holidaysDao;

    public AttendancesService(AttendanceDao attendanceDao, HolidaysDao holidaysDao) {
        this.attendanceDao = attendanceDao;
        this.holidaysDao = holidaysDao;
    }

    public Attendance getAttendance(Attendances attendances) throws Exception {
        System.out.println(attendances.getHolidayId());
        attendances = attendanceDao.getAttendance(attendances);
        if (attendances == null) {
            throw new Exception("Not found attendance");
        }
        Attendance attendance = new Attendance();
        System.out.println(attendances.getHolidayId());
        System.out.println(attendances.getId());

        if (attendances.getHolidayId() != null) {
            var holidayNameList = holidaysDao.getHolidayName(attendances.getHolidayId());
            attendance.setHolidayName(holidayNameList.get(0).getName());
        }

        attendance.setAttendanceId(attendances.getId());
        attendance.setYear(attendances.getYear());
        attendance.setMonth(attendances.getMonth());
        attendance.setDay(attendances.getDay());
        attendance.setStartTime(attendances.getStartTime());
        attendance.setEndTime(attendances.getEndTime());
        attendance.setBreakTime(attendances.getBreakTime());
        attendance.setIsEntered(attendances.getIsEntered());

        return attendance;
    }

    public List<Attendances> getAttendanceListByYearAndMonth(Attendances attendances)
            throws Exception {
        var attendanceList = attendanceDao.getAttendanceListByYearAndMonth(attendances);
        if (attendanceList == null) {
            throw new Exception("not found attendance list");
        }
        return attendanceList;
    }

    public int insertAttendance(Attendances attendances) throws Exception {
        // attendanceの存在チェック
        Attendances exists = attendanceDao.getAttendance(attendances);
        if (exists != null) {
            throw new Exception("attendance already exists");
        }

        return attendanceDao.insertAttendance(attendances);
    }

    public int updateAttendance(Attendances attendances) throws Exception {
        // attendanceの存在チェック
        Attendances exists = attendanceDao.getAttendance(attendances);
        if (exists == null) {
            throw new Exception("attendance doesn't exists");
        }
        return attendanceDao.updateAtendance(attendances);
    }

    public int deleteAttendance(Attendances attendances) throws Exception {
        // attendanceの存在チェック
        Attendances exists = attendanceDao.getAttendance(attendances);
        if (exists == null) {
            throw new Exception("attendance doesn't exists");
        }
        return attendanceDao.deleteAttendance(attendances);
    }
}
