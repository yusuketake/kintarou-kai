package com.benkyo.service;

import org.springframework.stereotype.Service;

import com.benkyo.dao.AttendanceDao;
import com.benkyo.entity.gen.Attendances;

@Service
public class AttendancesService {
    private AttendanceDao attendanceDao;

    public AttendancesService(AttendanceDao attendanceDao){
        this.attendanceDao = attendanceDao;
    }

    public int insertAttendance(Attendances attendances){
        return attendanceDao.insertAttendance(attendances);
    }

    public int updateAttendance(Attendances attendances){
        return attendanceDao.updateAtendance(attendances);
    }

    public int deleteAttendance(Attendances attendances){
        return attendanceDao.deleteAttendance(attendances);
    }
}
