package com.benkyo.restcontroller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.benkyo.model.dto.Holiday;
import com.benkyo.service.HolidaysService;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;


@RequestMapping("/api/holidays")
@RestController
public class HolidaysController {
    private HolidaysService holidaysService;

    public HolidaysController(HolidaysService holidaysService) {
        this.holidaysService = holidaysService;
    }

    @GetMapping("")
    public List<Holiday> getHolidayList() {
        return holidaysService.getHolidayList();
    }
}
