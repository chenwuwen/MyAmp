$(function () {
    // 初始化地图
    // map = new AMap.Map('container', {
    //     resizeEnable: true,
    //     zoom: 11,
    //     center: [116.397428, 39.90923]
    // });
    map = new AMap.Map('container');
    //获取位置
    map.plugin('AMap.Geolocation', function () {
        geolocation = new AMap.Geolocation({
            enableHighAccuracy: true,//是否使用高精度定位，默认:true
            timeout: 10000,          //超过10秒后停止定位，默认：无穷大
            maximumAge: 0,           //定位结果缓存0毫秒，默认：0
            convert: true,           //自动偏移坐标，偏移后的坐标为高德坐标，默认：true
            showButton: true,        //显示定位按钮，默认：true
            buttonPosition: 'LB',    //定位按钮停靠位置，默认：'LB'，左下角
            buttonOffset: new AMap.Pixel(10, 20),//定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
            showMarker: true,        //定位成功后在定位到的位置显示点标记，默认：true
            showCircle: true,        //定位成功后用圆圈表示定位精度范围，默认：true
            panToLocation: true,     //定位成功后将定位到的位置作为地图中心点，默认：true
            zoomToAccuracy:true      //定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
        });
        mapObj.addControl(geolocation);
        geolocation.getCurrentPosition();
        AMap.event.addListener(geolocation, 'complete', onComplete);//返回定位信息
        AMap.event.addListener(geolocation, 'error', onError);      //返回定位出错信息
    });

    function addMarker(provinces) {
        console.log('type：'+ typeof JSON.stringify(provinces));
        console.log(provinces.length);
        var markers = [];
        for (var i = 0,len = provinces.length; i<len; i++) {
            new AMap.Marker({
                map: map,
                title: provinces[i].name,
                position: provinces[i].center.split(','),
            });
        }
        ;
    };

//输入提示
    var autoOptions = {
        input: "keyword"
    };
    var auto = new AMap.Autocomplete(autoOptions);
    var placeSearch = new AMap.PlaceSearch({
        map: map
    });
    AMap.event.addListener(auto, "select", setOverlay);//注册监听，当选中某条记录时会触发
// 根据定位或搜索获取当前位置并将其设为中心点标注出来
    function setOverlay(e) {
        // 清除地图上的点位
        map.clearMap();
        var lat = e.poi.location.lat;
        var lng = e.poi.location.lng;
        lnglat = [lng, lat];
        // 设置缩放级别和中心点
        map.setZoomAndCenter(10, lnglat);
        // 在新中心点添加 marker
        var marker = new AMap.Marker({
            //icon可缺省，缺省时为默认的蓝色水滴图标，
            icon: '/js/mark_rs.png',
            map: map,
            position: lnglat,
        });
        // addCircle(100); //添加圆圈
        getPoint();

    };



    function getPoint() {
        //获取地图中心点经纬度坐标值
        point = map.getCenter();
        console.log('center point :' + JSON.stringify(point))
        var center = [point.lng, point.lat];
        $.ajax({
            url: '/getPoint',
            type: 'get',
            data: {'center': center},
            traditional: true,//这里设置为true,因为ajax发送数组时，参数的名字为XXX[],而不是自己定义的参数名，会导致后台无法接收，加上该配置参数就不带[],并且后台可以接收
            success: function (data) {
                if (data.length > 0) {
                    var provinces = new Array;
                    for (var i = 0; i < data.length; i++) {
                        var obj = new Object();
                        obj.center = data[i].result;
                        obj.name = data[i].name;
                        provinces.push(obj)
                    }
                    addMarker(provinces);
                }
            },
            error: function () {

            }
        })
    };


    AMap.plugin(['AMap.ToolBar'], function() {
        map.addControl(new AMap.ToolBar({
            map: map
        }));
    });

});


