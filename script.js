
var db = null;

function createDatabase()
{
	db = openDatabase("Notes","1.0","HTML5 Ex",200000);
	//alert("Database Created");
	createTable();
}

function createTable()
{
	db.transaction(function (tx) 
	{
   		tx.executeSql('CREATE TABLE IF NOT EXISTS LOGS (id INTEGER, log TEXT)');
		//alert("Table Created");
	});
}

function insertData()
{
	db.transaction(function(tx) 
	{
   		var id = document.getElementById("logid").value;
		var logname = document.getElementById("logname").value;
		tx.executeSql('INSERT INTO LOGS (id,log) VALUES (?, ?)', [id, logname]);
		//alert("Data Inserted");
		clear();
		window.location.href = "index.html";
	});
}

function showData()
{
	db.transaction(function (tx)
	{
   		tx.executeSql('SELECT * FROM LOGS', [], function (tx, results)
		{
		   	var len = results.rows.length, i;
		   	/*msg = "<p>Found rows: " + len + "</p>";
		   	document.querySelector('#status').innerHTML =  msg;*/
			var tbl = '<table><tr><th>ID</th><th>Name</th><th>Edit | Delete</th></tr>';
		   	for (i = 0; i < len; i++)
			{
			   tbl += '<tr><td>'+ results.rows.item(i).id +'</td><td>'+ results.rows.item(i).log +'</td><td><a href="edit.html?id='+ results.rows.item(i).id +'"> Edit</a> | <a href="delete.html?id='+ results.rows.item(i).id +'">Delete</a></td></tr>';
		   	}
			tbl += "</table>";
			document.getElementById("tbldata").innerHTML = tbl;
	 	}, null);
	});
}




function clear()
{
	document.getElementById("logname").value = "";
	document.getElementById("logid").value = "";
}

