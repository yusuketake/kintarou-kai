package com.benkyo.config;

import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class FilterConfig {
    @Bean
    public FilterRegistrationBean<AccessFilter> filterRegistrationBean() {
        FilterRegistrationBean<AccessFilter> registrationBean = new FilterRegistrationBean<>(new AccessFilter());
        registrationBean.setOrder(Integer.MIN_VALUE);
        registrationBean.addUrlPatterns("/api/**", "/login");
        return registrationBean;
    }
}
