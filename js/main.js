window.onload = function() {
	if (document.referrer == null || document.referrer == "") {
		//如果此页面不是由其他页面舔砖过来的，重定向到login.html
		window.location.href = "login.html";
	}
}


setInterval(getMsg, 300);
var lasttime = null;

function getMsg() {
	$.ajax({
		type: "post",
		url: "server.php",
		async: true,
		data: {
			"type": "getMsg"
		},
		success: function(data) {
			var last_message = JSON.parse(data);
			//要求：读取出时间戳，如果当前时间时间戳与最后一条消息的时间戳超过一个小时，不显示。
			//1.读取出最后消息的用户，发送时间，消息内容。
			var name = last_message["name"];
			var time = last_message["time"];
			var msg = last_message["msg"];
			var date_message = getDate(time); //将最后一条消息的时间转化为H:M:S形式
			//2.判断当前时间与最后一条消息的时间
			var date = new Date().getTime(); //获取的当前时间的时间戳
			var interval = date - time; //js的是毫秒，php的是秒
			var chatwindow = document.getElementById("chatwindow");
			if (interval < 60 * 60 * 1000) {
				//3.展示消息 如果此条消息之前没有展示过，展示
				if (lasttime != time) {
					lasttime = time;
					var p = document.createElement("p");
					//4.判断当前用户是否是最后一条消息的发出者
					if(name == sessionStorage.getItem("username")){
						p.className = "right";
					}else{
						p.className = "left";
 					}
					p.innerHTML = "<p>" + "用户昵称:" + name + " " + "时间:" + date_message + "<br><br>" + msg + "<br>";
//					p.innerHTML = "<p>" + "用户昵称:"+ name + " " + "时间:" + date_message + ":" + msg;
					chatwindow.appendChild(p);
					
				}

			}

		}
	});
}

function getDate(time) {
	var date = new Date(parseInt(time));
	var h = date.getHours();
	var m = date.getMinutes();
	var s = date.getSeconds();
	return h + ":" + m + ":" + s;
}