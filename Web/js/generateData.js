function randomRange(n1, n2) {
  return Math.floor( (Math.random() * (n2 - n1 + 1)) + n1 );
}



    var tDate = new Date('2018-07-10 12:30');
    var occupancyArray = new Array(); 

    for (var i = 1; i <= 1000; i++){
        var timeInfo = new Object();
        var occupancyInfo = new Object();
        var roomInfo = new Object();
    
        
        occupancyInfo = randomRange(0, 30);
        // tDate.setMinutes(tDate.getMinutes()+5);
        tDate.setHours(tDate.getHours()+50);
        roomInfo.occupancy = occupancyInfo;

        timeInfo = JSON.stringify(tDate);
        // timeInfo = timeInfo.substring(1,8); 
        roomInfo.time = timeInfo;
        occupancyArray.push(roomInfo);

        
    }
    var X = new Array();
    var Y = new Array();
    for (var i = 0; i < occupancyArray.length; i++){
        X.push(occupancyArray[i].time)
        Y.push(occupancyArray[i].occupancy)
        
    }
    localStorage["X"] = JSON.stringify(X); 
    localStorage["Y"] = JSON.stringify(Y); 
