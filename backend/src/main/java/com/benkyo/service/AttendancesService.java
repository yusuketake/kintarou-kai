package com.benkyo.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.benkyo.dao.AttendanceDao;
import com.benkyo.entity.gen.Attendances;

@Service
public class AttendancesService {
    private AttendanceDao attendanceDao;

    public AttendancesService(AttendanceDao attendanceDao){
        this.attendanceDao = attendanceDao;
    }
    
    public Attendances getAttendance(Attendances attendances){
        return attendanceDao.getAttendance(attendances);
    }
    
    public List<Attendances> getAttendanceListByYearAndMonth(Attendances attendances){
        return attendanceDao.getAttendanceListByYearAndMonth(attendances);
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
