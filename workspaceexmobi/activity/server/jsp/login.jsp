<%-- ExMobi JSP文件，注释和取消快捷键统一为Ctrl+/ 多行注释为Ctrl+Shift+/ --%>
<%@ page language="java" import="java.util.*,org.json.*"
 contentType="application/uixml+xml; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="/client/adapt.jsp"%>
<%@ include file="/client/adapt_extend.jsp"%>


<% 
	String username=aa.req.getParameter("username");
	String password=aa.req.getParameter("password");
	
	String sql = "select login_id, login_pwd from tbl_user_info where login_id=? and login_pwd=?";
	
	TableRow row= aa.db.queryRow("mysql", sql, new Object[]{username,password});
	
	JSONObject resultJson=new JSONObject();
	
	if(row!=null){
		resultJson.put("result", "success");
		
		JSONObject userObj=new JSONObject();
		
		userObj.put("username", row.getField("login_id",""));
		userObj.put("password", row.getField("login_pwd",""));

		resultJson.put("userinfo",userObj);	
		System.out.println("<<<>>------>"+row.getField("login_id","")+"<>>-----><<<><><>----<>"+password);

	}
	else{
		resultJson.put("result", "failed");
		resultJson.put("msg", "用户名密码有问题");
	}
	out.print(resultJson.toString());
%>