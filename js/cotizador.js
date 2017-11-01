var spreadsheet = 'https://docs.google.com/spreadsheets/d/1dOXsEwF9BPW-RLJylxpqpxxLABoeWJnnB6jg4mBKKSE/edit#gid=0';

// Lists
var inmuebleList = Handlebars.compile($('#inmuebleList-template').html());
var areaList = Handlebars.compile($('#areaList-template').html());
// Results
var result = Handlebars.compile($('#result-template').html());

$('#areaDiv').css('visibility', 'hidden');
$('#result').css('visibility', 'hidden');

// Load lists
$('#inmuebleList').html('').append("<option>Seleccione</option>");
$('#inmuebleList').sheetrock({
  reset: true,
  url: spreadsheet,
  query: "select B,count(A) group by B order by B",
  labels: ['value', 'count'],
  rowTemplate: inmuebleList
});

$('#inmuebleList').change(function() {
	$('#areaDiv').css('visibility', 'visible');
	$('#result').css('visibility', 'hidden');
	var inmuebleListSelected = $('#inmuebleList option:selected').text();
	var query = "select D,count(A) where B = '" + inmuebleListSelected + "' group by D order by D";
	$('#areaList').html('').append("<option>Seleccione</option>");
	$('#result').html('');
	$('#areaList').sheetrock({
		reset: true,
		url: spreadsheet,
		query: query,
		labels: ['value', 'count'],
		rowTemplate: areaList
	});
});

$('#areaList').change(function() {
	$('#result').css('visibility', 'visible');
	var inmuebleListSelected = $('#inmuebleList option:selected').text();
	var areaListSelected = $('#areaList option:selected').text();
	var query = "select * where B = '" + inmuebleListSelected + "' and D = " + areaListSelected;
	$('#result').html('');
	$('#result').sheetrock({
		reset: true,
		url: spreadsheet,
		query: query,
		rowTemplate: result
	});
});