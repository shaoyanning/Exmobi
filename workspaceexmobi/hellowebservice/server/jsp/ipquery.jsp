<%-- ExMobi JSP文件，注释和取消快捷键统一为Ctrl+/ 多行注释为Ctrl+Shift+/ --%>
<%@ page language="java" import="java.util.*,org.json.*"
 contentType="application/uixml+xml; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="/client/adapt.jsp"%>
<%@ include file="/client/adapt_extend.jsp"%>
<%
	//String ipaddr=aa.req.getParameterFromUrl("ipaddr");
	String content =aa.req.getContent();
	JSONObject paramJson=new JSONObject(content);
	String ipaddr=paramJson.getString("ipaddr");
%>
<aa:http method="post" keepreqdata="false" id="ipquery" url="http://www.webxml.com.cn/WebServices/IpAddressSearchWebService.asmx">
<aa:header name="Content-Type" value="application/soap+xml;charset=UTF-8;action=http://WebXml.com.cn/getCountryCityByIp"/>
<aa:content>
<soap:Envelope xmlns:soap="http://www.w3.org/2003/05/soap-envelope" xmlns:web="http://WebXml.com.cn/">
   <soap:Header/>
   <soap:Body>
      <web:getCountryCityByIp>
         <!--Optional:-->
         
      <web:theIpAddress><%=ipaddr %></web:theIpAddress></web:getCountryCityByIp>
   </soap:Body>
</soap:Envelope>
</aa:content>
</aa:http>
<%
	String xmlStr =aa.regex.regex(".*","ipquery");	
%>
<aa:datasource value="<%=xmlStr %>" id="ipxml" wellformed="true"></aa:datasource>
<% 
	String addr=aa.xpath.xpath("(//*[local-name() = 'string'])[2]/text()","ipxml");
	out.print("{\"addr\":\""+addr+"\"}");
%>