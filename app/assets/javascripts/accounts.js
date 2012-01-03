////////////////////////////////////////////////////////////////////////////////
// Data
////////////////////////////////////////////////////////////////////////////////
function GetAccountList(filter)
{
	xhr = new XMLHttpRequest();
	xhr.open("GET", "accounts.json", false);
	xhr.send();
	return JSON.parse(xhr.responseText);
}

function GetAccount(id)
{
	xhr = new XMLHttpRequest();
	xhr.open("GET", "data/account.php?id=" + id, false);
	xhr.send();
	return JSON.parse(xhr.responseText);
}

function GetTransactions(id)
{
	xhr = new XMLHttpRequest();
	xhr.open("GET", "data/transactions.php?id=" + id, false);
	xhr.send();
	return JSON.parse(xhr.responseText);
}

function GetTransaction(id)
{
	xhr = new XMLHttpRequest();
	xhr.open("GET", "data/transaction.php?id=" + id, false);
	xhr.send();
	return JSON.parse(xhr.responseText);	
}

function GetMethodList()
{
	xhr = new XMLHttpRequest();
	xhr.open("GET", "data/methods.php", false);
	xhr.send();
	return JSON.parse(xhr.responseText);
}

function GetCategoryList()
{
	xhr = new XMLHttpRequest();
	xhr.open("GET", "categories.json", false);
	xhr.send();
	return JSON.parse(xhr.responseText);
}

function GetJournalList(id)
{
	xhr = new XMLHttpRequest();
	xhr.open("GET", "data/journals.php?id=" + id, false);
	xhr.send();
	return JSON.parse(xhr.responseText);
}

// Account table entries
function CreateAccount(categoryid, caption)
{
	var jsondata = JSON.stringify({"caption":caption, "categoryid":categoryid});
	var result = jXHR("data/account.php?jsondata=" + jsondata);
	if (result)
		alert(result);
}

function UpdateAccount(id, categoryid, caption)
{
//, categoryid.value, caption.value
	alert(id + " " + categoryid + " " + caption);
	return;
	var jsondata = JSON.stringify({"id":id, "caption":caption, "categoryid":categoryid});
	var result = jXHR("data/account.php?jsondata=" + jsondata);
	if (result)
		alert(result);
}

function DeleteAccount(id)
{
	var result = jXHR("data/account.php?id=" + id + "&jsondata=");
	if (result)
		alert(result);
}

////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
// Accounts
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
var menuAccounts;
var lastAccounts;

function DisplayCreateAccount()
{
	var categories = GetCategoryList();
	var render = "";

	render += "<table class='jTable'>";
	render += "<tr>";
	render += "<td class='jTableCell'>Caption<br><input name='caption' id='caption' type='text' value=''></input></td>";
	render += "</tr>";
	
	render += "<tr>";
	render += "<td class='jTableCell'>Category<br><select id='categoryid' name='categoryid'>";

	for (var i in categories)
	{
		render += "<option value=" + categories[i].id + ">" + categories[i].caption + "</option>";
	}

	render += "</select>";
	render += "</td>";
	render += "</tr>";

	render += "<tr>";
	render += "<td class='jTableCell'>";
	render += "<div class='button' onClick='CreateAccount(categoryid.value, caption.value); DisplayAccounts();'>Create Account</div><br><br>";
	render += "</td>";
	render += "</tr>";

	render += "</table>";
	
	document.getElementById("content").innerHTML = render;
}

function DisplayAccounts()
{
	var accounts = GetAccountList("bank");
	var render = "";
	var curcat = "";

	menuAccounts = undefined;
	lastAccounts = undefined;

	render += "<div class='button' onClick='DisplayCreateAccount()'>Create</div><br><br>";

	render += "<table class='jTable'>";
	for (var i in accounts)
	{
		if (accounts[i].category != curcat)
		{
			render += "<tr class='jTableRow'>";
			render += "<td class='jTableCell' colspan=2><div class='jTableHeader'>" + accounts[i].category + "</div></td>";
			render += "</tr>";
			curcat = accounts[i].category;
		}
		render += "<tr id=" + accounts[i].id + " class='jTableRow' style='cursor: pointer' onClick='DisplayAccountMenu(this)'>";
		render += "<td class='jTableCell'>" + accounts[i].account + "</td>";
		render += "<td class='jTableCell' align=right>";
		if (accounts[i].balance != parseFloat(accounts[i].balance))
			render += "&nbsp;";
		else
			render += accounts[i].balance;
		render += "</td>";
		render += "</tr>";
	}
	render += "</table>";

	document.getElementById("content").innerHTML = render;
}

