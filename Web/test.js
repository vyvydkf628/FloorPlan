
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
            var diffDays = Math.ceil(timeDiff / (1000 * 3600));
            console.log(diffDays);
                
            $("#rangeSlider").slider({
            //set our ranges here, min to max days, calculated above
            //with diffdays
                range: "max",
                min: 0,
                max: diffDays,
                animate: true,
            
                slide: function (event, ui) {
                  
                  data.splice(1,data.length);
                  Plotly.newPlot('graph3', data, layout, {showSendToCloud: true});
                  paper.clear();
                  drawFloorPlan();
                  drawOccupancyLegend();
              //set our starting point to add days to it.
              //max is taken care of above in max: diffdays
              var result = $("#datetimepicker1").data("DateTimePicker").date().toDate();
              console.log(result);
              result.setHours(result.getHours() + ui.value);
              console.log(result.getDate());
              //set the amount field
              $( "#amount" ).val(result);
                }
            });  
        }
        