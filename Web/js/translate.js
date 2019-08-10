

window.onload = function() {
	var entityArray = new Array();
	var addId = 9;

	$.getJSON("newconvertcsv.json", function (data) {
		$.each(data, function(key, value) {

			try{
			var endInfo = new Object();

			var startInfo = new Object();

			
			var extentInfo = new Object();

			var entityInfo = new Object();

			startInfo.x = value.region.geometry[0].x;
			startInfo.y = value.region.geometry[0].y;
			startInfo.floor = value.region.floor;

			
			
			endInfo.x = value.region.geometry[1].x;
			endInfo.y = value.region.geometry[1].y;
			
			
			extentInfo.type = "rectangle";
			extentInfo.start = startInfo;
			extentInfo.end = endInfo;
			
			entityInfo.id = addId;
			addId+=1;
			entityInfo.name = value.name;
			entityInfo.type = value.type;

			for(var i = 1; i<7; i++){
				if (startInfo.floor== i){
					entityInfo.parent = i+2
				}
			}

			entityInfo.extent = extentInfo;
			entityInfo.CoordinateSystem = {
				"type":"Cartesian2D",
                "range":{
                    "x":100,
					"y":100
				}
			};
			
			
			entityArray.push(entityInfo);
			
			}
			catch (e){

			}


			
			
		});
		

		var finalJsonData = JSON.stringify(entityArray);
		console.log(finalJsonData);
	});	
	
}
