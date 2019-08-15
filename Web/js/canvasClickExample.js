
document.write("<script type='text/javascript' src='js/newChart.js'><"+"/script>");

var paper = Raphael("container", 534, 420); 

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
    function drawFloorPlan(){
        // drawTypeLegend();
        var selectedFloor = $('#select2').select2().val().toString();
        $.getJSON("newFormat.json", function (data) {
            $.each(data, function(key, value) {
            
               for(i=0; i<value.length; i++){

                try{
                    if (selectedFloor== value[i].extent.start.floor){
                        
                        var scaleF =5;
                        var scaleC =10;
                        x = value[i].extent.start.x * scaleF + scaleC;
                        x1 = value[i].extent.end.x * scaleF + scaleC;
                        y = value[i].extent.start.y  * scaleF + scaleC *-1;
                        y1 = value[i].extent.end.y * scaleF + scaleC *-1;
                        y = 400-y;
                        y1 = 400-y1;
                        occ=Math.round(Math.random()*30);
                        bckColor=colorPaint(occ);
                        
                        paint_centered_wrap(paper, x, y1, x1-x, y-y1, value[i].name.toString(), bckColor, value[i].type.toString(), occ );
                        

                    }
                }
                finally{
                        continue;
                    } 
               }
                
            });
        });

    }
function drawOccupancyLegend(){
    $.getJSON("color.json", function (data) {
        $.each(data, function(key, value) {
            var scaleF =7;
            x = value.x1 *scaleF;
            x1 = value.x2 *scaleF;
            y = value.y1 *scaleF;
            y1 = value.y2 *scaleF;
            y = 570-y;
            y1 = 570-y1;
            var colorRoom= colorPaint(value.type);

            paint_centered_wrap(paper, x, y1, x1-x, y-y1, value.name.toString(), colorRoom, value.type.toString(), value.type, );
            
            
        });
    });
}

function drawTypeLegend(){
    $.getJSON("legend.json", function (data) {
        $.each(data, function(key, value) {
            var scaleF =5;
            x  = value.x1 *scaleF +100 ;
            x1 = value.x2 *scaleF +100;
            y  = value.y1 *scaleF ;
            y1 = value.y2 *scaleF ;
            y  = 570-y -150;
            y1 = 570-y1-150;
            var colorRoom= findColor(value.type);

            paint_centered_wrap(paper, x, y1, x1-x, y-y1, value.name.toString(), colorRoom, value.type.toString(), value.type, );
            
            
        });
    });
}
paint_centered_wrap = function(paper, x, y, w, h, text, bckColor, type, occ, z) {
        var detail,
            detailText
        var dot = paper.rect(x,y,w,h).attr({ 
            fill: bckColor,
            stroke: "#000", 
            "stroke-width": 1 
            })
            .click(function(){

                layout.title = "Occupancy Graph";
                var checkDouble = 0;
                var example =   {
                    x: X,
                    y: Y,
                    name:text,
                    type: 'scatter',
                    line: {
                      shape: 'spline',
                      simplify: false,
                      smoothing: Math.random(),
                    }
                }
                for(i=0;i<data.length;i++){
                    if(data[i].name == text){
                        
                        data.splice(i,1);
                        checkDouble =1;
                    }
                }
                
                if(checkDouble == 0){
                    dot.attr({fill:"#70706F"});
                    data.push(example);
                    checkDouble= 0;
                }
                else{
                    dot.attr({fill:bckColor});
                }

                Plotly.newPlot('graph3', data, layout, {showSendToCloud: true});
                

            });


            paper.text(x+w/2,y+h/2,text); 

            dot.mouseover(function(){
                // image = paper.image("src/image3.png",x+w/2,y+h/2-150,150,150).attr({
                //     stroke:"#DAD9D8"
                // })
                detail= paper.rect(x+w/2,y+h/2,100,100).attr({
                    fill:"#ffffff",
                    stroke:"#DAD9D8"
                });
                
                detailText = paper.text(x+w/2+50,y+h/2+50, type+ "\n" + occ);
                // detailText = paper.text(x+w/2+75-10,y+h/2-10+75-150, type+ "\n" + occ);
            });
            dot.mouseout(function(){
                detail.remove();
                detailText.remove();
            });
    }    





    function findColor(type){
        if(type!=null)
            type=type.toLowerCase();
        switch(type) {
            case "faculty_office":
                return '#ff8000';
            case "building":
                return '#ffbf00';
            case "conference_room":
                return '#ffff00';
            case "kitchen":
                return '#bfff00';
            case "lab":
                return '#00ff40';
            case "classroom":
                return '#00ffff';
            case "lounge":
                return '#0040ff';
            case "corridor":
                return '#8000ff';
            case "mail_room":
                return '#ff00ff';
            case "seminar_room":
                return '#ff0080';
            case "reception":
                return '#ff0000';
            case "office":
                return '#8e481f';
            case "utility":
                return '#808080';
            default:
                return '#FFFFFF'
        }
    }

function colorPaint(occ){
        
    var colorCode = ['#fff5fd', '#ffe1ea', '#ffccd6', '#ffb7c1', '#ffa1ac', '#ff8997', '#ff6f7f', '#fe5065', '#f62f4d', '#e9002c'];
    // var colorCode = ['#ffffe6', '#c9efe2', '#abdadb', '#92c4d4', '#7daecb', '#6997c2', '#5681b9', '#426cb0', '#2b57a7', '#00429d'];



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
    return colorCode[colorSelected];
}


