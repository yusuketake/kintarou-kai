package com.benkyo.mapper.gen;

import com.benkyo.entity.gen.Holidays;
import java.util.List;

public interface HolidaysMapper {
    int deleteByPrimaryKey(Integer id);

    int insert(Holidays row);

    Holidays selectByPrimaryKey(Integer id);

    List<Holidays> selectAll();

    int updateByPrimaryKey(Holidays row);
}