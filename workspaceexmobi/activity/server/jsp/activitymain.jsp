<%-- ExMobi JSP文件，注释和取消快捷键统一为Ctrl+/ 多行注释为Ctrl+Shift+/ --%>
<%@ page language="java" import="java.util.*"
 contentType="application/uixml+xml; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="/client/adapt.jsp"%>
<%@ include file="/client/adapt_extend.jsp"%>

<% 
	JSONObject outJson = new JSONObject();
	
	String posterImgPathStr = aa.req.getAttachAddr("photouploadid");
	
	String posterImgName = aa.req.getAttachName("photouploadid");
	String imgSurfix = posterImgName.substring(posterImgName.lastIndexOf("."),posterImgName.length());
	
	File tempPosterImg = new File(posterImgPathStr);
	
	File realPosterImgFile = new File("D:\\var\\activityimg\\"+UUID.randomUUID().toString().replaceAll("-", "")+imgSurfix);
	
	java.nio.channels.FileChannel inputChannel = null;
	java.nio.channels.FileChannel outputChannel = null;
	
	try{
		realPosterImgFile.createNewFile();
		inputChannel = new FileInputStream(tempPosterImg).getChannel();
		outputChannel= new FileOutputStream(realPosterImgFile).getChannel();
		
		outputChannel.transferFrom(inputChannel,0,inputChannel.size());
		
		String insertSql="insert into tbl_img value(?,?)";
		String img_uuid=UUID.randomUUID().toString().replace("-", ",");
		
		int ret = aa.db.update("mysql", insertSql, new Object[]{img_uuid,realPosterImgFile.getPath()});
		if(ret>0){
			outJson.put("result","success");
			//poster_img_uuid
			outJson.put("poster_img_uuid",img_uuid);
		}
		else{
			outJson.put("result", "fail");
			outJson.put("msg", "入库失败，请联系管理员");
		}
	}
	catch(Exception e){
		outJson.put("result", "fail");
		outJson.put("msg", "上传图片失败，请联系管理员");
	}
	finally{
		inputChannel.close();
		outputChannel.close();
	}
	out.print(outJson.toString());
%>