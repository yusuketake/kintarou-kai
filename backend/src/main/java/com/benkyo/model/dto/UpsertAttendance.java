package com.benkyo.model.dto;

import lombok.Data;

@Data
public class UpsertAttendance {
    int year;
    int month;
    int day;
    String startTime;
    String endTime;
}
