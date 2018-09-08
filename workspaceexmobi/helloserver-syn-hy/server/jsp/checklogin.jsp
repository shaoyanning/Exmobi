<%-- ExMobi JSP文件，注释和取消快捷键统一为Ctrl+/ 多行注释为Ctrl+Shift+/ --%>
<%@ page language="java" import="java.util.*"
 contentType="application/uixml+xml; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="/client/adapt.jsp"%>
<%@ include file="/client/adapt_extend.jsp"%>
<%
	String username=aa.req.getParameter("username");
	String password=aa.req.getParameter("password");
	
	/*if(username!=" "){
		out.print("{\"result\":\"success\"}");
	}else{
		out.print("{\"result\":\"failed\",\"msg\":\"用户名字或密码有问题\"}");
	}*/
%>

<!--  -->

<aa:http id="checklogin" url="https://oa.tongda2000.com/logincheck.php" method="post" keepreqdata="false">
	<aa:param name="UNAME" value="<%=username%>"/>
	<aa:param name="PASSWORD" value="<%=password%>"/>
	<aa:param name="encode_type" value="1"/>
</aa:http>
<% 
	String rsp = aa.xpath.xpath("//div[@class='big1']/text()","checklogin");
	if(rsp.indexOf("正在进入OA系统")>-1){
		out.print("{\"result\":\"success\"}");
	}else{
		rsp=aa.xpath("//div[@class='msg-content']/text()","checklogin");
		rsp=aa.xpath("{\"result\":\"failed\",\"msg\":\""+rsp+"\"}");
	}
%>