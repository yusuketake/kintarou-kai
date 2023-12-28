package com.benkyo.dao;

import java.util.List;

import org.springframework.stereotype.Repository;

import com.benkyo.entity.gen.Holidays;
import com.benkyo.entity.gen.HolidaysExample;
import com.benkyo.mapper.gen.HolidaysMapper;

@Repository
public class HolidaysDao {
    private HolidaysMapper holidaysMapper;

    public HolidaysDao(HolidaysMapper holidaysMapper) {
        this.holidaysMapper = holidaysMapper;
    }

    public List<Holidays> getHolidayList() {
        var example = new HolidaysExample();
        return holidaysMapper.selectByExample(example);
    }
}
