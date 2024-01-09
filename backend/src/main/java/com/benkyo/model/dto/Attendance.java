package com.benkyo.model.dto;

import lombok.Data;

@Data
public class Attendance {
    int id;
    int user_id;
    int holiday_id;
    String break_time;
    int year;
    int month;
    String start;
    String end;
}
