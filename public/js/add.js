//博客全文
function commentes(dat) {
    $.ajax({
        type: 'get',
        url: 'http://10.1.9.232:1235/add',
        changeOrigin: true,
        data: {
            id: dat
        },
        success: function (data) {
            var tr =
                '<div class="nr_left_left"><img src="./textimages/' + data.cb.blogImg + '"></div>\
            <div class="nr_left_right">\
                <div>\
                    <a class="nr_blogname">'+ data.cb.blogName + '</a><span>发布于:' + data.cb.times + '</span>\
                </div>\
                <span><a class="nr_left_h">'+ data.cb.title + '</a></span><div class="nr_blogget">个人博客：[<a href="">心得笔记</a>]</div>\
                <div class="nr_left_db">\
                    <div class="a">\
                        <div><i>'+ data.cb.text + '</i></div>\
                        <img class="nr_db_imgg" src="./textimages/'+ data.cb.img + '">\
                    </div>\
                </div>\
            </div>\
            <div>\
                <form>\
                    <input id="autuor" name="blongName" type="hidden" value="'+ data.cb._id + '">\
                    <input id="blongName" name="blongName" type="hidden" value="'+ data.cb.author._id + '">\
                    <textarea id="commentes" class="form-control" rows="1" style="resize:none" name="comment"></textarea>\
                    <button  type="button" class="btn btn-default btn-xs"style="float: right;" onclick="db()">评论</button>\
                </form>\
            </div>'
            $("#apo").html(tr);
            for (var i = data.us.length - 1; i >= data.us.length - 6; i--) {
                var td = '<div class="Conmment"><div class="bolg_comment">\
                    <div style="width: 60px; float: left;">\
                         <img  class="media-object media-object_img1"src="./textimages/'+ data.us[i].author.img + '">\
                    </div>\
                    <div style="font-size: 18px;">\
                     <span class="redname"></span>'+ data.us[i].author.bname + '<span>:' + data.us[i].comment + '</span>\
                        <div style="font-size: 14px; margin: 5px;">\
                             <span>'+ data.us[i].times + '</span>\
                             <span class="bolg_time"><a onclick="reply('+ `'` + data.us[i]._id + `',` + i + ')" >回复</a>|<a>点赞</a></span>\
                        </div>\
                    </div>\
                    </div>\
                    <div class="reqly reply'+ i + '" style="display:none;"><form>\
                        <input class="rid'+ i + '" name="blongName" type="hidden" value="' + data.us[i]._id + '">\
                        <textarea id="reqqq" class="form-control replyss'+ i + '" class="form-control" rows="1" style="resize:none" name="reply"></textarea>\
                        <button  type="button" class="btn btn-default btn-xs"style="float: right;" onclick="replies('+ i + ')">回复</button>\
                        </form>\
                        <div class="reggg'+ i + '"></div>\
                    </div></div>'
                $("#adp").append(td)
            }
        }
    })
}
//评论
function db(dataa) {
    if ($('#apo').attr('data') == 0) {
        alert('登录有才能评论')
    } else if ($("#commentes").val() == "") {
        alert('不能为空')
    } else {
        $.ajax({
            type: 'post',
            url: 'http://10.1.9.232:1235/add/comment',
            changeOrigin: true,
            data: {
                comment: $("#commentes").val(),
                blongName: $("#blongName").val(),
                autuor: $("#autuor").val(),
            },
            success: function (data) {
                var td = '<div class="Conmment"><div class="bolg_comment">\
                <div style="width: 60px; float: left;">\
                     <img width="50px" style="display:inline;" class="media-object "src="./textimages/'+ data.img + '">\
                </div>\
                <div style="font-size: 18px;">\
                 <span class="redname"></span>'+ data.name + '<span>:' + data.commentText.comment + '</span>\
                    <div style="font-size: 14px; margin: 5px;">\
                         <span>'+ data.commentText.times + '</span>\
                         <span class="bolg_time"><a  >回复</a>|<a>点赞</a></span>\
                    </div>\
                </div>\
            </div>\
            </div>'
                $("#adp").prepend(td);
                $("#commentes").val("")
            }
        })
    }
}
//回复评论
function reply(e, i) {
    if ($('#apo').attr('data') == 0) {
        $(".reply" + i).css("display", "none")
    } else {
        $(".reply" + i).css("display", "block")
    }
    $.ajax({
        type: 'post',
        url: 'http://10.1.9.232:1235/reply',
        changeOrigin: true,
        data: {
            e: e,
            i: i,
        },
        success: function (data) {
            var gg = ($(".reggg" + i));
            for (var k = data.length - 1; k >= data.length - 4; k--) {
                var aa = '<div> <div style="width: 40px; float: left; padding:5px ">\
            <img class="media-object media-object_img "src="./textimages/'+data[k].author.img+'">\
           </div>\
           <div style="font-size: 14px;">\
            <span class="redname"></span>'+ data[k].author.bname + '回复<i style="color:red;">'+data[k].blogComment.author.bname+'</i><span>:' + data[k].reply + '</span>\
           </div></div>'
                gg.append(aa)
            }
        }
    })
}
//回复评论渲染
function replies(i) {
    if ($('#apo').attr('data') == 0) {
        $(".reply" + i).css("display", "none")
    } else {
        $(".reply" + i).css("display", "block")
        $.ajax({
            type: 'post',
            url: 'http://10.1.9.232:1235/reply/replies',
            changeOrigin: true,
            data: {
                reply: $(".replyss" + i).val(),
                blogComment: $(".rid" + i).val(),
            },
            success: function (data) {
                var gg = ($(".reggg" + i));
                var bb = '<div> <div style="width: 40px; float: left; padding:5px;">\
            <img class="media-object media-object_img "src="./textimages/'+ data.img + '">\
           </div>\
           <div style="font-size: 14px;">\
            <span class="redname"></span> '+ data.name + '回复<i style="color:red;">'+data.rname+'</i><span>:' + data.reply + '</span>\
           </div></div>'
                gg.append(bb)
                $("#reqqq").val("")
            }
        })
    }
}
//我收到的评论
function received(e) {
    $.ajax({
        type: 'post',
        url: 'http://10.1.9.232:1235/myComment/received',
        changeOrigin: true,
        data: {
            id: e
        },
        success: function (data) {
            $("#apo").html('');
            for (var k = data.length - 1; k >= data.length - 4; k--) {
                var aa = '<div class="Conmment" style="margin-top: 10px; padding: 10px;">\
                            <div class="bolg_comment">\
                                <div style="width: 60px; float: left;">\
                                    <img width="50px" style="display:inline;" class="media-object "src="./textimages/'+ data[k].author.img + '">\
                                </div>\
                            <div style="font-size: 18px;">\
                                <span class="redname">'+ data[k].author.bname + '</span>\
                                    <div style="font-size: 14px; margin: 5px;">\
                                        <i>'+ data[k].times + '</i>\
                                    </div>\
                                    <p>回复<i style="color:red;">'+data[k].text.blogName+'</i> : '+ data[k].comment + '</p>\
                                </div>\
                            </div>\
                            <div style="margin: 10px 5px 10px 70px;">\
                                <i>评论你的博文 : </i>\
                                <span><a class="nr_left_h" style="font-size: 12px;">'+ data[k].text.title + '</a></span>\
                            </div>\
                        </div>'
                $("#apo").append(aa)
            }
        }
    })
}


//地址获取
function htmles() {
    if (window.location.href == "http://10.1.9.232:1235/reg") {
        $("#tt").val("/")
    } else {
        $("#tt").val(window.location.href)
    }
}
$(function () {
    var myDate = new Date;
    var year = myDate.getFullYear(); //获取当前年
    var mon = myDate.getMonth() + 1; //获取当前月
    var date = myDate.getDate(); //获取当前日
    var h = myDate.getHours(); //获取当前小时数(0-23)
    var m = myDate.getMinutes(); //获取当前分钟数(0-59)
    var time=year + '年' + mon + '月' + date + '日' + h + ':' + m
})
