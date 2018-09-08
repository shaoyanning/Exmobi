<%-- ExMobi JSP文件，注释和取消快捷键统一为Ctrl+/ 多行注释为Ctrl+Shift+/ --%>
<%@ page language="java" import="java.util.*, org.json.*"
 contentType="application/uixml+xml; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="/client/adapt.jsp"%>
<%@ include file="/client/adapt_extend.jsp"%>
<% 
	//JSONObject reqObj = new JSONObject(aa.req.getContent());
	String loginId = aa.req.getParameter("loginId");
	String loginPwd = aa.req.getParameter("loginPwd");
	String sexMale = aa.req.getParameter("sexMale");
	String sexWmale = aa.req.getParameter("sexGroup");
	String userName = aa.req.getParameter("sexGroup");
	String phoneNo = aa.req.getParameter("phoneNo");
	String personId=aa.req.getParameter("personId");
	String textArea=aa.req.getParameter("textArea");
	String userUuid = UUID.randomUUID().toString().replace("-", "");
	//String loginId = (String)reqObj.get("loginId");
	//String loginPwd = (String)reqObj.get("loginPwd");
	//String sexMale = (String)reqObj.get("sexMale");
	//String sexWmale = (String)reqObj.get("sexWmale");
	//String userName = (String)reqObj.get("userName");
	//String phoneNo =  (String)reqObj.get("phoneNo");
	//String personId = (String)reqObj.get("personId");
	//String textArea = (String)reqObj.get("textArea");
	////String userUuid = UUID.randomUUID().toString().replace("-", "");
	String insertSql = "insert into tbl_user_info values(?,?,?,?,?,?,?,?)";
	
	String tempSex="";
	if(sexMale.equals("")){
		tempSex="男";
	}else{
		tempSex="女";
	}
	
	int ret = aa.db.update("mysql", insertSql, new Object[]{userUuid,loginId,loginPwd,tempSex,userName,phoneNo,personId,textArea});
	
	System.out.print("==============================================");
	
	JSONObject resultJsonn = new JSONObject();
	
	System.out.print("<<<<<<<<<<<..."+ret+"...>>>>>>>>>");
	//log("<<<<<<<<<<<..."+ret+"...>>>>>>>>>");
	
	if(ret >0){
		resultJsonn.put("result", "success").put("msg","增加人员成功");
	}else{
		resultJsonn.put("result", "fail").put("msg","增加人员失败");
	}
	out.print(resultJsonn.toString());
%>