function DisplayAccount(id)
{
	var account = GetAccount(id);
	var categories = GetCategoryList();
	var render = "";
	var curcat = "";

	render += "<table class='jTable'>";
	render += "<tr>";
	render += "<td class='jTableCell'>Caption<br><input id='caption' type='text' value='" + account[0].caption + "'></input></td>";
	render += "</tr>";
	
	render += "<tr>";
	render += "<td class='jTableCell'>Category<br><select id='categoryid'>";

	for (var i in categories)
	{
		render += "<option value=" + categories[i].id;
		
		if (categories[i].id == account[0].categoryid)
			render += " selected>" + categories[i].caption + "</option>";
		else
			render += ">" + categories[i].caption + "</option>";
	}

	render += "</select>";
	render += "</td>";
	render += "</tr>";

	render += "<tr>";
	render += "<td class='jTableCell'>";
	render += "<div class='button' onClick='UpdateAccount(" + id + ", categoryid.value, caption.value); DisplayAccounts();'>Update Account</div><br><br>";
	render += "</td>";
	render += "</tr>";

	render += "</table>";

	document.getElementById("content").innerHTML = render;
}

function DisplayAccountMenu(elem)
{
	// Check for existing menu
	if (menuAccounts)
	{
		menuAccounts.previousSibling.style.backgroundColor = "";
		menuAccounts.parentNode.removeChild(menuAccounts);
		menuAccounts = undefined;
		if (lastAccounts==elem)
		{
			lastAccounts = undefined;
			return;
		}
	}

	elem.style.backgroundColor = "#ddd";
	lastAccounts = elem;
	
	// New Row
	menuAccounts = document.createElement("tr");
	menuAccounts.innerHTML = "<td style='background: #ddd' colspan=3><div class='button' onClick='DisplayTransactions(" + elem.id + ")'>Register</div><div class='button' onClick='DisplayAccount(" + elem.id + ")'>Edit</div><div style='float:right' class='button' onClick='DeleteAccount(" + elem.id + "); DisplayAccounts();'>Delete</div></td>";

	// Append
	if(elem.nextSibling) {
		elem.parentNode.insertBefore(menuAccounts, elem.nextSibling);
	} else {
		elem.parentNode.appendChild(menuAccounts);
	}
}

////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
// Transactions
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
var menuTrans;
var lastTrans;

function DisplayCreateTransaction(accountid)
{
	var render = "";
	document.getElementById("content").innerHTML = render;
}

function DisplayTransactions(id)
{
	var transactions = GetTransactions(id);
	var render = "";

	menuTrans = undefined;
	lastTrans = undefined;

	render += "<div class='button' onClick='DisplayCreateTransaction(" + id + ")'>Create</div><br><br>";

	render += "<table class='jTable'>";

	render += "<tr class='jTableRow'>";
	render += "<td class='jTableCell'><div class='jTableHeader'>Date<br>Method</div></td>";
	render += "<td class='jTableCell'><div class='jTableHeader'>Contact<br>Memo</div></td>";
	render += "<td class='jTableCell' align=right><div class='jTableHeader'>Amount<br>Balance</div></td>";
	render += "</tr>";

	for (var i in transactions)
	{
		//render += "<tr class='jTableRow' style='cursor: pointer' onClick='DisplayTransaction(" + transactions[i].id + ")'>";
		render += "<tr id=" + transactions[i].id + " class='jTableRow' style='cursor: pointer' onClick='DisplayTransactionMenu(this)'>";

		render += "<td class='jTableCell'>" + transactions[i].transdate + "<br>" + transactions[i].method + "</td>";
		render += "<td class='jTableCell'>" + escapeHtml(transactions[i].contact) + "<br>" + transactions[i].memo + "</td>";
		render += "<td class='jTableCell' align=right>" + transactions[i].Amount + "<br>" + transactions[i].Balance + "</td>";

		render += "</tr>";
	}
	render += "</table>";

	document.getElementById("content").innerHTML = render;
}

