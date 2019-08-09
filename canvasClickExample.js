
document.write("<script type='text/javascript' src='newChart.js'><"+"/script>");

window.onload = function (){
    var paper = Raphael("container", 534, 455); 
    // $.getJSON("newconvertcsv.json", function (data) {
    //     $.each(data, function(key, value) {
    //         var scaleF =7;
    //         x = value.region.geometry[0].x*scaleF;
    //         x1 = value.region.geometry[1].x*scaleF;
    //         y = value.region.geometry[0].y*scaleF;
    //         y1 = value.region.geometry[1].y*scaleF;
    //         y = 500-y;
    //         y1 = 500-y1;
    //         bckColor=heatMapColorforValue(Math.random());
    
           
    //         paint_centered_wrap(paper, x, y1, x1-x, y-y1, value.name.toString(), bckColor, );
            
            
    //     });
    // });
    $.getJSON("convertcsv_2nd.json", function (data) {
        $.each(data, function(key, value) {
            try{
            var scaleF =5;
            var scaleC =10;
            x = value.x1  * scaleF + scaleC;
            x1 = value.x2 * scaleF + scaleC;
            y = value.y1  * scaleF + scaleC *-1;
            y1 = value.y2 * scaleF + scaleC *-1;
            y = 400-y;
            y1 = 400-y1;
            console.log(y);
            bckColor=colorPaint(Math.random()*30);
            
            console.log(bckColor);
            
            paint_centered_wrap(paper, x, y1, x1-x, y-y1, value.name.toString(), bckColor, );
            }
            catch(e){

            }
            
        });
    });
    $.getJSON("color.json", function (data) {
        $.each(data, function(key, value) {
            var scaleF =7;
            x = value.x1 *scaleF;
            x1 = value.x2 *scaleF;
            y = value.y1 *scaleF;
            y1 = value.y2 *scaleF;
            y = 570-y;
            y1 = 570-y1;
            console.log(bckColor);
            var colorRoom= colorPaint(value.type);

            paint_centered_wrap(paper, x, y1, x1-x, y-y1, value.name.toString(), colorRoom, );
            
            
        });
    });
    
    paint_centered_wrap = function(paper, x, y, w, h, text, bckColor, z) {
    
        var dot = paper.rect(x,y,w,h).attr({ 
            fill: bckColor, 
            stroke: "#000", 
            "stroke-width": 1 
            })
            .click(function(){
                layout.title = text;
                Plotly.newPlot('graph3', data, layout, {showSendToCloud: true});
            });
            paper.text(x+w/2,y+h/2,text); 
    }    
}

function colorPaint(occ){
        
    var colorCode =['#00429d', '#3e67ae', '#618fbf', '#85b7ce', '#b1dfdb', '#ffcab9', '#fd9291', '#e75d6f', '#c52a52', '#93003a'];

    var colorSelected=0;
    if(occ<=3){
        colorSelected = 0;
    }
    else if(occ<=6){
        colorSelected = 1;
    }
    
    else if(occ<=9){
        colorSelected = 2;
    }
    else if(occ<=12){
        colorSelected = 3;
    }
    
    else if(occ<=15){
        colorSelected = 4;
    }
    
    else if(occ<=18){
        colorSelected = 5;
    }
    
    else if(occ<=21){
        colorSelected = 6;
    }
    
    else if(occ<=24){
        colorSelected = 7;
    }
    
    else if(occ<=27){
        colorSelected = 8;
    }
    
    else    {
        colorSelected = 9;
    }
    console.log(colorCode[colorSelected]);
    return colorCode[colorSelected];
}


