function onOpen() {
  FormApp.getUi() // Or DocumentApp or FormApp.
      .createMenu('Custom Menu')
      .addItem('Show sidebar', 'showSidebar')
      .addToUi();
}

function showSidebar() {
  Logger.log("Showing Sidebar...");
  var html = HtmlService.createHtmlOutputFromFile('test')
      .setTitle('My custom sidebar')
      .setWidth(300);
  FormApp.getUi() // Or DocumentApp or FormApp.
      .showSidebar(html);
}

function getSomeData() {
  return [["Cell 1"],["Cell 2"],["Cell 3"],["Cell 4"],["Cell 5"]];
}