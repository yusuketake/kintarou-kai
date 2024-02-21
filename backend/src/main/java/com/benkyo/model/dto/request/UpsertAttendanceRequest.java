package com.benkyo.model.dto.request;

import lombok.Data;

@Data
public class UpsertAttendanceRequest {
    int year;
    int month;
    int day;
    String startTime;
    String endTime;
    int holidayId;
    String breakTime;
}
