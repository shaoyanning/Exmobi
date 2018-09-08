<%-- ExMobi JSP文件，注释和取消快捷键统一为Ctrl+/ 多行注释为Ctrl+Shift+/ --%>
<%@ page language="java" import="java.util.*"
 contentType="application/json; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="/client/adapt.jsp"%>
<%
JSONObject resultObj = new JSONObject();
JSONArray arr = new JSONArray();
arr.put("Agile Lite移动前端框架");
arr.put("ExMobi三大引擎完美融合");
resultObj.put("list", arr);
out.println(resultObj.toString());
%>