var psw = {}
psw.getQueryString = function(name){
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
	var r = window.location.search.substr(1).match(reg);
	if(r != null) return decodeURI(r[2]);
	return null;
}
var LoaderAjax = function (mainUrl) {
	this.createXMLHttpObject = function () {
		try {
			return new XMLHttpRequest();
		}
		catch (e) {
		}
		try {
			return new ActiveXObject('Msxml2.XMLHTTP');
		}
		catch (e) {
		}
		try {
			return new ActiveXObject('Microsoft.XMLHTTP');
		}
		catch (e) {
		}
		return null;
	};
	this.querystring = function(obj){
		var res="";
		for(var i in obj){
			res  += i+"="+obj[i]+"&";
		}
		res = obj && res.substr(0,res.length-1);
		return res;
	};
	this.post = function (url, content,callback) {
		var xmlhttp = this.createXMLHttpObject();
		if (xmlhttp != null) {
			xmlhttp.open("post",mainUrl+url, true);
			xmlhttp.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
			xmlhttp.setRequestHeader("Content-Type","text/plain");
			xmlhttp.setRequestHeader("Content-Type","utf-8");
			xmlhttp.onreadystatechange = function () {
				if (xmlhttp.readyState == 4) {
					if (xmlhttp.status == 200) {
						var text = xmlhttp.responseText;
						xmlhttp.abort();
						xmlhttp = null;
						callback(JSON.parse(text));
					}
				}
			};
			content = content == undefined ? null : content;
			xmlhttp.send(this.querystring(content));
		}
	};
	this.get =function(url,content,callback){
		var xmlhttp = this.createXMLHttpObject();
		if (xmlhttp != null) {
			content = content == undefined ? null : content;
			xmlhttp.open("get",mainUrl+url+"?"+this.querystring(content), true);
			xmlhttp.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
			xmlhttp.setRequestHeader("Content-Type","text/plain");
			xmlhttp.setRequestHeader("Content-Type","utf-8");
			xmlhttp.onreadystatechange = function () {
				if (xmlhttp.readyState == 4) {
					if (xmlhttp.status == 200) {
						var text = xmlhttp.responseText;
						xmlhttp.abort();
						xmlhttp = null;
						callback(JSON.parse(text));
					}
				}
			};
			xmlhttp.send();
		}
	}
	
}	
psw.ajax = new LoaderAjax();
psw.device={
	defWidth:375,
	defHeight:667,
	adaptScreen:function(){
		var setWidth =  document.body.offsetWidth;
		var setHeigth = document.body.offsetHeight;
		if(window.screen.width>450){
			setWidth = 300; 
		}
		document.documentElement.style.fontSize = setWidth/this.defWidth*100 + "px";
	}
}
psw.device.adaptScreen();