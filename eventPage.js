function postData(data) {
    // 接收数据的后端API
    $.post('http://lovchun.com/Group/index', data);
}

chrome.extension.onRequest.addListener(function(request, sender, sendResponse) {

    var data = request.groupList;
    var length = data.length;
    // 分割段数
    var loop_start = 0;
    var loop_end = 0;
    var loop_increment = 150;
    var loop = Math.ceil(length / loop_increment);

    if (loop == 1) {
        postData(request);
    } else {
        for (var i = 0; i < loop; i++) {
            loop_start = loop_end;
            loop_end = loop_end + loop_increment;
            if (loop_end <= length) {
                var loop_data = data.slice(loop_start, loop_end);
            } else {
                var loop_data = data.slice(loop_start);
            }
            postData({
                groupHead: request.groupHead,
                groupMember: request.groupMember,
                groupList: loop_data
            });
        }
    }

    sendResponse({
        'result': 'success'
    });

});
