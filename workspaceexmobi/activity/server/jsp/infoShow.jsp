<%-- ExMobi JSP文件，注释和取消快捷键统一为Ctrl+/ 多行注释为Ctrl+Shift+/ --%>
<%@ page language="java" import="java.util.*,org.json.*"
 contentType="application/plain; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="/client/adapt.jsp"%>
<%@ include file="/client/adapt_extend.jsp"%>

 
<% 
System.out.println("*****"+aa.req.getContent());
	JSONObject reqObj=new JSONObject(aa.req.getContent());
	
	String loginId = (String)reqObj.get("username");
	String loginPwd = (String)reqObj.get("password");
	
	System.out.println("$$$$$$$$$$$$$$$$$$$$$$$$$$$$$"+reqObj.get("username"));
	log("---------------------------------666666666666666666666666666666---");
	
	String sql = "select * from tbl_user_info where login_id=? and login_pwd=?";
	
	TableRow row= aa.db.queryRow("mysql", sql, new Object[]{loginId,loginPwd});
	
	
	JSONObject resultJson=new JSONObject();
	
	if(row!=null){
		resultJson.put("result", "success");
		resultJson.put("msg", "成功");
		JSONObject userObj=new JSONObject();
				
		userObj.put("username", row.getField("login_id",""));
		userObj.put("password", row.getField("login_pwd",""));
		userObj.put("sexMale", row.getField("login_pwd",""));
		userObj.put("userName", row.getField("user_name"));
		userObj.put("phoneNo", row.getField("tel_no",""));
		userObj.put("personId", row.getField("identify_id",""));
		userObj.put("textArea", row.getField("remark",""));
		userObj.put("userUuid", row.getField("user_uuid",""));
		resultJson.put("userinfo",userObj);	
		System.out.println("<<<>>------>"+row.getField("login_id","")+"<>>-----><<<><><>----<>"+loginId);

	}
	else{
		resultJson.put("result", "failed");
		resultJson.put("msg", "用户名密码有问题");
	}
	out.print(resultJson.toString());
%>