package com.benkyo.restcontroller;

import java.util.*;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class testAPI {

    @GetMapping("/")
    public List<String> get() {
        List<String> list = new ArrayList<>(Arrays.asList("あ", "い", "う", "え", "お"));
        return list;
    }
}