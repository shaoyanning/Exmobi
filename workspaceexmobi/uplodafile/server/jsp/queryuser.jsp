
<%-- ExMobi JSP文件，注释和取消快捷键统一为Ctrl+/ 多行注释为Ctrl+Shift+/ --%>
<%@ page language="java" import="java.util.*"
 contentType="application/uixml+xml; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="/client/adapt.jsp"%>
<%@ include file="/client/adapt_extend.jsp"%>
<% 
	String username=aa.req.getParameter("username");
	String sql="select * from t_userinfo";
	List<TableRow> rows=null;
	if(username!=""){
		sql+=" where and user_name like ?";
		aa.db.query("mysql_local",sql,new Object[]{"%"+username+"%"}); 
	}else{
		aa.db.query("mysql_local",sql,new Object[]{"%"+username+"%"});
	}
	JSONObject result =new JSONObject();
	JSONArray users=new JSONArray();
	for(TableRow row:rows){
		JSONObject user =new JSONObject();
		user.put("login_id",row.getField("login_id",""));
		user.put("login_pwd",row.getField("login_pwd",""));
		user.put("login_name",row.getField("login_name",""));
		user.put("sex",row.getField("sex",""));
		user.put("login_id",row.getField("login_id",""));
		user.put("login_id",row.getField("login_id",""));
		user.put("login_id",row.getField("login_id",""));
		
	}
%>