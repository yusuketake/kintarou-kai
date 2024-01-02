package com.benkyo.dao;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Repository;

import com.benkyo.entity.gen.Attendances;
import com.benkyo.entity.gen.AttendancesExample;
import com.benkyo.mapper.gen.AttendancesMapper;
import com.benkyo.model.dto.Attendance;

@Repository
public class AttendanceDao {
    private AttendancesMapper attendancesMapper;

    public AttendanceDao(AttendancesMapper attendancesMapper){
        this.attendancesMapper = attendancesMapper;
    }

    public Attendances getAttendance(Attendances attendances){
        AttendancesExample example = new AttendancesExample();
        example.createCriteria()
            .andUserIdEqualTo(attendances.getUserId())
            .andYearEqualTo(attendances.getYear())
            .andMonthEqualTo(attendances.getMonth())
            .andDayEqualTo(attendances.getDay());
        List<Attendances> list = attendancesMapper.selectByExample(example);
        return list.get(1);
    }

    public List<Attendances> getAttendanceListByYearAndMonth(Attendances attendances){
        AttendancesExample example = new AttendancesExample();
        example.createCriteria()
            .andUserIdEqualTo(attendances.getUserId())
            .andYearEqualTo(attendances.getYear())
            .andMonthEqualTo(attendances.getMonth());
        List<Attendances> list = attendancesMapper.selectByExample(example);
        return list;
    }

    public int insertAttendance(Attendances attendances){
        return attendancesMapper.insert(attendances);
    }

    public int updateAtendance(Attendances attendances){
        AttendancesExample example = new AttendancesExample();

        // 年月日をWHEREで指定するcriteria作成
        example.createCriteria()
            .andUserIdEqualTo(attendances.getUserId())
            .andYearEqualTo(attendances.getYear())
            .andMonthEqualTo(attendances.getMonth())
            .andDayEqualTo(attendances.getDay());            

        // WHEREが一致したレコードをupdate
        return attendancesMapper.updateByExample(attendances,example);
    }

    public int deleteAttendance(Attendances attendances){
        AttendancesExample example = new AttendancesExample();

        // 年月日をWHEREで指定するcriteria作成
        example.createCriteria()
            .andUserIdEqualTo(attendances.getUserId())
            .andYearEqualTo(attendances.getYear())
            .andMonthEqualTo(attendances.getMonth())
            .andDayEqualTo(attendances.getDay());            

        return attendancesMapper.deleteByExample(example);
    }
}
