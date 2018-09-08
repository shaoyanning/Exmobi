<%-- ExMobi JSP文件，注释和取消快捷键统一为Ctrl+/ 多行注释为Ctrl+Shift+/ --%>
<%@ page language="java" import="java.util.*,java.text.SimpleDateFormat,java.nio.*"
 contentType="application/uixml+xml; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="/client/adapt.jsp"%>
<%@ include file="/client/adapt_extend.jsp"%>

<% 
	JSONObject outJson= new JSONObject();

	String activity_title=aa.req.getParameter("subject");
	String activity_content=aa.req.getParameter("subje");
	
	java.text.SimpleDateFormat formatTime=new SimpleDateFormat("yyyy-MMM-dd HH:mm");
	String begin_timeStr=aa.req.getParameter("DAD_Begin_Date");
	java.util.Date beginDate= formatTime.parse(begin_timeStr);
	
	Timestamp beginTime = new Timestamp(beginDate.getTime());
	
	String end_timeStr = aa.req.getParameter("DAD_End_Date");
	java.util.Date endDate=formatTime.parse(end_timeStr);
	
	Timestamp endTime =new Timestamp(endDate.getTime());
	
	if(beginDate.getTime()>=endDate.getTime()){
		outJson.put("result", "fail");
		outJson.put("msg", "开始时间必须早于结束时间");
		out.print(outJson.toString());
		return;
	}
	
	String address=aa.req.getParameter("DAT_Addr_Details");
	
	String deadline_timeStr=aa.req.getParameter("remarks_End_Date");
	java.util.Date deadlineDate=formatTime.parse(deadline_timeStr);
	
	Timestamp deadlineTime =new Timestamp(deadlineDate.getTime());
	if(deadlineDate.getTime()>=beginDate.getTime()){
		outJson.put("result", "fail");
		outJson.put("msg", "报名截止时间必须早于活动开始时间");
		out.print(outJson.toString());
		return;
	}
	
	//
	String contact_tel=aa.req.getParameter("remarks_phone_no");
	String person_limitStr = aa.req.getParameter("remarks_limits");
	//活动人数限制
	Integer person_limit = ! person_limitStr.equals("")?new Integer(person_limitStr):null;
	
	String nessary = aa.req.getParameter("necessary");
	
	String poster_img_uuid= aa.req.getParameter("poster_img_uuid");
	
	String activity_imgs= aa.req.getParameter("hide_9img_uuid");
	
	String activity_uuid = UUID.randomUUID().toString().replace("-", "");
	//拼sql语句
	String inserSql="insert into tbl_activity_info(";
	String sqlParamKey="activity_uuid,begin_time,end_time,address,contact_tel,deadline_time,poster_img_uuid,activity_title,activity_content";
	String sqlParamCode="?,?,?,?,?,?,?,?,?";
	inserSql += sqlParamKey+") values ("+sqlParamCode+")";
	
	
	List<Object> paramObjects=new ArrayList<Object>();
	paramObjects.add(activity_uuid);
	paramObjects.add(beginTime);
	paramObjects.add(endTime);
	paramObjects.add(address);
	paramObjects.add(contact_tel);
	paramObjects.add(deadlineTime);
	paramObjects.add(poster_img_uuid);
	paramObjects.add(activity_title);
	paramObjects.add(activity_content);
	
	
	//后台验证
	if(null!=person_limit){
		sqlParamKey += ",person_limit";
		sqlParamCode +=",?";
		paramObjects.add(person_limit);
	}
	if(!nessary.equals("")){
		sqlParamKey += ",necessary";
		sqlParamCode +=",?";
		paramObjects.add(nessary);
	}
	if(!activity_imgs.equals("")){
		sqlParamKey += ",activity_imgs";
		sqlParamCode +=",?";
		paramObjects.add(activity_imgs);
	}
	
	int ret = aa.db.update("mysql", inserSql, paramObjects.toArray());
	if(ret > 0){
		outJson.put("result", "success");
		outJson.put("msg", "发布活动成功");
	}else{
		outJson.put("result", "fail");
		outJson.put("msg", "入库失败，请联系管理员");
	}
	out.print(outJson.toString());
	
%>