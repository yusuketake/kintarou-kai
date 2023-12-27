package com.benkyo.mapper.gen;

import com.benkyo.entity.gen.Departments;
import java.util.List;

public interface DepartmentsMapper {
    int deleteByPrimaryKey(Integer id);

    int insert(Departments row);

    Departments selectByPrimaryKey(Integer id);

    List<Departments> selectAll();

    int updateByPrimaryKey(Departments row);
}