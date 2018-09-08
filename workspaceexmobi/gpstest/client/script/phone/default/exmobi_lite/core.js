/*
*	ExMobi4.x+ JS
*	Version	: 1.2.1 beta
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
			dom[arguments[0]] = arguments[1];
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
	
	//设置和获取dom的自定data的值，注意此值不可直接写在控件内，只能通过JS操作，因为uixml暂未支持自定义属性
	domFunc.data = function(){
		var me = this.me;
		var dom = this.dom;
		if(arguments.length==1){
			return dom['data-'+arguments[0]];
		}else if(arguments.length==2){
			dom['data-'+arguments[0]] = arguments[1];
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

	var eventCollection = {};
	
	//为dom对象添加监听事件
	domFunc.on = function(event, fn){
		var me = this.me;
		var dom = this.dom;
		var id = dom.id;
		if(!id) return me;
		eventCollection[id] = eventCollection[id]?eventCollection[id]:{};
		eventCollection[id][event] = eventCollection[id][event]?eventCollection[id][event]:[];
		eventCollection[id][event].push(fn);
		return me;
	};
	
	//触发dom对象的监听事件
	domFunc.trigger = function(event, params){
		var me = this.me;
		var dom = this.dom;
		var id = dom.id;
		if(!id||!eventCollection[id]||(eventCollection[id][event]||[]).length==0) return me;
		var events = eventCollection[id][event];
		for(var i=0;i<events.length;i++){
			var fn = events[i];
			fn.apply(dom, params instanceof Array?params:[params]);
		}
		return me;
	};
	
	//执行dom对象的点击事件
	domFunc.click = function(fn){
		var me = this.me;
		var dom = this.dom;
		var target = dom.target||'_blank';
		if(typeof fn=='function'){
			ExMobiLite(dom).on('click', fn);
		}else{
			var funcs = [dom.href, dom.onclick];
			for(var i=0;i<funcs.length;i++){
				var func = (funcs[i]||'').trim();
				if(!func) continue;
				ExMobiLite(dom).trigger('click');
				if(func.indexOf('http:')==0||func.indexOf('https:')==0||func.indexOf('res:')==0||func.indexOf('sys:')==0){
					window.open(func, target=='_blank');
				}else if(func.indexOf('javascript:')==0){
					eval(func.replace('javascript:', ''));
				}else{
					eval(func);
				}
			}
			
		}
		return me;
	};
	
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
		
		if(selector instanceof Array){
			domArr = domArr.concat(selector);
		}else if(typeof selector=='object'){
			domArr.push(selector);
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
					} 
					return tagName;
				};
				
				var compare = function(dom, index){
					//dom.tagName = formatTagName(dom.objName.toLowerCase());
					dom.tagName = formatTagName((dom.objName||'component').toLowerCase());
					var arr = [
						{type:'name', eval : 'if(domObj.name&&dom.name!=domObj.name) flag = false;'},
						{type:'tag', eval : 'if(domObj.tag&&dom.tagName!=domObj.tag&&dom.objName!=domObj.tag) flag = false;'},
						{type:'clas', eval : 'if(domObj.cls&&dom.className.indexOf(domObj.cls)<0) flag = false;'},
						{type:'attr', eval : 'if(domObj.attr&&dom[domObj.attr.name]!=domObj.attr.val) flag = false;'}
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
							eval(obj.eval);
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
	
	//扩展JSON对象操作
	(function(){
		var JSON = {};
		JSON.parse = function(str){
			try{
				return eval("("+str+")");
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
			for (var name in options) {
		   		copy = options[name];
		   		if (copy instanceof Array) {
		        	target[name] = _ExMobiLite.extend([], copy);
		        } else if (typeof copy == 'function'||typeof copy == 'string') {
		            target[name] = options[name];
		   		} else if(copy instanceof Object){
		   			target[name] = _ExMobiLite.extend({}, copy);
		   		}else {
		    		target[name] = options[name];
		   		}
		  	}
		  	return target;
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
		//异步请求基类
		_ExMobiLite.go = function(opts, handler){
			if(!opts||!opts.url) return;
			var ajaxData = {};
			ajaxData.url = _ExMobiLite.util.script(opts.url);
			ajaxData.method = opts.type = opts.type&&opts.type.toLowerCase()=='post'?'post':'get';
			if(opts.data) ajaxData.data = opts.data;
			ajaxData.successFunction = '_ExMobiLite_ajax_successFunction';
			ajaxData.failFunction = '_ExMobiLite_ajax_errorFunction';
			if(opts.headers) ajaxData.requestHeader = opts.headers;
			ajaxData.timeout = opts.timeout?(opts.timeout/1000):20;
			ajaxData.reqCharset = opts.reqCharset||'utf-8';
			var ajax = new handler(ajaxData);
			
			var index = _cacheMap.index++;	
			_cacheMap['_ajax_opts_key_'+index] = opts;	
			
			ajax.setStringData('_ajax_opts_key_', index);
			if(opts.isBlock==true) ExMobiLite.showMask();
			ajax.send();
			setTimeout('ExMobiLite.hideMask()',ajaxData.timeout*1000);
		};
		
		window._ExMobiLite_ajax_successFunction = function(data){
			var opts = _ExMobiLite._ajax_getFunction(data);
			if(typeof opts.result=='undefined'){
				opts.error&&opts.error(data, '500');
			}else{
				opts.success&&opts.success(opts.result);
			}
		};
		
		window._ExMobiLite_ajax_errorFunction = function(data){
			var opts = _ExMobiLite._ajax_getFunction(data);
			opts.error&&opts.error(data, data.status);
		};
		
		_ExMobiLite._ajax_getFunction = function(ajax){
			var result = ajax.responseText;	
			var index = ajax.getStringData('_ajax_opts_key_');
			
			var opts = _cacheMap['_ajax_opts_key_'+index];
			if(opts.isBlock==true) ExMobiLite.hideMask();
			opts.dataType = opts.dataType&&opts.dataType.toLowerCase()=='json'?'json':'text';
			if(opts.dataType=='json'){
				try{
					opts.result = eval('('+result+')');
				}catch(e){
					delete opts.result;
				}
			}else{
				opts.result = ajax.responseText;
			}
			delete _cacheMap['_ajax_opts_key_'+index];
			
			return opts;
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
			if(opts.data){
				var dataArr = _ExMobiLite.util.paramsToJSON(opts.data);
				var fileElementId = typeof opts.fileElementId=='object'?opts.fileElementId.join():fileElementId;
				fileElementId = ','+(fileElementId?fileElementId:'')+',';
				
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
			callback = callback||function(){};
			var result = '';
			var getTemplate = function(cb){
				str = _ExMobiLite.util.script(str);
				if(str.indexOf('http')==0){
					$.server({
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
						$.server({
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
						cb(FileUtil.readFile(str));
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
						result = template.compile(tmpl)(source);
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
			var $el = ExMobiLite(selector);
			if($el.length==0) return;
			_ExMobiLite.provider(str, data, function(html, tmpl, obj){
				if(!html){
					callback&&callback('', '', null);
					return;
				}
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
		
			data.replace(/(\w+)=(\w+)/ig, function(a, b, c){ 
				var obj = {};
			    obj[b] = unescape(c); 
			    arr.push(obj);
			});  
			return arr;
		};
		
		//将str中的JS变量还原为字符串
		_ExMobiLite.util.script = function(str){	
			str = (str||'').trim();
			var tag = false;
			
	    	str = str.replace(/\$\{([^\}]*)\}/g, function(s, s1){
	    		try{
	    			tag = true;
	    			return eval(s1.trim());
	    		}catch(e){
	    			return '';
	    		}
	
	    	});
	
	    	return tag?_ExMobiLite.util.script(str):str;
	    };	
	})();
	
	//ExMobi Lite的插件扩展
	_ExMobiLite.plugin = {};
	
	(function(){
		
	})();
	
	
	if(!window.$) window.$ = _ExMobiLite;

	return _ExMobiLite;
})();

(function(){
	String.prototype.trim = function(){
　　    	return this.replace(/(^\s*)|(\s*$)/g, "");
　　 };
})();
