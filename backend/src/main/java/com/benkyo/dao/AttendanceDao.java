package com.benkyo.dao;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Repository;

import com.benkyo.entity.gen.Attendances;
import com.benkyo.entity.gen.AttendancesExample;
import com.benkyo.mapper.gen.AttendancesMapper;


@Repository
public class AttendanceDao {
    private AttendancesMapper attendancesMapper;

    public AttendanceDao(AttendancesMapper attendancesMapper) {
        this.attendancesMapper = attendancesMapper;
    }

    // 1データだけどlistで返す
    public Attendances getAttendance(Attendances attendances) {
        AttendancesExample example = new AttendancesExample();
        example.createCriteria().andUserIdEqualTo(attendances.getUserId())
                .andYearEqualTo(attendances.getYear()).andMonthEqualTo(attendances.getMonth())
                .andDayEqualTo(attendances.getDay());

        List<Attendances> list = attendancesMapper.selectByExample(example);

        // 指定の条件のデータが存在しているかチェック
        if (list.size() >= 1) {
            return list.get(0);
        } else {
            return null;
        }
    }

    public List<Attendances> getAttendanceListByYearAndMonth(Attendances attendances) {
        AttendancesExample example = new AttendancesExample();
        example.createCriteria().andUserIdEqualTo(attendances.getUserId())
                .andYearEqualTo(attendances.getYear()).andMonthEqualTo(attendances.getMonth());

        return attendancesMapper.selectByExample(example);
    }

    public int insertAttendance(Attendances attendances) {
        return attendancesMapper.insertSelective(attendances);
    }

    public int updateAtendance(Attendances attendances) {
        AttendancesExample example = new AttendancesExample();

        // 年月日をWHEREで指定するcriteria作成
        example.createCriteria().andUserIdEqualTo(attendances.getUserId())
                .andYearEqualTo(attendances.getYear()).andMonthEqualTo(attendances.getMonth())
                .andDayEqualTo(attendances.getDay());

        // WHEREが一致したレコードをupdate
        return attendancesMapper.updateByExampleSelective(attendances, example);
    }

    public int deleteAttendance(Attendances attendances) {
        AttendancesExample example = new AttendancesExample();

        // 年月日をWHEREで指定するcriteria作成
        example.createCriteria().andUserIdEqualTo(attendances.getUserId())
                .andYearEqualTo(attendances.getYear()).andMonthEqualTo(attendances.getMonth())
                .andDayEqualTo(attendances.getDay());

        return attendancesMapper.deleteByExample(example);
    }
}
