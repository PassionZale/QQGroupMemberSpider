var innerHTML = "<button id='extention-export-btn'>导出成员</button>";

var url = window.location.href;

var matcheFlag = false;
var groupHead = {
        group_name: '',
        group_number: ''
    },
    groupMember = {
        member_nums: 0,
        admin_nums: 0
    },
    groupList = [];

var validateQQGroupDomain = url.indexOf('http://qun.qzone.qq.com');
var validateQQGroupMember = url.indexOf('member');
if (validateQQGroupDomain == 0 && validateQQGroupMember > 0) {
    matcheFlag = true;
}

function dd(param) {
    console.log(param);
}

function spiderStart(msg) {
    groupHead = {
            group_name: '',
            group_number: ''
        },
        groupMember = {
            member_nums: 0,
            admin_nums: 0
        },
        groupList = [];

    msg = msg || '数据读取开始，请勿关闭或跳转当前页面...';
    var innerHTML = '<div id="spider-notification" style="position:fixed;top:0;right:0;left:0;bottom:0;background:#000;opacity:0.7;z-index:6666;overflow-y:auto;">';
    innerHTML += '<p id="spider-start" style="width:100%;text-align:center;color:#fff;z-index:7777;font-size:26px;margin-top:200px;">';
    innerHTML += msg;
    innerHTML += '</p>';
    innerHTML += '<div id="spider-end" style="display:none"></div>';
    innerHTML += '<div id="spider-progeress"></div>';
    innerHTML += '<div id="spider-finish" style="display:none"></div>';
    innerHTML += '</div>';
    $(innerHTML).appendTo('body');
}

function spiderProgress(index) {
    var innerHTML = '<p style="width:100%;text-align:center;color:#fff;z-index:7777;font-size:12px;">第 <span style="color:#c00;font-size:16px;">' + (index + 1) + '</span> 条数据读取完毕</p>';
    $('#spider-start').fadeOut();
    $(innerHTML).appendTo('#spider-progeress');
}

function spiderEnd(msg) {
    msg = msg || '数据读取完毕，开始上传至服务器，请勿关闭或跳转当前页面...';
    var innerHTML = '<p style="width:100%;text-align:center;color:#c00;z-index:7777;font-size:26px;margin-top:200px;">';
    innerHTML += msg;
    innerHTML += '</p>';
    $(innerHTML).appendTo('#spider-end');
    $('#spider-progeress').fadeOut(2000, function() {
        $('#spider-end').fadeIn();
    });
}

function spiderFinish(msg) {
    msg = msg || '上传服务器成功，退出程序中...';
    var innerHTML = '<p style="width:100%;text-align:center;color:green;z-index:7777;font-size:26px;margin-top:200px;">';
    innerHTML += msg;
    innerHTML += '<p>';
    $(innerHTML).appendTo('#spider-finish');
    $('#spider-end').fadeOut(3000, function() {
        $('#spider-finish').fadeIn();
        setTimeout(function() {
            $('#spider-notification').remove();
        }, 3000);
    });
}

$(function() {
    $(innerHTML).appendTo($('#group_header_container .nav'));

    $('#extention-export-btn').on('click', function() {
        spiderStart();
        if (matcheFlag) {
            // 群名称&群号码
            groupHead.group_name = $('#group_header_container .group_name span').html();
            var urlArr = url.split('/');
            groupHead.group_number = urlArr[4];
            dd(groupHead);
            // 群成员&管理员人数
            groupMember.member_nums = $('#content_main_container .info').first().find('span').html();
            groupMember.admin_nums = $('#content_main_container .info').last().find('span').html();
            dd(groupMember)
                // 群成员数据
            var $memberList = $('#content_main_container .s_members_list li');
            $.each($memberList, function(index, member) {
                var tmp_member_id = $(member).find('.member_id').text();
                var member_id = tmp_member_id.substring(1, tmp_member_id.length - 1);
                var memberObj = {
                    member_avatar: $(member).find('img').attr('src'),
                    member_name: $(member).find('.member_name').text(),
                    member_number: member_id,
                    member_role: $(member).find('.member_role').text()
                };
                groupList.push(memberObj);
                spiderProgress(index);
            });
            dd(groupList);
            spiderEnd();
            chrome.extension.sendRequest({
                groupHead,
                groupMember,
                groupList
            }, function(response) {
                console.log();
                spiderFinish();
            });
        } else {
            console.log('网址不匹配！');
        }
    });
});
