package com.benkyo.model.dto;

import lombok.Data;

@Data
public class Attendance {
    private Integer attendanceId;

    // private Integer userId;

    private String holidayName;

    private Integer year;

    private Integer month;

    private Integer day;

    private String startTime;

    private String endTime;

    private String breakTime;

    private Boolean isEntered;
}
