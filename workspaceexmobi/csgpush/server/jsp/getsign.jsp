<%-- ExMobi JSP文件，注释和取消快捷键统一为Ctrl+/ 多行注释为Ctrl+Shift+/ --%>
<%@ page language="java" import="java.util.*,java.security.MessageDigest"
 contentType="application/uixml+xml; charset=UTF-8" pageEncoding="UTF-8"%>
<%!
/**
 * 获取SHA1加密签名
 * @param map 要加密的参数
 * @param secretkey 密钥——在M-Plus服务端创建
 * @return
 */
public static String getSign(Map<String,String> map,String secretkey){
	
	/**
	 * Sign签名方法为： 
	 *	首先 按参数key字母a-z顺序将所有参数名和参数值成一个字符串：
	 *	appKey00001assignedLicenseNum1formatjsonlocalezh_CNmemowebapi1methodmobileark.addorgorgCodewebapi1orgNamewebapi11v1.0
	 *	假设，appKey为00001的 secret（应用密钥） 是“asd”，则将“asd ”分别添加到以上请求参数串的头部和尾：
	 *	asdappKey00001assignedLicenseNum1formatjsonlocalezh_CNmemowebapi1methodmobileark.addorgorgCodewebapi1orgNamewebapi11v1.0asd
	 *	对以上字符串进行SHA1签名运算，将签名值转换为十六进制的编码串，得到： 
	 *	762C1F1B50B40F92F89B4A45C34E82CC4678FE2B
	 */
	 StringBuilder sb = new StringBuilder();
     List<String> paramNames = new ArrayList<String>(map.size());
     paramNames.addAll(map.keySet());
     //对参数按字母a-z顺序将所有参数名和参数值成一个字符串
     Collections.sort(paramNames);
     sb.append(secretkey);
     for (String paramName : paramNames) {
         //sb.append(paramName).append(changeStr(map.get(paramName)));
         sb.append(paramName).append(map.get(paramName));
     }
     sb.append(secretkey);
	
    System.out.println("*****************str:"+sb.toString());
    //开始SHA1加密
    String sign = MD5Encode(sb.toString()).toUpperCase();
    return sign;
}

private final static String changeStr(String str){
	return str.replaceAll("%", "%25").replaceAll("&", "%26").replaceAll("\\+", "%2B");
}

private final static String[] hexDigits = {"0", "1", "2", "3", "4", "5", "6", "7",
    "8", "9", "a", "b", "c", "d", "e", "f"};

/**
 * 转换字节数组为16进制字串
 * @param b 字节数组
 * @return 16进制字串
 */
public static String byteArrayToHexString(byte[] b) {
    StringBuilder resultSb = new StringBuilder();
    for (byte aB : b) {
        resultSb.append(byteToHexString(aB));
    }
    return resultSb.toString();
}

/**
 * 转换byte到16进制
 * @param b 要转换的byte
 * @return 16进制格式
 */
private static String byteToHexString(byte b) {
    int n = b;
    if (n < 0) {
        n = 256 + n;
    }
    int d1 = n / 16;
    int d2 = n % 16;
    return hexDigits[d1] + hexDigits[d2];
}

/**
 * MD5编码
 * @param origin 原始字符串
 * @return 经过SHA1加密之后的结果
 */
public static String MD5Encode(String origin) {
    String resultString = null;
    try {
        resultString = origin;
        MessageDigest md = MessageDigest.getInstance("SHA-1");
        resultString = byteArrayToHexString(md.digest(resultString.getBytes("utf-8")));
    } catch (Exception e) {
        e.printStackTrace();
    }
    return resultString;
}
%>