package com.kanyun.myamap.controller;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.kanyun.myamap.pojo.Mymap;
import com.kanyun.myamap.service.MapService;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.annotation.Resource;
import java.util.ArrayList;
import java.util.List;


@Controller
public class MapController {

    @Resource
    private MapService mapService;

    @RequestMapping("/addpoint")
    @ResponseBody
    public Integer addpoint(Mymap map) {
        List list = new ArrayList<>();
//        list.add(Double.parseDouble(map.getLongitude()));
//        list.add(Double.parseDouble(map.getLatitude()));
//        map.setResult(JSONObject.toJSONString(list));
        map.setResult(Double.parseDouble(map.getLongitude())+","+Double.parseDouble(map.getLatitude()));
        int k = mapService.addPonit(map);
        return k;
    }

    @RequestMapping("/getPoint")
    @ResponseBody
    public List<Mymap> getPoint(String[] center){
        List<Mymap> mymaps = mapService.getMap(center);
        return mymaps;
    }
}
