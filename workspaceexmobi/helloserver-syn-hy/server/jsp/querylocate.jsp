<%-- ExMobi JSP文件，注释和取消快捷键统一为Ctrl+/ 多行注释为Ctrl+Shift+/ --%>
<%@ page language="java" import="java.util.*"
 contentType="application/uixml+xml; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="/client/adapt.jsp"%>
<%@ include file="/client/adapt_extend.jsp"%>
<%
	String city = aa.req.getParameter("city");
	String url="http://api.map.baidu.com/telematics/v3/weather?location="+city+"&output=json&ak=9oemg7dp1hnbLTs7a5qg1Di24W6AGp7A";
%>
<aa:http keepreqdata="false" id="weather_query" method="get" url="<%=url %>">
</aa:http>
<%
	String rsp=aa.regex.regex(".*", "weather_query");
	out.print(rsp);
%>
<%--<html>
	<head>
		<meta content="charset=utf-8"/>
		<title>Hello ExMobi</title>
		<script>
		<![CDATA[

		]]>
		</script>
	</head>
	<body>
        
	</body>
</html>--%>