
var X = JSON.parse(localStorage["X"]); 
var Y = JSON.parse(localStorage["Y"]); 
for(i=1; i<X.length; i++){
  X[i]=X[i].substring(1,20);
  X[i] = new Date(X[i]);
}



var selectorOptions = {
    buttons: [{
        step: 'month',
        stepmode: 'backward',
        count: 1,
        label: '1m'
    }, {
        step: 'month',
        stepmode: 'backward',
        count: 6,
        label: '6m'
    }, {
        step: 'year',
        stepmode: 'todate',
        count: 1,
        label: 'YTD'
    }, {
        step: 'year',
        stepmode: 'backward',
        count: 1,
        label: '1y'
    }, {
        step: 'all',
    }],
};


var layout = {
    title: 'Occupancy',
    xaxis: {
        rangeselector: selectorOptions,
        rangeslider: {}
    },
    yaxis: {
        fixedrange: true
    }
    
};
var data = [
    {
      x: X,
      y: Y,
      type: 'scatter',
      line: {
        shape: 'spline',
        simplify: false,
        smoothing: 1.3,
      }
    },
    
  ];
  