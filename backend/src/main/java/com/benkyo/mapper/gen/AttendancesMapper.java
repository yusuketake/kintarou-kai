package com.benkyo.mapper.gen;

import com.benkyo.entity.gen.Attendances;
import java.util.List;

public interface AttendancesMapper {
    int deleteByPrimaryKey(Integer id);

    int insert(Attendances row);

    Attendances selectByPrimaryKey(Integer id);

    List<Attendances> selectAll();

    int updateByPrimaryKey(Attendances row);
}