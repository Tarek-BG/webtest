<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
<xsl:template match="/">
<html> 
<body>
  <h2>My Cars Collection</h2>
   <a href="https://free-jqgrid.github.io/getting-started/index.html">How to use free jqGrid?</a>
  
  <table border="1">
    <tr bgcolor="#9acd32">
      <th style="text-align:left">Manufacturer</th>
      <th style="text-align:left">Model</th>
    </tr>
    <xsl:for-each select="catalogCars/Car">
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
