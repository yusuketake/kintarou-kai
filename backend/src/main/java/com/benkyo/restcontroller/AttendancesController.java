package com.benkyo.restcontroller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.benkyo.dao.AttendanceDao;
import com.benkyo.entity.gen.Attendances;
import com.benkyo.model.dto.Attendance;
import com.benkyo.service.AttendancesService;

@RequestMapping("/api/attendances")
@RestController
public class AttendancesController {
    private AttendancesService attendancesService;
    private Attendances attendances;
    // private AttendanceDao attendanceDao;

    // attendancesDaoやattendancesはコンストラクタで初期化しなくて大丈夫だよね？
    public AttendancesController(AttendancesService attendancesService){
        this.attendancesService = attendancesService;
    }

    @GetMapping("get/{year}{month}{day}")

    @PostMapping("insert/{userId}/{year}{month}{day}")
    public int insertAttendance(
        @RequestBody @PathVariable int userId,
        @RequestBody @PathVariable int year,
        @RequestBody @PathVariable int month,
        @RequestBody @PathVariable int day){
            
            attendances.setId(userId);
            attendances.setYear(year);
            attendances.setMonth(month);
            attendances.setDay(day);
            
            return attendancesService.insertAttendance(attendances);
    }

    @PutMapping("update/{userId}/{year}{month}{day}")
    public int updateAttendance(
        @RequestBody @PathVariable int userId,
        @RequestBody @PathVariable int year,
        @RequestBody @PathVariable int month,
        @RequestBody @PathVariable int day){
        
            attendances.setId(userId);
            attendances.setYear(year);
            attendances.setMonth(month);
            attendances.setDay(day);

            return attendancesService.updateAttendance(attendances);
    }
    
    @PostMapping("delete/{userId}/{year}{month}{day}")
    public int deleteAttendance(
        @RequestBody @PathVariable int userId,
        @RequestBody @PathVariable int year,
        @RequestBody @PathVariable int month,
        @RequestBody @PathVariable int day){

            attendances.setId(userId);
            attendances.setYear(year);
            attendances.setMonth(month);
            attendances.setDay(day);

            return attendancesService.deleteAttendance(attendances);

        }
    
    
}
