<%-- ExMobi JSP文件，注释和取消快捷键统一为Ctrl+/ 多行注释为Ctrl+Shift+/ --%>
<%@ page language="java" import="java.util.*"
 contentType="application/uixml+xml; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="/client/adapt.jsp"%>
<%@ include file="/client/adapt_extend.jsp"%>

<% 

	JSONObject outJson=new JSONObject();
	List<String> imgAddrList = aa.req.getAttachAddrs("photouploadid_9");
	
	java.nio.channels.FileChannel inputChannel =  null;
	java.nio.channels.FileChannel outputChannel = null;

	List<Object[]> params = new ArrayList<Object[]>();
	
	try{
		for(String imgAddr:imgAddrList){
			String imgSurfix = imgAddr.substring(imgAddr.lastIndexOf("."),imgAddr.length());
			File tempActImg = new File(imgAddr);
			File realActImgFile = new File("D:\\var\\activityimg"+UUID.randomUUID().toString().replace("-", "")+imgSurfix);
			realActImgFile.createNewFile();
			inputChannel=new FileInputStream(tempActImg).getChannel();
			outputChannel=new FileOutputStream(realActImgFile).getChannel();
			
			outputChannel.transferFrom(inputChannel, 0, inputChannel.size());
			
			String imgUuid=UUID.randomUUID().toString().replace("-", "");
			String imgPath=realActImgFile.getPath();
			params.add(new Object[]{imgUuid,imgPath});
		}
	}
	catch(Exception e){
		outJson.put("result", "fail");
		outJson.put("msg", "上传图片失败，请联系管理员");
		out.print(outJson.toString());
	}
	finally{
		inputChannel.close();
		outputChannel.close();
	}
	
	int ret = aa.db.batchUpdate("mysql","insert into tbl_img value(?,?)",params);
	if(ret>0){
		outJson.put("result","success");
		String[] uuids = new String[params.size()];
		for(int i=0;i<uuids.length;i++){
			uuids[i]=(String)params.get(i)[0];
		}
		//hide_9img_uuid
		outJson.put("hide_9img_uuid", uuids);
		out.print(outJson.toString());
	}
	else{
		outJson.put("result", "fail");
		outJson.put("msg", "入库失败，请联系管理员");
		out.print(outJson.toString());
	}

%>