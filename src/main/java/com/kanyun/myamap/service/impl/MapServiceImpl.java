package com.kanyun.myamap.service.impl;

import com.kanyun.myamap.pojo.Mymap;
import com.kanyun.myamap.dao.MymapMapper;
import com.kanyun.myamap.service.MapService;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;

@Service
public class MapServiceImpl implements MapService {
    @Resource
    private MymapMapper mapMapper;

    @Override
    public int addPonit(Mymap map) {
        int k = mapMapper.insert(map);
        return k;
    }

    @Override
    public List<Mymap> getMap(String[] center) {
        List<Mymap> mymaps = mapMapper.getAllMap();
        return mymaps;
    }
}
