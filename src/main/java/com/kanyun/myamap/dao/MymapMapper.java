package com.kanyun.myamap.dao;

import com.kanyun.myamap.pojo.Mymap;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface MymapMapper {
    int deleteByPrimaryKey(Integer id);

    int insert(Mymap record);

    int insertSelective(Mymap record);

    Mymap selectByPrimaryKey(Integer id);

    List<Mymap> getAllMap();

    int updateByPrimaryKeySelective(Mymap record);

    int updateByPrimaryKey(Mymap record);
}