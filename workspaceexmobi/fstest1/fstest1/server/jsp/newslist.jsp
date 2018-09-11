<%-- ExMobi JSP文件，注释和取消快捷键统一为Ctrl+/ 多行注释为Ctrl+Shift+/ --%>
<%@ page language="java" import="java.util.*"
 contentType="application/uixml+xml; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="/client/adapt.jsp"%>
<%@ include file="/client/adapt_extend.jsp"%>
<aa:http id="newslist" url='<%="http://127.0.0.1:8001/process/service/clientrequest/data/dwlist.json"%>' method="get"/>
<%
	String data = aa.regex(".*", "newslist");
	System.out.print(data);
	response.setCharacterEncoding("UTF-8");
	response.setContentType("application/json; charset=utf-8");
	response.addHeader("Access-Control-Allow-Origin", "*");
	response.getWriter().write(data);
%>
