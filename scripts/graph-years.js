var arrayUnique = function(a) {
    return a.reduce(function(p, c) {
        if (p.indexOf(c) < 0) p.push(c);
        return p;
    }, []);
};

d3.csv('data/bevoelkerung.csv', function(data) {
  var categories = ['Werte', 'Alter'];
  var years = d3.keys(data[0]).filter(function(x) { return categories.indexOf(x)<0; });

  var methods = arrayUnique(data.map(function(x) { return x.Werte; }));

  var data_by_method = methods.map(function(x) {
    var matching_table = data.filter(function(y) { return y.Werte==x; });
    var projections = years.map(function(y) { return matching_table.map(function(z) { return {'einwohner': parseInt(z[y]), 'projektionsjahr': y, 'methode': x, 'alter': z.Alter}; }); } ).reduce(function(x, y) { return x.concat(y); }, []);
    return projections;
  });
  var data2 = data_by_method.reduce(function(x, y) { return x.concat(y); }, []);

  d3.select('#graph-years').attr('style', 'height: 350px');

  var colors = {
    "bis 4 Jahre": "lightgrey",
    "5 bis 9 Jahre": "lightgrey",
    "10 bis 14 Jahre": "lightgrey",
    "15 bis 19 Jahre": "lightgrey",
    "20 bis 24 Jahre": "lightgrey",
    "25 bis 29 Jahre": "lightgrey",
    "30 bis 34 Jahre": "lightgrey",
    "35 bis 39 Jahre": "lightgrey",
    "40 bis 44 Jahre": "lightgrey",
    "45 bis 49 Jahre": "lightgrey",
    "50 bis 54 Jahre": "lightgrey",
    "55 bis 59 Jahre": "lightgrey",
    "60 bis 64 Jahre": "lightgrey",
    "65 bis 69 Jahre": "blue",
    "70 bis 74 Jahre": "blue",
    "75 bis 79 Jahre": "blue",
    "80 bis 84 Jahre": "blue",
    "85 bis 89 Jahre": "blue",
    "90 bis 94 Jahre": "blue",
    "95 Jahre und älter": "blue"};


  var viz = d3plus.viz()
    .container('#graph-years')
    .color(function(d) {
      console.log(d);
      return colors[d.alter];
    })
    .legend(false)
    .data(data2.filter(function(x) { return x.projektionsjahr==2050; }))
    .type('bar')
    .id('alter')
    .x('methode')
    .y('einwohner')
    .title('Bevölkerungsprojektionen 2050')
    .draw();
});
