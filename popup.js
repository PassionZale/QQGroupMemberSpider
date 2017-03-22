chrome.extension.onRequest.addListener(function(request, sender, sendResponse) {
    var data = request;
    var length = data.length;
    // 分割段数
    var loop_start = -1;
    var loop_increment = 150;
    var loop_end = 0;
    var loop = Math.ceil(length / loop_increment);

    $.ajaxSetup({
        async: false
    });


    if (loop == 1) {
        postData(data);
    } else {
        for (i = 0; i < loop; i++) {
            loop_start = (loop_end + 1);
            loop_end = loop_end + loop_increment;
            if (loop_end <= length) {
                console.log(data.slice(loop_start, loop_end));
            } else {
                console.log(data.slice(loop_start));
            }
        }
    }

});

function postData(data) {
    $.post('http://lovchun.com/Group/index', data);
}
