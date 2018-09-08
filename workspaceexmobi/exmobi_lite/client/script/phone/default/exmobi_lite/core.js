/*
*	ExMobi4.x+ JS
*	Version	: 1.2.5 beta
*	Author	: nandy007
*	License MIT @ https://git.oschina.net/nandy007/exmobi-lite
*/
var ExMobiLite = (function(){
	
	//基本的dom操作支持
	var domFunc = {};
	
	//支持设置和获取dom的innerHTML
	domFunc.html = function(){
		var me = this.me;
		var dom = this.dom;
		if(arguments.length==0) return dom.innerHTML;
		var htmls = [];
		for(var i=0;i<arguments.length;i++){
			htmls.push(arguments[i]);
		}
		dom.innerHTML = htmls.join('');

		return me;
	};
	
	//支持设置和获取dom的value值
	domFunc.val = function(){
		var me = this.me;
		var dom = this.dom;
		if(arguments.length==0){
			return dom.value;
		}else{
			dom.value = arguments[0];
		}
		return me;
	};
	
	//支持设置和获取dom的属性值
	domFunc.attr = function(){
		var me = this.me;
		var dom = this.dom;
		if(arguments.length==1){
			return dom[arguments[0]];
		}else if(arguments.length==2){
			if(eventCollection[dom.id]&&eventCollection[dom.id][arguments[0]+'-default']){
				eventCollection[dom.id][arguments[0]+'-default'] = arguments[1]||_blankFun;
			}else{
				dom[arguments[0]] = arguments[1];
			}
			return me;
		}else{
			return me;
		}
	};
	
	//给dom添加css
	domFunc.addClass = function(){
		var me = this.me;
		var dom = this.dom;
		var cn = " "+(dom.className||'').trim()+" ";
		var cnArr = [];
		for(var i=0;i<arguments.length;i++){
			if(cn.indexOf(" "+arguments[i]+" ")==-1) cnArr.push(arguments[i]);
		}
		cnArr.push(cn.trim());
		dom.className = cnArr.join(' ').trim();
		return me;
	};
	
	//判断dom是否有class
	domFunc.hasClass = function(cn){
		var me = this.me;
		var dom = this.dom;
		var _cn = " "+(dom.className||'').trim()+" ";
		cn = " "+(cn||'').trim()+" ";
		return _cn.indexOf(cn)==-1?false:true;
	};
	
	//移除dom的class
	domFunc.removeClass = function(cn){
		var me = this.me;
		var dom = this.dom;
		var _cn = " "+(dom.className||'').trim()+" ";
		cn = " "+(cn||'').trim()+" ";
		dom.className = _cn.replace(cn, '');
		return me;
	};
	
	//给dom添加url
	domFunc.loadUrl = function(url){
		var me = this.me;
		var dom = this.dom;
		if(dom.loadUrl){
			dom.loadUrl(url);
		}else if(dom.executeScript){
			dom.executeScript('location.href="'+url+'"');
		}
		return me;
	};
	
	//设置dom的style样式，格式必须符合uixml对于style的JS规范，请参考各个控件支持的样式设置
	domFunc.css = function(){
		var me = this.me;
		var dom = this.dom;
		if(arguments.length==1){
			var cssObj = arguments[0];
			if(typeof cssObj=='object'){
				for(var k in cssObj){
					dom.style[k] = cssObj[k];
				}
			}
		}else if(arguments.length==2){
			dom.style[arguments[0]] = arguments[1];
		}
		return me;
	};
	
	//此方法需要ExMobi5.13及以上版本支持
	domFunc.data = function(){
		var me = this.me;
		var dom = this.dom;
		if(arguments.length==1){
			return dom.getData(arguments[0]);
		}else if(arguments.length==2){
			dom.setData(arguments[0], arguments[1]);
			return me;
		}else{
			return me;
		}
	};
	
	//为dom追加元素，多个元素可以设置为多个参数，参数个数不限
	domFunc.append = function(){
		var me = this.me;
		var dom = this.dom;
		var htmls = [];
		for(var i=0;i<arguments.length;i++){
			htmls.push(arguments[i]);
		}
		var html = htmls.join('');
		if(dom.append){
			dom.append(html);
		}else{
			dom.innerHTML += html;
		}
		return me;
	};
	
	//通过索引号获取dom数组对象中的某个元素对象
	domFunc.get = function(index){
		var me = this.me;
		return me[index]?ExMobiLite(me[index]):undefined;
	};
	
	//设置具有checked属性的元素为选中
	domFunc.check = function() {
		var me = this.me;
		var dom = this.dom;
		dom.checked = true;
    	return me;
  	};
  	
  	//设置具有checked属性的元素为未选中
  	domFunc.uncheck = function() {
    	var me = this.me;
		var dom = this.dom;
		dom.checked = false;
    	return me;
  	};

	//获取具有checked属性的元素的选中状态
	domFunc.checked = function() {
		var me = this.me;
		var dom = this.dom;
    	return dom.checked;
  	};
  	
  	//遍历所有dom元素
	domFunc.each = function(fn){
		var me = this.me;
		for(var i=0;i<me.length;i++){
			fn.apply(me[i],[i, me[i]]);
		}
	};
	
	//将form元素内的所有表单元素序列化为键值对字符串，不包含文件
	domFunc.serialize = function(){
		var me = this.me;
		var dom = this.dom;
		var arr = dom.getSubmitData();
		var newArr = [];
		for(var i=0;i<arr.length;i++){
			if(arr[i].type=='0') newArr.push(arr[i].name+'='+EncryptionUtil.base64Decode(arr[i].value));
		}
		return newArr.join('&');
	};
	
	//将form元素内的所有表单元素序列化为JSON对象，相同name的元素的值为数组，不包含文件
	domFunc.serializeJSON = function(){
		var me = this.me;
		var dom = this.dom;
		var arr = dom.getSubmitData();
		var newObj = {};
		for(var i=0;i<arr.length;i++){
			if(arr[i].type=='0'){
				var val = EncryptionUtil.base64Decode(arr[i].value);
				var key = arr[i].name;
				if(typeof newObj[key]=='undefined'){
					newObj[key] = val;
				}else if(newObj[key] instanceof Array){
					newObj[key].push(val);
				}else{
					newObj[key] = [newObj[key], val];
				}
				
			}
		}
		return newObj;
	};
	
	//将form元素内的所有表单元素序列化为数组，不包含文件
	domFunc.serializeArray = function(){
		var me = this.me;
		var dom = this.dom;
		return dom.getSubmitData();
	};
	
	//所有的dom对象设置样式display为block
	domFunc.show = function(){
		var me = this.me;
		var dom = this.dom;
		dom.show?(dom.show()):(dom.style.display = 'block');
		return me;
	};
	
	//所有的dom对象设置样式display为none
	domFunc.hide = function(){
		var me = this.me;
		var dom = this.dom;
		dom.hide?(dom.hide()):(dom.style.display = 'none');
		return me;
	};
	
	//为dom注入数据，数据在尾部追加
	domFunc.renderAfter = function(str, data, callback){
		var me = this.me;
		var dom = this.dom;
		_ExMobiLite.renderAfter(dom, str, data, callback);
		return me;
	};
	
	//为dom注入数据，数据在顶部追加
	domFunc.renderBefore = function(str, data, callback){
		var me = this.me;
		var dom = this.dom;
		_ExMobiLite.renderBefore(dom, str, data, callback);
		return me;
	};
	
	//为dom注入数据，数据替换原有内容
	domFunc.renderReplace = function(str, data, callback){
		var me = this.me;
		var dom = this.dom;
		_ExMobiLite.renderReplace(dom, str, data, callback);
		return me;
	};
	
	var _cache = {
		idCache : {
			index : 0,
			pre : 'elid_'
		}
	};

	var eventCollection = {};
	
	var _eventsId = {
		index : 0
	};
	
	var _blankFun = 'void(0)';
	
	var _eventHandler = function(event, id){
		if(!eventCollection[id]) return;
		var curEvent = eventCollection[id][event+'-default'];
		var dom = document.getElementById(id);
		if(curEvent){
			var tempEvents = curEvent.replace(/[^:]+:[^:]+/g,'');
			if(tempEvents){
				if(tempEvents!=_blankFun) (new Function('var _this=document.getElementById("'+id+'");'+curEvent.replace('this', '_this')))();
			}else{
				window.open(curEvent, dom.target!='_self');
			}
		}
		var events = eventCollection[id][event];
		if(events){
			for(var i=0;i<events.length;i++){
				events[i].apply(dom);
			}
		}
	};
	
	domFunc.off = function(event){
		var me = this.me;
		var dom = this.dom;
		if(dom==document) return docFun.off.apply(this, [event, fn]);
		var id = dom.id;
		if(!id) return me;
		delete eventCollection[id];
		dom[event] = '';
		return me;
	};

	//为dom对象添加监听事件
	domFunc.on = function(event, fn){
		var me = this.me;
		var dom = this.dom;
		if(dom==document) return docFun.on.apply(this, [event, fn]);
		var id = dom.id;
		if(!id) return me;

		eventCollection[id] = eventCollection[id]?eventCollection[id]:{};
		var curEvent = dom[event]||'';
		var eventDefault = event+'-default';
		if(!eventCollection[id][eventDefault]){			
			eventCollection[id][eventDefault] = curEvent||_blankFun;
		}
		if(!ExMobiLite._eventCollection[event]){
			ExMobiLite._eventCollection[event] = _eventHandler;
		}
		
		dom[event] = 'ExMobiLite._eventCollection["'+event+'"]("'+event+'", "'+id+'")';

		eventCollection[id] = eventCollection[id]?eventCollection[id]:{};
		eventCollection[id][event] = eventCollection[id][event]?eventCollection[id][event]:[];
		eventCollection[id][event].push(fn);
		return me;
	};
	
	//触发dom对象的监听事件
	domFunc.trigger = function(event, params){
		var me = this.me;
		var dom = this.dom;
		if(dom==document) return docFun.trigger.apply(this, [event, fn]);
		var id = dom.id;
		if(!id||!eventCollection[id]) return me;
		var events = eventCollection[id][event]||[];
		for(var i=0;i<events.length;i++){
			var fn = events[i];
			fn.apply(dom, params instanceof Array?params:[params]);
		}
		eventCollection[id][event+'-default']||eventCollection[id][event+'-default']();
		return me;
	};
	
	var docFun = {};
	var _docEventCollection = {};
	var _docEventPre = '__ExMobi_Lite_Document_Event_';
	docFun.on = function(event, fn){
		var me = this.me;
		var dom = this.dom;

		_docEventCollection[event] = _docEventCollection[event]?_docEventCollection[event]:[];
		_docEventCollection[event].push(fn);
		
		if(!window[_docEventPre+event]){
			window[_docEventPre+event] = function(){
				_ExMobiLite(document).trigger(event);
			};
			document.addEventListener(event, window[_docEventPre+event]);
		}
		return me;
	};
	
	docFun.off = function(event){
		var me = this.me;
		var dom = this.dom;
		
		delete _docEventCollection[event];
		
		return me;
	}
	
	docFun.trigger = function(event, params){
		var me = this.me;
		var dom = this.dom;
		
		var events = _docEventCollection[event]||[];
		for(var i=0;i<events.length;i++){
			var fn = events[i];
			fn.apply(dom, params instanceof Array?params:[params]);
		}
		
		return me;
	}
	
	//dom对象的selector实现，selector中必须至少包含tag、#id或者[name='']中之一，否则无法取到对象
	//支持多属性，多选择器用英文“,”隔开，不支持通配符*，不支持派生，不支持多样式
	//比如正确写法：$('div, #test, [name="ipt"][type="file"]')  $('div.tab, input#test, #test[name='ipt']')
	//不正确写法： $('*')【不支持通配符】  $('.tab')【未包含tag、#id或[name='']之一】  $('div #test')【不支持级联】  $('div.tab.menu')【不支持多样式】
	var ExMobiDom = function(selector){
		selector = selector||'';
		var _this = this;
		var domArr = (function(){
			var arr = Array;
			for(var k in domFunc){
				(function(k){
					arr.prototype[k] = function(){
						if(k=='each'){
							return domFunc[k].apply({me : this}, arguments);
						}
						var domArr = _this.domArr;
						if(domArr.length==0) return undefined;
						for(var i=1;i<domArr.length;i++){
							domFunc[k].apply({
												me : this,
												dom : domArr[i]
											}, arguments);
						}
						return domFunc[k].apply({
													me : this,
													dom : domArr[0]
												}, arguments);
					};
				})(k);
			}
			return new arr();
		})();
		
		var orders = [
			{type : 'id', match : /#((?:[\w\u00c0-\uFFFF-]|\\.)+)/},
			{type : 'name', match : /\[name=['"]*((?:[\w\u00c0-\uFFFF-]|\\.)+)['"]*\]/},
			{type : 'tag', match : /^((?:[\w\u00c0-\uFFFF\*-]|\\.)+)/},
			{type : 'cls', match : /\.((?:[\w\u00c0-\uFFFF-]|\\.)+)/},
			{type : 'attr', match : /\[\s*((?:[\w\u00c0-\uFFFF-]|\\.)+)\s*(?:(\S?=)\s*(['"]*)(.*?)\3|)\s*\]/}
		];
		if(selector==document){
			domArr.push(document);
		}else if(selector instanceof Array){
			domArr = domArr.concat(selector);
		}else if(typeof selector=='object'){
			domArr.push(selector);
		}else if(typeof selector=='string'&&selector.trim().indexOf('<')==0){
			var xml = '<root>'+selector+'</root>';
			var xmlDoc = new XMLDocument();
			xmlDoc.parseXmlText(xml);
			var rootElement = xmlDoc.getRootElement();
			var children = rootElement.childNodes;
			for(var i=0;i<children.length;i++){
				if(!children[i].id) continue;
				var cDom = document.getElementById(children[i].id);
				if(cDom) domArr.push(cDom);
			}
		}else{
			var paths = selector.split(',');
			for(var i=0;i<paths.length;i++){
				var path = paths[i].trim();
				if(!path) continue;
				
				var domObj = {};
				var curDoms = [];
				
				for(var j=0;j<orders.length;j++){
					var order = orders[j];
					if(order.type=='attr'){
						var allMatch = path.match(new RegExp(order.match.source, 'g'))||[];
						domObj[order.type] = {};
						for(var k=0;k<allMatch.length;k++){
							var curMatch = allMatch[k].match(order.match)||['','','','',''];
							domObj[order.type][curMatch[1]] = curMatch[4];
						}	
					}else{
						var curMatch = path.match(order.match)||['',''];
						domObj[order.type] = curMatch[1];
					}
				}
				
				var formatTagName = function(objName){
					var tagName = objName.toLowerCase();
					if(tagName=='text'||tagName=='fileupload'||tagName=='checkbox'||tagName=='radio'){
						tagName = 'input';
					}else if(tagName=='listitemtwoline'||tagName=='listitemoneline'){
						tagName = 'listitem';
					}
					return tagName;
				};
				
				var compare = function(dom, index){
					dom.tagName = formatTagName(dom.objName||'');
					var arr = [
						{type:'name', evalStr : 'if(domObj.name&&dom.name!=domObj.name){ flag = false; } return flag;'},
						{type:'tag', evalStr : 'if(domObj.tag&&dom.tagName!=domObj.tag&&dom.objName!=domObj.tag){ flag = false; } return flag;'},
						{type:'clas', evalStr : 'if(domObj.cls&&dom.className.indexOf(domObj.cls)<0){ flag = false; } return flag;'},
						{type:'attr', evalStr : 'if(domObj.attr&&dom[domObj.attr.name]!=domObj.attr.val){ flag = false; } return flag;'}
					];
					var flag = true;
					for(var j=index;j<4;j++){
						var obj = arr[j];
						if(obj.type=='attr'){
							for(var k in domObj.attr){
								if(dom[k]!=domObj.attr[k]){
									flag = false;
									break;
								}
							}
						}else{
							flag = (new Function('domObj', 'dom', 'flag', obj.evalStr))(domObj, dom, true);
						}
						if(!flag) break;
					}
					if(flag) curDoms.push(dom);
				};
				
				if(domObj.id){
					var dom = document.getElementById(domObj.id);
					if(dom){
						compare(dom, 0);
					}
				}else if(domObj.name){
					var tempDoms = document.getElementsByName(domObj.name);
					for(var j=0;j<tempDoms.length;j++){
						var dom = tempDoms[j];
						compare(dom, 1);
					}
				}else if(domObj.tag){
					var tempDoms = document.getElementsByTagName(domObj.tag);
					for(var j=0;j<tempDoms.length;j++){
						var dom = tempDoms[j];
						compare(dom, 2);
					}
				}
				
				domArr = domArr.concat(curDoms);
			}
		}
		
		this.domArr = domArr;
		return domArr;
	};
	
	var _ExMobiLite = function(selector){
		return new ExMobiDom(selector);
	};
	
	//event绑定
	(function(){
		_ExMobiLite._eventCollection = {};
	})();
	
	//扩展JSON对象操作
	(function(){
		var JSON = {};
		JSON.parse = function(str){
			try{
				return (new Function("","return "+str.trim()))();
			}catch(e){
				return null;
			}
		};
		JSON.stringify = function(o){
			var r = [];
			if(typeof o =="string") return "\""+o.replace(/([\'\"\\])/g,"\\$1").replace(/(\n)/g,"\\n").replace(/(\r)/g,"\\r").replace(/(\t)/g,"\\t")+"\"";
			if(typeof o =="undefined") return "";
			if(typeof o != "object") return o.toString();
			if(o===null) return null;
			if(o instanceof Array){
				for(var i =0;i<o.length;i++){
			        r.push(this.stringify(o[i]));
			    }
			    r="["+r.join()+"]";
			}else{
				for(var i in o){
				   r.push('"'+i+'":'+this.stringify(o[i]));
			    }
			    r="{"+r.join()+"}";
			}
			return r;
		};
		
		_ExMobiLite.JSON = JSON;

	})();
	
	//ExMobi Lite的基本扩展
	(function(){

		//为ExMobi Lite设置别名调用（不占用$符）
		_ExMobiLite.noConflict = function(){
			return this;
		};
		
		//JSON对象深度拷贝
		_ExMobiLite.extend = function(target, options) {
			var result = {};
			for(var k in target){
				result[k] = target[k];
			}
			for (var name in options) {
		   		copy = options[name];
		   		if (copy instanceof Array) {
		        	result[name] = _ExMobiLite.extend([], copy);
		        } else if (typeof copy == 'function'||typeof copy == 'string') {
		            result[name] = options[name];
		   		} else if(copy instanceof Object){
		   			result[name] = _ExMobiLite.extend({}, copy);
		   		}else {
		    		result[name] = options[name];
		   		}
		  	}
		  	return result;
		};
		
		//自定义dom对象的操作函数
		_ExMobiLite.fn = {
			extend : function(opts){
				for(var k in opts){
					if(domFunc[k]){
						delete opts[k];
					}else{
						(function(k){
							var copy = opts[k];
							opts[k] = function(){
								var me = this.me;
								var dom = this.dom;
								copy.apply(dom, arguments);
							};
						})(k);
						
					}
				}
				_ExMobiLite.extend(domFunc, opts);
			}
		};
	})();
	
	//对ExMobi的主要异步请求的封装
	(function(){
		var _cacheMap = {
			index : 0
		};
		
		var _defaultOptions = {
			dataType : 'text',
			_beforeSend : function(){
				this.opts.headers = this.opts.headers||{};
				this.opts.timeout = this.opts.timeout?(this.opts.timeout/1000):20;
				if(!this.opts.headers['esn']) this.opts['esn'] = DeviceUtil.getEsn();
				if(!this.opts.headers['imsi']) this.opts['imsi'] = DeviceUtil.getImsi();
				if(this.opts.isBlock==true){
					ExMobiLite.showMask();
					setTimeout('ExMobiLite.hideMask()',this.opts.timeout*1000);
				}
			},
			_success : function(data){},
			_error : function(data, status){},
			_complete : function(data, status){ ExMobiLite.hideMask(); }
		};
		
		var _getDefaultOptions = function(){
			return _defaultOptions;
		};
		
		var _paramsTemplate = {
			url : { val : ''},
			method : { val :　'get', ref : 'type' },
			data : {val:''},
			requestHeader : {val:{}, ref:'header'},
			timeout : {val:20},
			connectTimeout : {val:15},
			reqCharset : {val:'utf-8'},
			rspCharset : {val:'utf-8'},
			//isBlock :　{val:false},
			successFunction : {val:'_ExMobiLite_ajax_successFunction'},
			failFunction : {val:'_ExMobiLite_ajax_errorFunction'}
		};
		
		var _getParamsTemplate = function(){
			return _paramsTemplate;
		};
		
		_ExMobiLite.ajaxSetup = function(opts){
			_defaultOptions = _ExMobiLite.extend(_defaultOptions, opts);
		};
		
		_ExMobiLite._ajaxFuncChain = function(){
			var obj = Array.prototype.shift.call(arguments);
			var args = Array.prototype.shift.call(arguments);
			for(var i=0;i<arguments.length;i++){
				var fn = arguments[i];
				if(fn&&(fn.apply(obj, args)===false)){
					break;
				}
			}
		};
		
		var putRightParams = function(ajax){
			var headers = ajax.requestHeader||{};
			var data = ajax.data;
			var iskv = true;
			for(var k in headers){
				if(k.replace(/[^\w]+/g, '').toLowerCase()==='contenttype'&&headers[k].indexOf('x-www-form-urlencoded')<0){
					iskv = false;
					break;
				}
			}
			if(iskv&&typeof data==='object'){
				var arr = [];
				for(var k in data){
					arr.push(k+'='+data[k]);
				}
				ajax.data = arr.join('&');
			}else if(!iskv&&typeof data==='object'){
				ajax.data = _ExMobiLite.JSON.stringify(data);
			}
		};
		
		//异步请求基类
		_ExMobiLite._go = function(opts, handler){
			if(!opts||!opts.url) return;
			this.cacheOptions = _ExMobiLite.extend(_getDefaultOptions(), this.opts=opts);
			_ExMobiLite._ajaxFuncChain(this, [], _defaultOptions._beforeSend, _defaultOptions.beforeSend, this.opts.beforeSend);
			this.ajaxData = (function(t, o){
				var r = {};
				for(var k in t){
					r[k] = o[k]||o[t[k]['ref']]||t[k]['val'];
				}
				return r;
			})(_getParamsTemplate(), this.opts);
			this.ajaxData.url = _ExMobiLite.util.script(this.ajaxData.url);
			if(handler==Ajax||handler==DirectAjax) putRightParams(this.ajaxData);
			var ajax = new handler(this.ajaxData);
			var index = _cacheMap.index++;
			_cacheMap['_ajax_opts_key_'+index] = this;				
			ajax.setStringData('_ajax_opts_key_', index);
			ajax.send();
		};
		
		window._ExMobiLite_ajax_successFunction = function(data){
			var ajaxObj = _ExMobiLite._ajax_getFunction(data);
			var opts = ajaxObj.opts;
			if(opts.result==undefined){
				_ExMobiLite._ajaxFuncChain(ajaxObj, [data, '500'], _defaultOptions._error, _defaultOptions.error, opts.error);
			}else{
				_ExMobiLite._ajaxFuncChain(ajaxObj, [opts.result], _defaultOptions._success, _defaultOptions.success, opts.success);
			}
			_ExMobiLite._ajaxFuncChain(ajaxObj, [data, data.status], _defaultOptions._complete, _defaultOptions.complete, opts.complete);
		};
		
		window._ExMobiLite_ajax_errorFunction = function(data){
			var ajaxObj = _ExMobiLite._ajax_getFunction(data);
			var opts = ajaxObj.opts;
			_ExMobiLite._ajaxFuncChain(ajaxObj, [data, data.status], _defaultOptions._error, _defaultOptions.error, opts.error);
			_ExMobiLite._ajaxFuncChain(ajaxObj, [data, data.status], _defaultOptions._complete, _defaultOptions.complete, opts.complete);
		};
		
		_ExMobiLite._ajax_getFunction = function(ajax){
			var result = ajax.responseText;
			var index = ajax.getStringData('_ajax_opts_key_');
			
			var ajaxObj = _cacheMap['_ajax_opts_key_'+index];
			var opts = ajaxObj.opts;
			opts.dataType = opts.dataType&&opts.dataType.toLowerCase()=='json'?'json':'text';
			if(opts.dataType=='json'){
				try{
					ajaxObj.opts.result = _ExMobiLite.JSON.parse(result);
				}catch(e){
					ajaxObj.opts.result = undefined;
				}
			}else{
				ajaxObj.opts.result = ajax.responseText;
			}
			delete _cacheMap['_ajax_opts_key_'+index];
			return ajaxObj;
		};
		
		_ExMobiLite.go = function(opts, handler){
			new _ExMobiLite._go(opts, handler);
		};
		
		//对应ExMobi的Ajax
		_ExMobiLite.server = function(opts){
			_ExMobiLite.go(opts, Ajax);
		};
		//对应ExMobi的DirectAjax
		_ExMobiLite.ajax = function(opts){
			_ExMobiLite.go(opts, DirectAjax);
		};
		//对应ExMobi的DirectFormSubmit 
		_ExMobiLite.form = function(opts, handler){
			if(!opts||!opts.url) return;
			opts.type = opts.type||'post';
			if(opts.formId){
				opts.data = $('#'+opts.formId)[0].getSubmitData();
			}else if(opts.data){
				
				var fileElementId = typeof opts.fileElementId=='object'?opts.fileElementId.join():opts.fileElementId;
				fileElementId = ','+(fileElementId?fileElementId:'')+',';
				var dataArr = [];
				if(typeof opts.data=='object'){
					for(var k in opts.data){
						var obj = {};
						obj[k] = opts.data[k];
						dataArr.push(obj);
					}
				}else{
					dataArr = _ExMobiLite.util.paramsToJSON(opts.data);
				}

				for(var i=0;i<dataArr.length;i++){
					var obj = {};
					for(var k in dataArr[i]){
						obj.name = k;
						obj.value = dataArr[i][k];
					}
					obj.type = fileElementId.indexOf(','+obj.name+',')==-1?0:1;
					dataArr[i] = obj;
				};
				opts.data = dataArr;
			}
			
			_ExMobiLite.go(opts, handler||DirectFormSubmit);
		};
		
		//对应ExMobi的FormSubmit 
		_ExMobiLite.serverForm = function(opts){
			_ExMobiLite.form(opts, FormSubmit);
		};

	})();
	
	//扩展使用ExMobi的常用功能
	(function(){
		var _progressbar = null;
		//显示进度条
		_ExMobiLite.showMask = function(isBlock){
			_progressbar = _progressbar?_progressbar:new ProgressBar();
			_progressbar.show(isBlock?true:false);
		};
		//隐藏进度条
		_ExMobiLite.hideMask = function(){
			_progressbar&&_progressbar.cancel();
		};
		//显示toast
		var _toast = null;
		_ExMobiLite.showToast = function(msg){
			_toast = _toast||new Toast();
 			_toast.setText(msg);
 			_toast.show();

		};
		
		//显示alert
		var _callbackFuncCollection = {
			index : 0
		};
		_ExMobiLite.alert = function(msg, okFunc){
			var _index = _callbackFuncCollection.index++;
			_callbackFuncCollection[_index] = function(){
				okFunc&&okFunc();
				delete _callbackFuncCollection[_index];
			};
			alert(msg, _callbackFuncCollection[_index]);
		};
		_ExMobiLite.confirm  = function(msg, okFunc, cancelFun){
			var _ok_index = _callbackFuncCollection.index++;
			_callbackFuncCollection[_ok_index] = function(){
				okFunc&&okFunc();
				delete _callbackFuncCollection[_ok_index];
			};
			var _cancel_index = _callbackFuncCollection.index++;
			_callbackFuncCollection[_cancel_index] = function(){
				cancelFun&&cancelFun();
				delete _callbackFuncCollection[_cancel_index];
			};
			confirm(msg, _callbackFuncCollection[_ok_index], _callbackFuncCollection[_cancel_index]);
		};
		
		//数据注入，str可以是模板字符串、http地址、res本地文件地址；data可以是json对象、http地址、res本地文件地址
		_ExMobiLite.provider = function(str, data, callback){
			if(!str||!data) return '';
			var ajaxHandler = _globalOptions.ajaxHandler||$.ajax;
			callback = callback||function(){};
			var result = '';
			var getTemplate = function(cb){
				str = _ExMobiLite.util.script(str);
				if(str.indexOf('http')==0){
					ajaxHandler({
						url : str,
						success : function(data){
							cb(data.trim());
						},
						error : function(){
							cb(null);
						}
					});
				}else if(str.indexOf('res')==0){
					cb(FileUtil.readFile(str));
				}else{
					cb(str);
				}
			};
			
			var getData = function(cb){
				if(typeof data=='object'){
					cb(data);
				}else{
					data = _ExMobiLite.util.script(data);
					if(data.indexOf('http')==0){
						ajaxHandler({
							url : data,
							dataType : 'json',
							success : function(data){
								cb(data);
							},
							error : function(){
								cb(null);
							}
						});
					}else if(data.indexOf('res')==0){
						cb(_ExMobiLite.JSON.parse(FileUtil.readFile(data)));
					}else{
						cb(null);
					}
				}
			};
			
			getTemplate(function(tmpl){
				if(!tmpl){
					callback('', '', null);
					return;
				}
				getData(function(source){
					if(!source){
						callback('', tmpl, null);
						return;
					}
					try{						
						result = _ExMobiLite.util.addElementId(template.compile(tmpl)(source));
					}catch(e){
						result = '';
						Log.i('注入失败：', e);
					}
					callback(result, tmpl, source);
				});
			});
			
			return result;
		};
		
		//数据渲染后注入，将渲染后的数据根据type类型（after|before|replace）注入到某个容器中
		_ExMobiLite.render = function(selector, str, data, type, callback){
			_ExMobiLite.provider(str, data, function(html, tmpl, obj){
				if(!html){
					callback&&callback('', '', null);
					return;
				}
				var $el = ExMobiLite(selector);
				if(type=='after'){
					$el.append(html);
				}else if(type=='before'){
					$el.html(html+$el.html());
				}else{
					$el.html(html);
				}
				callback&&callback(html, tmpl, obj);
			});
		};
		
		//数据注入，将渲染后的数据注入到某个容器的尾部
		_ExMobiLite.renderAfter = function(selector, str, data, callback){
			_ExMobiLite.render(selector, str, data, 'after', callback);
		};
		//数据注入，将渲染后的数据注入到某个容器的顶部
		_ExMobiLite.renderBefore = function(selector, str, data, callback){
			_ExMobiLite.render(selector, str, data, 'before', callback);
		};
		//数据注入，将渲染后的数据替换某个容器中的内容
		_ExMobiLite.renderReplace = function(selector, str, data, callback){
			_ExMobiLite.render(selector, str, data, 'replace', callback);
		};
		
		_ExMobiLite.console = function(){
			var fn = Console?Console.log:Log.i;
			fn.apply(this, arguments);
		};
		
		_ExMobiLite.preferenceChange = function(fn){
			beignPreferenceChange();
			try{ fn&&fn(); }catch(e){ _ExMobiLite.console(e); }
			endPreferenceChange();
		};
	})();
	
	//ExMobi Lite的工具集函数
	_ExMobiLite.util = {};
	
	(function(){		
		//转换键值对参数为JSON对象
		_ExMobiLite.util.paramsToJSON = function(data){
			var arr = [];
			if(!data||(typeof data!='string')) return [];
		
			data.replace(/(\w+)=([^&]+)/ig, function(a, b, c){
				var obj = {};
			    obj[b] = unescape(c);
			    arr.push(obj);
			});  
			return arr;
		};
		
		//为没有id的元素添加id属性
		_ExMobiLite.util.addElementId = function(h){	
			return (h||'').replace(/<([A-Za-z]+)(?![^<>]*?id=[^<>]*?>).*?>/g, function(s, s1){
				_eventsId.index = _eventsId.index+1;
				return s.replace('<'+s1, '<'+s1+' id="eventid'+_eventsId.index+'"');
			});
	    };	
		
		//将str中的JS变量还原为字符串
		_ExMobiLite.util.script = function(str){	
			str = (str||'').trim();
			var tag = false;
			
	    	str = str.replace(/\$\{([^\}]*)\}/g, function(s, s1){
	    		try{
	    			tag = true;
	    			return _ExMobiLite.util.globalEval(s1.trim());
	    		}catch(e){
	    			return '';
	    		}
	
	    	});
	
	    	return tag?_ExMobiLite.util.script(str):str;
	    };	
	    
	    _ExMobiLite.util.globalEval = function(str){	
	    	var s1='e',s2='v',s3='a',s4='l';
	    	return window[s1+s2+s3+s4].apply(this,[str]);
	    };
	})();
	
	//ExMobi Lite的插件扩展
	_ExMobiLite.plugin = {};	
	
	var _globalOptions = {
		ajaxHandler : _ExMobiLite.ajax
	};
	
	_ExMobiLite.setup = function(opts){
		_globalOptions = _ExMobiLite.extend(_globalOptions, opts)
	};
	
	_ExMobiLite.w = {};
	(function(){
		_ExMobiLite.w.open = function(path, data, target){
			var param = '';
			var template = (function(){
				if(path.indexOf('res:')==0){
					var paths = path.split('?');
					if(paths.length>1) param = paths[1];
					return FileUtil.readFile(paths[0]);
				}else{
					return path;
				}
			})();
			_ExMobiLite.provider(template, data, function(result, tmpl, source){
				if(result){
					window.openData(result, target!='_self', false, '', param);
				}else{
					 _ExMobiLite.console('窗口打开失败，内容：'+path);
				}
			});
			
		};
	})();
	
	
	if(!window.$) window.$ = _ExMobiLite;

	return _ExMobiLite;
})();

(function(){
	String.prototype.trim = function(){
　　    	return this.replace(/(^\s*)|(\s*$)/g, "");
　　 };
})();
