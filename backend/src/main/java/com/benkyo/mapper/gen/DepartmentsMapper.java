package com.benkyo.mapper.gen;

import com.benkyo.entity.gen.Departments;
import com.benkyo.entity.gen.DepartmentsExample;
import java.util.List;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

@Mapper
public interface DepartmentsMapper {
    long countByExample(DepartmentsExample example);

    int deleteByExample(DepartmentsExample example);

    int deleteByPrimaryKey(Integer id);

    int insert(Departments row);

    int insertSelective(Departments row);

    List<Departments> selectByExample(DepartmentsExample example);

    Departments selectByPrimaryKey(Integer id);

    int updateByExampleSelective(@Param("row") Departments row, @Param("example") DepartmentsExample example);

    int updateByExample(@Param("row") Departments row, @Param("example") DepartmentsExample example);

    int updateByPrimaryKeySelective(Departments row);

    int updateByPrimaryKey(Departments row);
}