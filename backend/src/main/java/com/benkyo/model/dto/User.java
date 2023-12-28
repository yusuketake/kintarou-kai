package com.benkyo.model.dto;

import lombok.Data;

@Data
public class User {
    Integer id;
    String name;
    String department;
    String loginId;
    String password;
}
