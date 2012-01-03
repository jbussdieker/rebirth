////////////////////////////////////////////////////////////////////////////////
// Data
////////////////////////////////////////////////////////////////////////////////
function GetExpense()
{
	xhr = new XMLHttpRequest();
	xhr.open("GET", "data/expense.php", false);
	xhr.send();
	return xhr.responseText;
}

function GetNetWorth()
{
	xhr = new XMLHttpRequest();
	xhr.open("GET", "data/networth.php", false);
	xhr.send();
	return xhr.responseText;
}

////////////////////////////////////////////////////////////////////////////////
// Graphs
////////////////////////////////////////////////////////////////////////////////
var expense;

function DisplayGraphs()
{
	document.getElementById("content").innerHTML = "<div id='graphmenu' class='jMenu'></div><div class='jTable'><div id='chart' style='margin:8px'></div></div>";
	document.getElementById("chart").style.width = "100%";
	document.getElementById("chart").style.height = window.innerHeight - 102;
	document.getElementById("graphmenu").innerHTML = "<div onClick='jMenuClick(this)' class='jMenuItemActive'>Expense</div>" + "<div onClick='jMenuClick(this)' class='jMenuItem'>Net</div>"

	DisplayExpense();
}

function DisplayNet()
{
	networth = GetNetWorth();
  var data = new google.visualization.DataTable(networth);
  chart = new google.visualization.LineChart(document.getElementById('chart'));
  chart.draw(data, 
  	{
  		backgroundColor: "#bbb", 
  		width: window.innerWidth - 32, 
  		height: window.innerHeight - 102, 
  		reverseCategories: true,
  		is3D: true, 
  		legend: 'none',
  		title: 'Net Worth',
  		enableEvents: true,
  		fontName: "sans-serif",
  		vAxis:{minValue:0},
			chartArea:{left:50,top:14,width:window.innerWidth - 32 - 20,height:window.innerHeight - 102 - 72}  		
  	});
  	
  google.visualization.events.addListener(chart, 'select', GraphClick);
}

function DisplayExpense()
{
	expense = GetExpense();
  var data = new google.visualization.DataTable(expense);
  chart = new google.visualization.PieChart(document.getElementById('chart'));
  chart.draw(data, 
  	{
  		backgroundColor: "#bbb", 
  		width: window.innerWidth - 32, 
  		height: window.innerHeight - 102, 
  		is3D: true, 
  		title: 'Expense',
  		enableEvents: true,
  		fontName: "sans-serif",
  		chartArea:{left:8,top:0,width:"100%",height:"100%"}
  	});
  	
  google.visualization.events.addListener(chart, 'select', GraphClick);
}

function GraphClick(event)
{
	expenses = JSON.parse(expense);
	var selection = chart.getSelection();
	DisplayTransactions(expenses.rows[selection[0].row].c[2].v);
}
