<%-- ExMobi JSP文件，注释和取消快捷键统一为Ctrl+/ 多行注释为Ctrl+Shift+/ --%>
<%@ page language="java" import="java.util.*,org.json.*"
 contentType="application/uixml+xml; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="/client/adapt.jsp"%>
<%@ include file="/client/adapt_extend.jsp"%>
<% 
	//获取客户端数据
	String username = aa.req.getParameter("username");
	String password = aa.req.getParameter("password");
	
	//响应JSON 
	JSONObject jsonObj = new JSONObject();
	//链接数据库并查询
	TableRow row = aa.db.queryRow("mysql_db", "select * from t_userinfo where login_id=? and login_pwd=?", new Object[]{username,password});
	if(row !=null){
		//存储登录用户信息的JSON
		JSONObject userInfo = new JSONObject();
		
		userInfo.put("username", row.getField("login_id"));
		userInfo.put("passowrd", row.getField("login_pwd"));
		
		jsonObj.put("userInfo", userInfo);
	
		jsonObj.put("result", "success");
	}else{
		jsonObj.put("result", "failed");
		jsonObj.put("msg", "用户名或者密码错误");
	}
	out.print(jsonObj.toString());
%>