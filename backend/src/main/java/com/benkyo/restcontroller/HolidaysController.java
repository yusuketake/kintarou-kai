package com.benkyo.restcontroller;

import java.util.List;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.benkyo.model.dto.Holiday;
import com.benkyo.service.HolidaysService;


@RequestMapping("/api/holidays")
@RestController
public class HolidaysController {
    private HolidaysService holidaysService;

    public HolidaysController(HolidaysService holidaysService) {
        this.holidaysService = holidaysService;
    }

    @GetMapping("")
    public ResponseEntity<List<Holiday>> getHolidayList() {
        return ResponseEntity.ok().body(holidaysService.getHolidayList());
    }
}
