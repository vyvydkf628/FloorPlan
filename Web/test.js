
      
        $(document).ready(function() {
          //months start at 0, so 11 is Dec, not 12
            var startDate = new Date(2013, 11, 3);
            var endDate = new Date(2016,11,12);
          
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
              //set our starting point to add days to it.
              //max is taken care of above in max: diffdays
              var result = new Date(2013, 11, 3);
              result.setDate(result.getDate() + ui.value);
              //set the amount field
              $( "#amount" ).val(result);
                }
            });  
        });
        
            