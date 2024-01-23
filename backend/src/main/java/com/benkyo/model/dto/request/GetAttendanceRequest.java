package com.benkyo.model.dto.request;

import lombok.Data;

@Data
public class GetAttendanceRequest {
    int year;
    int month;
    int day;
}
