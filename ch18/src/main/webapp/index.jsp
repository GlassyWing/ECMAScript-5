<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jstl/core" %>
<html>
<head>
    <script src="pages/ajax.js"></script>
</head>
<body>
<h2>Hello World!</h2>
<script>
    getText("/response",function (responseText) {
        console.log(responseText);
    })
</script>
</body>
</html>
