package com.benkyo.dao;

import org.springframework.stereotype.Repository;
import com.benkyo.entity.gen.Departments;
import com.benkyo.mapper.gen.DepartmentsMapper;

@Repository
public class DepartmentDao {
    private DepartmentsMapper departmentsMapper;

    public DepartmentDao(DepartmentsMapper departmentsMapper) {
        this.departmentsMapper = departmentsMapper;
    }

    public Departments getDepartment(int id) {
        return departmentsMapper.selectByPrimaryKey(id);
    }
}
