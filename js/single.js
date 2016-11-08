window.onload = function() {
	if (document.referrer == null || document.referrer == "") {
		//如果此页面不是由其他页面舔砖过来的，重定向到login.html
		window.location.href = "login.html";
	}
}

window.onload = function(){
	var float = document.getElementById("float");
	var username = sessionStorage.getItem("username");//当前用户
	var uname = sessionStorage.getItem("uname");//想要发起聊天的用户
	float.innerHTML = username + "与"+ uname + "聊天进行中......";
	float.style.marginLeft = "500px";
	float.style.color = "goldenrod";
}

//展示信息
	setInterval(getMsg,300);
	var lasttime = "";
	var username = sessionStorage.getItem("username");
	var uname = sessionStorage.getItem("uname");
	console.log(username+uname);
	function getMsg(){
		//获取最后一条消息
		$.ajax({
			type:"post",
			url:"server.php",
			async:true,
			data:{"type":"getMsgforSingle"},
			success:function(data){
				var result = JSON.parse(data);
				var time = result["time"];
				var from = result["namefrom"];
				var to = result["nameto"];
				var msg = result["msg"];
				var currenttime = new Date().getTime();
				var a = parseInt(time);
				var year = new Date(a).getFullYear();
				var month = new Date(a).getMonth()+1;
				var day = new Date(a).getDate();
				var hour = new Date(a).getHours();
				var minute = new Date(a).getMinutes();
				var second = new Date(a).getSeconds();
				var messageTime = "" + year + "-" + month + "-" + day + "  " + hour + ":" + minute +":" + second ;
								
				//1.判断时间与当前时间相差小于一小时
				if((currenttime-time) < 60*60*1000){
					//2.判断当前消息有没有被显示过
					if(time != lasttime){
						lasttime = time;
						//3.判断当前用户与信息的关系
						var p = document.createElement("p");
						if(username == from && uname == to){
							//当前用户是信息的发送者，并且建立聊天的用户是消息的接受者
							p.className = "right";
							p.innerHTML = "用户昵称：" +username+ "时间:" + messageTime + "<br>" + "   "+msg + "<br>";
						}
						if(username == to && uname == from){
							//当前用户是信息的接受者,并且建立聊天的用户是消息的发送者
							p.className = "left";
							p.innerHTML = "用户昵称：" +uname+ "时间" + messageTime + "<br>" + "   " + msg + "<br>";
						}
						$("#chatwindow").append(p);
					}
				}
			}
		});
	}

