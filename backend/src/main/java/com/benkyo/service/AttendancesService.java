package com.benkyo.service;

import java.util.List;
import org.springframework.stereotype.Service;
import com.benkyo.dao.AttendanceDao;
import com.benkyo.entity.gen.Attendances;

@Service
public class AttendancesService {
    private AttendanceDao attendanceDao;

    public AttendancesService(AttendanceDao attendanceDao) {
        this.attendanceDao = attendanceDao;
    }

    public Attendances getAttendance(Attendances attendances) throws Exception {
        var attendance = attendanceDao.getAttendance(attendances);
        if (attendance == null) {
            throw new Exception("Not found attendance");
        }
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
