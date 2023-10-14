<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/xsl/Transform">
<xsl:template match="/">
<html>
<head>
	<meta charset="utf-8" />
	<title>My Plants</title>
</head>
<body>
  <h1>Question 1</h1>
  <table border="1">
	<tr>
	  <th>Manufacturer</th>
	  <th>YearFrom</th>
	</tr>
	<xsl:for-each select="CarsDB/Car">
	  <tr>
		  <td><xsl:value-of select="Manufacturer"/></td>
		  <td><xsl:value-of select="YearFrom"/></td>
	  </tr>                
	</xsl:for-each>
  </table>
  
</body>
</html>
</xsl:template>
</xsl:stylesheet>