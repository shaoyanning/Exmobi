<%@ page language="java" import="java.util.*"
 contentType="application/uixml+xml; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="/client/adapt.jsp"%>

<% 
	String city = "上海";
    String type = aa.req.getParameter("type");
    //System.err.println("===="+type);
	if("jwd".equals(type)){//客户端传来经纬度
		String lng = aa.req.getParameter("param1");
		String lat = aa.req.getParameter("param2");
		String getCity = "http://api.map.baidu.com/geocoder/v2/?ak=ARL41KNnmA253Sq2G8a6FLAt&location="+lng+","+lat+"&output=json";
	%>
		<aa:http id="getCity" url="<%= getCity %>" method="get" keepreqdata="false"/>
	<%
		try{
			JSONObject cityJSON = new JSONObject(aa.xpath.xpath(".", "getCity"));
			city = cityJSON.getJSONObject("result").getJSONObject("addressComponent").getString("city");
			city = city.endsWith("市")?city.substring(0,city.length()-1):city;
			city = "".equals(city)?"上海":city;
		}catch(Exception e){
			
		}
	}else{//客户端传来城市名
		city = aa.req.getParameter("param1");
	}
	
	//System.err.println("===="+city);
	String getWeatherUrl = "http://wthrcdn.etouch.cn/weather_mini?city="+city;
%>
<aa:http id="getWeather" url="<%= getWeatherUrl %>" method="get" keepreqdata="false" />

<% 
	JSONObject result = new JSONObject();
	try{
		JSONObject weatherJSON = new JSONObject(aa.xpath.xpath(".", "getWeather"));
		result.put("city",weatherJSON.getJSONObject("data").getString("city"));
		result.put("wendu",weatherJSON.getJSONObject("data").getString("wendu"));
		result.put("wtype",weatherJSON.getJSONObject("data").getJSONArray("forecast").getJSONObject(0).getString("type"));
		result.put("fengxiang",weatherJSON.getJSONObject("data").getJSONArray("forecast").getJSONObject(0).getString("fengxiang").replaceAll("无持续",""));
		result.put("fengli",weatherJSON.getJSONObject("data").getJSONArray("forecast").getJSONObject(0).getString("fengli"));
		result.put("type","success");
	}catch(Exception e){
		result.put("type","fail");
	}
	System.err.println("===="+result.toString());
	out.print(result.toString());
%>