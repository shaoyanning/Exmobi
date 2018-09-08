<%-- ExMobi JSP文件，注释和取消快捷键统一为Ctrl+/ 多行注释为Ctrl+Shift+/ --%>
<%@ page language="java" import="java.util.*"
 contentType="application/uixml+xml; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="/client/adapt.jsp"%>
<%@ include file="/client/adapt_extend.jsp"%>

<% 
	String filename=aa.req.getParameterFromUrl("filename");
%>

<aa:http id="getfile"></aa:http>

<aa:if test="<%=aa.req.isDownload()%>">
	<aa:file-download filename="<%=filename %>" dsId="getfile"/>
</aa:if>

<aa:if test="<%=!aa.req.isDownload()%>">
	<aa:file-preview filename="<%=filename %>" dsId="getfile"/>
</aa:if>
<% 


%>