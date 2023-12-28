package com.benkyo.mapper.gen;

import com.benkyo.entity.gen.Holidays;
import com.benkyo.entity.gen.HolidaysExample;
import java.util.List;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

@Mapper
public interface HolidaysMapper {
    long countByExample(HolidaysExample example);

    int deleteByExample(HolidaysExample example);

    int deleteByPrimaryKey(Integer id);

    int insert(Holidays row);

    int insertSelective(Holidays row);

    List<Holidays> selectByExample(HolidaysExample example);

    Holidays selectByPrimaryKey(Integer id);

    int updateByExampleSelective(@Param("row") Holidays row, @Param("example") HolidaysExample example);

    int updateByExample(@Param("row") Holidays row, @Param("example") HolidaysExample example);

    int updateByPrimaryKeySelective(Holidays row);

    int updateByPrimaryKey(Holidays row);
}