function DisplayTransactionMenu(elem)
{
	// Check for existing menu
	if (menuTrans)
	{
		menuTrans.previousSibling.style.backgroundColor = "";
		menuTrans.parentNode.removeChild(menuTrans);
		menuTrans = undefined;
		if (lastTrans==elem)
		{
			lastTrans = undefined;
			return;
		}
	}

	elem.style.backgroundColor = "#ddd";
	lastTrans = elem;
	
	// New Row
	menuTrans = document.createElement("tr");
	menuTrans.innerHTML = "<td style='background: #ddd' align='center' colspan=3><div class='button' onClick='DisplayTransaction(" + elem.id + ")'>Edit</div><div style='float:right' class='button'>Delete</div></td>";

	// Append
	if(elem.nextSibling) {
		elem.parentNode.insertBefore(menuTrans, elem.nextSibling);
	} else {
		elem.parentNode.appendChild(menuTrans);
	}
}

////////////////////////////////////////////////////////////////////////////////
// Transaction
////////////////////////////////////////////////////////////////////////////////
function DisplayTransaction(id)
{
	var transaction = GetTransaction(id);	
	var contacts = GetContactList(false);
	var methods = GetMethodList();
	var journal = GetJournalList(id);
	var accounts = GetAccountList();
	var render = "";

	render += "<table class='jTable'>";
	render += "<tr>";
	render += "<td class='jTableCell'>Contact<br><select>";
	
	for (var i in contacts)
	{
		if (contacts[i].id == transaction[0].contactid)
			render += "<option selected>" + contacts[i].caption + "</option>";
		else
			render += "<option>" + contacts[i].caption + "</option>";
	}
	
	render += "</select></td>";
	render += "<td class='jTableCell'>Method<br><select>";
	
	for (var i in methods)
	{
		if (methods[i].id == transaction[0].methodid)
			render += "<option selected>" + methods[i].caption + "</option>";
		else
			render += "<option>" + methods[i].caption + "</option>";
	}
	render += "</select></td>";
	
	render += "</tr>";
	render += "<tr>";
	render += "<td class='jTableCell'>Account<br><select style='width:100%'>";

	for (var j in accounts)
	{
		if (accounts[j].id == journal[0].accountid)
			render += "<option selected>" + accounts[j].account + "</option>";
		else
			render += "<option>" + accounts[j].account + "</option>";
	}
	
	render += "</select></td>";
	
	render += "<td class='jTableCell'>Ref Num<br><input type='text' size=6 value='" + transaction[0].refnum + "'></input></td>";
	render += "</tr>";
	render += "<tr>";
	render += "<td class='jTableCell'>Date<br><input type='text' value='" + transaction[0].transdate + "'></input></td>";
	render += "</tr>";

	render += "</table>";

	render += "<br>";

	render += "<table class='jTable'>";
	render += "<tr>";
	render += "<th class='jTableCell'>Account</th>";
	render += "<th class='jTableCell'>Date</th>";
	render += "<th class='jTableCell'>Memo</th>";
	render += "<th class='jTableCell'>Amount</th>";
	render += "</tr>";

	for (var i in journal)
	{
		if (i > 0)
		{
			render += "<tr>";
			render += "<td class='jTableCell'><select style='width:100%'>";

			for (var j in accounts)
			{
				if (accounts[j].id == journal[i].accountid)
					render += "<option selected>" + accounts[j].account + "</option>";
				else
					render += "<option>" + accounts[j].account + "</option>";
			}
			
			render += "</select></td>";
			render += "<td class='jTableCell'><input style='width:100%' type='text' value='" + journal[i].transdate + "'/></td>";
			render += "<td class='jTableCell'><input style='width:100%' type='text' value='" + journal[i].memo + "'/></td>";
			render += "<td class='jTableCell'><input style='width:100%' type='text' value='" + -journal[i].amount + "'/></td>";
			render += "</tr>";
		}
	}
	
	render += "</table>";

	document.getElementById("content").innerHTML = render;
}
