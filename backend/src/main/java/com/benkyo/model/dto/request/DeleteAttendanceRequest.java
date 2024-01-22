package com.benkyo.model.dto.request;

import lombok.Data;

@Data
public class DeleteAttendanceRequest {
    int year;
    int month;
    int day;
}
