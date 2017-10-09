package com.kanyun.myamap.service;

import com.kanyun.myamap.pojo.Mymap;

import java.util.List;

public interface MapService {
    int addPonit(Mymap map);

    List<Mymap> getMap(String[] center);
}
