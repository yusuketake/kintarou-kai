package com.benkyo.mapper.gen;

import com.benkyo.entity.gen.Attendances;
import com.benkyo.entity.gen.AttendancesExample;
import java.util.List;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

@Mapper
public interface AttendancesMapper {
    long countByExample(AttendancesExample example);

    int deleteByExample(AttendancesExample example);

    int deleteByPrimaryKey(Integer id);

    int insert(Attendances row);

    int insertSelective(Attendances row);

    List<Attendances> selectByExample(AttendancesExample example);

    Attendances selectByPrimaryKey(Integer id);

    int updateByExampleSelective(@Param("row") Attendances row,
            @Param("example") AttendancesExample example);

    int updateByExample(@Param("row") Attendances row,
            @Param("example") AttendancesExample example);

    int updateByPrimaryKeySelective(Attendances row);

    int updateByPrimaryKey(Attendances row);
}
