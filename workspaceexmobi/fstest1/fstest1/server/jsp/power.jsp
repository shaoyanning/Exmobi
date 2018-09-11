<%-- ExMobi JSP文件，注释和取消快捷键统一为Ctrl+/ 多行注释为Ctrl+Shift+/ --%>
<%@ page language="java" import="java.util.*"
 contentType="application/uixml+xml; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="/client/adapt.jsp"%>
<%@ include file="/client/adapt_extend.jsp"%>
<aa:http id="power" url="http://192.168.0.100:8180/train/product/getJson.do" method="get"/>
<%
	String data = aa.regex(".*", "power");
	System.out.print(data);
	response.setCharacterEncoding("UTF-8");
	response.setContentType("application/json; charset=utf-8");
	response.addHeader("Access-Control-Allow-Origin", "*");
	response.getWriter().write(data);
%>