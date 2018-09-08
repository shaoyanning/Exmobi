<%-- ExMobi JSP文件，注释和取消快捷键统一为Ctrl+/ 多行注释为Ctrl+Shift+/ --%>
<%@ page language="java" import="java.util.*"
 contentType="application/uixml+xml; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="/client/adapt.jsp"%>
<%@ include file="/client/adapt_extend.jsp"%>
<%@ include file="getsign.jsp" %>

<% 
	//系统级参数
	String appkey="EPM";
	String method="mobileark.receiveevent";
	String verson="1.2";
	String format = "json";
	
	//业务层参数
	String uids=aa.req.getParameter("uids");
	String [] loginId =uids.split(",");
	String appid =aa.req.getParameter("appid");
	String appid_ios ="";
	String appType="1";
	String ecid = aa.req.getParameter("ecid");
	String appName = aa.req.getParameter("appName");
	String title = aa.req.getParameter("title");
	String pushContent=aa.req.getParameter("pushContent");
	String events = "{\"title\":\"[{\"title\",\"scheme\":\"username=${username}\"}]}";
	
	Map<String,String> map=new HashMap<String,String>();
	map.put("appkey", appkey);
	map.put("appkey", appkey);
	map.put("appkey", appkey);
	map.put("appkey", appkey);
	map.put("appkey", appkey);
	map.put("appkey", appkey);
	map.put("appkey", appkey);
	map.put("appkey", appkey);
	map.put("appkey", appkey);
	map.put("appkey", appkey);
	String sign=;
	map.put("sign",sign);
	
%>