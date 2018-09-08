/*
 *	ExMobi4.x+ JS
 *	Version	: 1.0.0
 *	Author	: panzhen
 *	Email	:
 *	Weibo	:
 *	Copyright 2015 (c)
 */

function $exmobiServerUrl() {
	var settinginfo = ClientUtil.getSetting();
	var url = "http://" + settinginfo.ip + ":" + settinginfo.port + "/process/service/" + ClientUtil.getAppId();
	return url;
}

function rtoast(s) {
	var t = new Toast();
	t.setText(s);
	t.show();
}

function getCache(mm) {
	return document.cache.getCache(mm);
}

function setCache(mm, ss) {
	document.cache.setCache(mm, ss);
}

function isempty(par) {
	if (par == null || par == '') {
		return true;
	} else {
		return false;
	}
}
