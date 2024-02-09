package com.benkyo.mapper.gen;

import com.benkyo.entity.gen.Users;
import com.benkyo.entity.gen.UsersExample;
import java.util.List;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

@Mapper
public interface UsersMapper {
    long countByExample(UsersExample example);

    int deleteByExample(UsersExample example);

    int deleteByPrimaryKey(Integer id);

    int insert(Users row);

    int insertSelective(Users row);

    List<Users> selectByExample(UsersExample example);

    Users selectByPrimaryKey(Integer id);

    int updateByExampleSelective(@Param("row") Users row, @Param("example") UsersExample example);

    int updateByExample(@Param("row") Users row, @Param("example") UsersExample example);

    int updateByPrimaryKeySelective(Users row);

    int updateByPrimaryKey(Users row);
}
