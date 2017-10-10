function turnAdd() {
    $.ajax({
        url: '/page/addPoint.html',
        type: 'get',
        dataType: 'html',
        success: function (data) {
            $('.main').html(data);
        },
        error: function () {

        }
    })
};

function turnMap() {
    window.location.href='/'
};

function sub(e) {
    e.preventDefault();
    console.log('submit event1')
    $.post('/addpoint', $('form').serialize(), function (result) {
        if (result != null && result != "") {
            alert('add success');
            console.log('submit event2')
            setTimeout(turnMap(),200)
        } else {
            alert('add fail');
        }
    })
};

