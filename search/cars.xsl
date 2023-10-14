﻿<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/xsl/Transform">
<xsl:template match="/">
<html>
<body>
  <h1>Question 1</h1>
  <table border="1">
    <tr bgcolor="#9acd32">
      <th style="text-align:left">Manufacturer</th>
      <th style="text-align:left">Model</th>
    </tr>
    <xsl:for-each select="cars/car">
    <tr>
      <td><xsl:value-of select="Manufacturer"/></td>
      <td><xsl:value-of select="Model"/></td>
    </tr>
    </xsl:for-each>
  </table>
</body>
</html>
</xsl:template>
</xsl:stylesheet>