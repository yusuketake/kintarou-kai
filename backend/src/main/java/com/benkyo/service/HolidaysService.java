package com.benkyo.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.benkyo.dao.HolidaysDao;
import com.benkyo.entity.gen.Holidays;

@Service
public class HolidaysService {
    private HolidaysDao holidaysDao;

    public HolidaysService(HolidaysDao holidaysDao) {
        this.holidaysDao = holidaysDao;
    }

    public List<Holidays> getHolidayList() {
        return holidaysDao.getHolidayList();
    }
}
