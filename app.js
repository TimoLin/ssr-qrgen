'use strict';

var qrcode = new QRCode("qrcode");

function manipulate() {
	var ip = $("#server-address").val();
	var port = $("#server-port").val();
	var password = $("#password").val();
	var encryption = $("#encryption").val();
	var protocol = $("#protocol").val();
	var prot_param = $("#prot_param").val();
	var obfs = $("#obfs").val();
	var obfs_param = $("#obfs_param").val();
	var remarks =  $("#remarks").val();
	var group =  $("#group").val();

	if (ip && port && port > 0 && password && encryption && protocol && obfs) {
		// The ssr QR code scheme can be found at 
		// https://github.com/shadowsocksrr/shadowsocks-rss/wiki/SSR-QRcode-scheme
		// Url safe base64 without padding
		var bs64pass = utf8_to_b64(password);
		    bs64pass = bs64pass.replace(/=+/,"");
		var bs64obfs_param = utf8_to_b64(obfs_param);
		    bs64obfs_param = bs64obfs_param.replace(/=+/,"");
		var bs64prot_param = utf8_to_b64(prot_param);
		    bs64prot_param = bs64prot_param.replace(/=+/,"");
		var bs64remarks = utf8_to_b64(remarks);
		    bs64remarks = bs64remarks.replace(/=+/,"");
		var bs64group = utf8_to_b64(group);
		    bs64group = bs64group.replace(/=+/,"");

		var ssr=ip+":"+port+":"+protocol+":"+encryption+":"+obfs+":"+bs64pass+"/?obfsparam="+bs64obfs_param+"&protoparam="+bs64prot_param+"&remarks="+bs64remarks+"&group="+bs64group;
		var bs64ssr = utf8_to_b64(ssr);
			bs64ssr=bs64ssr.replace(/=+/,"");
			bs64ssr=bs64ssr.replace(/\//,"_");

		qrcode.makeCode('ssr://' + bs64ssr);
	} else {
		alert("Please fill the needed blanks.");
	}
}

function utf8_to_b64(str) {
	return window.btoa(unescape(encodeURIComponent(str)));
}

$("#generate").click(function(event){
	event.preventDefault();
	manipulate();
});
