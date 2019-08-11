
document.write("<script type='text/javascript' src='js/canvasClickExample.js'><"+"/script>");
      
        drawSlider = function() {
          //months start at 0, so 11 is Dec, not 12
            var startDate = $("#datetimepicker1").data("DateTimePicker").date().toDate();
            var endDate = $("#datetimepicker2").data("DateTimePicker").date().toDate();
            
            $( "#amount" ).val(startDate);
            // var value=$("#datetimepicker1").data("DateTimePicker").date().toDate().toString();
            // var value = new Date(value);
            // alert(value)
            var timeDiff = Math.abs(endDate.getTime() - startDate.getTime());
            var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
                
            $("#rangeSlider").slider({
            //set our ranges here, min to max days, calculated above
            //with diffdays
                range: "max",
                min: 0,
                max: diffDays,
                animate: true,
            
                slide: function (event, ui) {
                  
                  paper.clear();
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
                      bckColor=colorPaint(Math.random()*30);
                      
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
                        var colorRoom= colorPaint(value.type);
            
                        paint_centered_wrap(paper, x, y1, x1-x, y-y1, value.name.toString(), colorRoom, );
                        
                        
                    });
                  });
              //set our starting point to add days to it.
              //max is taken care of above in max: diffdays
              var result = $("#datetimepicker1").data("DateTimePicker").date().toDate();
              result.setDate(result.getDate() + ui.value);
              //set the amount field
              $( "#amount" ).val(result);
                }
            });  
        }
        