package com.benkyo.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import com.benkyo.dao.HolidaysDao;
import com.benkyo.model.dto.Holiday;

@Service
public class HolidaysService {
    private HolidaysDao holidaysDao;

    public HolidaysService(HolidaysDao holidaysDao) {
        this.holidaysDao = holidaysDao;
    }

    public List<Holiday> getHolidayList() {
        List<Holiday> holidayList = new ArrayList<>();
        holidaysDao.getHolidayList().stream().forEach(holidayEntity -> {
            Holiday holiday = new Holiday();
            holiday.setId(holidayEntity.getId());
            holiday.setName(holidayEntity.getName());
            holidayList.add(holiday);
        });

        return holidayList;
    }
}
