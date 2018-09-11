<%-- ExMobi JSP文件，注释和取消快捷键统一为Ctrl+/ 多行注释为Ctrl+Shift+/ --%>
<%@ page language="java" import="java.util.*,org.json.*"
 contentType="application/uixml+xml; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="/client/adapt.jsp"%>
<%@ include file="/client/adapt_extend.jsp"%>
<% 
	String username= aa.req.getParameter("username");
	String password= aa.req.getParameter("password");	
	String sql = "select * from t_userinfo where login_id=? and login_pwd=?";
	TableRow row= aa.db.queryRow("mysql_local", sql, new Object[]{username,password});
	JSONObject resultJson=new JSONObject();

	if(row!=null){
		resultJson.put("result", "success");
		JSONObject userObj=new JSONObject();
		userObj.put("user_name", row.getField("user_name",""));
		userObj.put("login_id", row.getField("login_id",""));
		userObj.put("department", row.getField("department",""));
		userObj.put("sex", row.getField("sex", ""));
		userObj.put("title",row.getField("title",""));
		userObj.put("tel", row.getField("tel",""));
		resultJson.put("userinfo",userObj);	
		System.out.println("<<<>>------>"+row.getField("user_name","")+"<>>-----><<<><><>----<>"+password);

		//out.print("{\"result\":\"success\"}");
	}else{
		//out.print("{\"result\":\"failed\",\"msg\":\"用户名密码错误\"}");
		resultJson.put("result", "failed");
		resultJson.put("msg", "用户名密码有问题");
	}
	out.print(resultJson.toString());
%>