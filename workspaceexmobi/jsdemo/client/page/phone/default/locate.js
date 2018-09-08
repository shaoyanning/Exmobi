function $locate() {
	//百度定位
	var baiduutil;
	//gps 定位 for ios
	var position;
}

$locate.prototype.startLocate = function(type, callback) {

	$locate.prototype.locateCallback = callback;
	var os = Util.getOs();
	if (type == null) {
		type = "bd09ll";
	}

	if (os.indexOf('ios') >= 0 || os.indexOf('ios') >= 0) {
		position = new Gps();
		position.onCallback = this.callback_gps;
		position.setTimeout(2000);
		position.startPosition();
	} else {
		baiduutil = new BaiduLocation();
		baiduutil.setOpenGps(true);
		baiduutil.setCoorType(type);
		baiduutil.setTimeout(5000);
		baiduutil.onCallback = this.callback_baidu;
		baiduutil.setLocationMode("Hight_Accuracy");
		baiduutil.startPosition();
	}
	return this;
}

$locate.prototype.stopLocate = function() {
	var os = Util.getOs();
	if (os.indexOf('ios') >= 0 || os.indexOf('ios') >= 0) {
		position.stopPosition();
	} else {
		baiduutil.stopPosition();
	}

}

$locate.prototype.callback_baidu = function() {

	if (!baiduutil.isSuccess()) {
		$locate.prototype.isSuccess = false;
		baiduutil.stopPosition();
		eval($locate.prototype.locateCallback + "()");
		return;
	} else {
		var srcInfo = {};
		srcInfo.type = "gps";
		srcInfo.longitude = baiduutil.longitude;
		srcInfo.latitude = baiduutil.latitude;
		var result = BaidumapUtil.coordinateConverter(srcInfo);
		var point = {};
		point.longitude = result.longitude;
		point.latitude = result.latitude;
		BaidumapUtil.reverseGeocode(point, queryAddress);
	}

}

$locate.prototype.callback_gps = function() {
	if (!position.isSuccess()) {
		$locate.prototype.isSuccess = false;
		position.stopPosition();
		eval($locate.prototype.locateCallback + "()");
		return;
	} else {
		$locate.prototype.isSuccess = true;
	}

	$locate.prototype.lat = position.latitude;
	//纬度
	$locate.prototype.lon = position.longitude;
	//经度
	$locate.prototype.time = position.locationtime;
	var srcInfo = {};
	srcInfo.type = "gps";
	srcInfo.longitude = position.longitude;
	srcInfo.latitude = position.latitude;
	var result = BaidumapUtil.coordinateConverter(srcInfo);
	var point = {};
	point.longitude = result.longitude;
	point.latitude = result.latitude
	BaidumapUtil.reverseGeocode(point, queryAddress);

}
function queryAddress(code, addressInfo) {
	if (code == 0) {
		$locate.prototype.isSuccess = true;
		$locate.prototype.lat = addressInfo.latitude;
		$locate.prototype.lon = addressInfo.longitude;
		$locate.prototype.jsondata = addressInfo;
	} else {
		$locate.prototype.isSuccess = false;
	}
	eval($locate.prototype.locateCallback + "()");
}

