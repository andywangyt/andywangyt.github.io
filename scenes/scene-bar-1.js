data = 
  [
      {'GameName':'StarTropics','Games':'SNES','Sales':0.63, 'Images': 'images/logos/default_game.jpg', 'Publisher': 'Nintendo'},
      {'GameName':'Gargoyle’s Quest','Games':'SNES','Sales':0.73, 'Images': 'images/logos/default_game.jpg', 'Publisher': 'Nintendo'},
      {'GameName':'Mega Man 3','Games':'NES','Sales':1.17, 'Images': 'images/logos/default_game.jpg', 'Publisher': 'Capcom'},
      {'GameName':'ActRaiser','Games':'SNES','Sales':1.6, 'Images': 'images/logos/default_game.jpg', 'Publisher': 'Nintendo'},
      {'GameName':'Metal Gear 2: Solid Snake','Games':'SNES','Sales':1.7, 'Images': 'images/logos/default_game.jpg', 'Publisher': 'Nintendo'},
      {'GameName':'The Secret of Monkey Island','Games':'SNES','Sales':2.10, 'Images': 'images/logos/The Secret of Monkey Island.png', 'Publisher': 'Nintendo'},
      {'GameName':'Castle of Illusion Starring Mickey Mouse','Games':'SNES','Sales':2.23, 'Images': 'images/logos/Castle of Illusion Starring Mickey Mouse.png', 'Publisher': 'Nintendo'},
      {'GameName':'F-Zero','Games':'SNES','Sales':2.85, 'Images': 'images/logos/F-Zer.png', 'Publisher': 'Nintendo'},
      {'GameName':'Dragon Warrior IV','Games': 'NES','Sales':3.12, 'Images': 'images/logos/Dragon Warrior IV.png', 'Publisher': 'Role-Playing'},
      {'GameName':'Super Mario World','Games':'GBA','Sales':20.61, 'Images': 'images/logos/super-mario-icons-super-mario.jpg', 'Publisher': 'Nintendo'}
  ];

 var tooltip_bar = d3.select("#scene1_bar_chart")
.append("div")
  .style("opacity", 0)
  .attr("class", "tooltip")
  .style("background-color", "black")
  .style("border-radius", "5px")
  .style("padding", "10px")
  .style("color", "white");

var showTooltip_bar1 = function(d) {
    tooltip_bar
  .transition()
  .duration(200)
tooltip_bar
  .style("opacity", 1)
  .html("<span style='font-size: 17px; font-style: normal;'>Game Name: " + d.GameName 
          + "<br/>Publisher: " + d.Publisher
          + "<br/>Platform: " + d.Games 
          + "<br/>Sales (Millions of Copies): " + d.Sales
          + "</span>"
           + "<br/><img src='"  +  d.Images  + "' width='200' height='200'>"
          + "</img>"
          )
  .style("top", (d3.mouse(this)[1]) + "px")
}

var moveTooltip_bar = function(d) {
    tooltip_bar
  .style("left", (500 + (d3.mouse(this)[0])) + "px")
  .style("top", (d3.mouse(this)[1]) + "px")
}
var hideTooltip_bar = function(d) {
    tooltip_bar
  .transition()
  .duration(200)
  .style("opacity", 0)
}

var margin = {top: 20, right: 30, bottom: 80, left: 300},
 width = 600 - margin.left - margin.right,
 height = 670 - margin.top - margin.bottom;

//set the ranges
var y = d3.scaleBand()
       .range([height, 0])
       .padding(0.1);

var x = d3.scaleLinear()
       .range([0, width]);
       
//append the svg object to the body of the page
//append a 'group' element to 'svg'
//moves the 'group' element to the top left margin
var svg = d3.select("#scene1_bar_chart")
 .append("svg")
 .attr("width", width + margin.left + margin.right)
 .attr("height", height + margin.top + margin.bottom)
 .append("g")
 .attr("class", "annotation-group")
// .call(makeAnnotations)
 .attr("transform", 
       "translate(" + margin.left + "," + margin.top + ")");

// format the data
//data.forEach(function(d) {
// d.Sales = +d.Sales;
//});

// Scale the range of the data in the domains
x.domain([0, d3.max(data, function(d){ return d.Sales; })])
y.domain(data.map(function(d) { return d.GameName; }));
//y.domain([0, d3.max(data, function(d) { return d.sales; })]);

// append the rectangles for the bar chart
svg.selectAll(".bar")
   .data(data)
 .enter().append("rect")
   .attr("class", "bar")
    .on("mouseover", showTooltip_bar1)
    .on("mousemove", moveTooltip_bar)
    .on("mouseleave", hideTooltip_bar)
   //.attr("x", function(d) { return x(d.sales); })
   .attr("width", function(d) {return x(d.Sales); } )
   .attr("y", function(d) { return y(d.GameName); })
   .attr("height", y.bandwidth());

// add the x Axis
svg.append("g")
   .attr("class", "axisWhite")
   .attr("transform", "translate(0," + height + ")")
   .call(d3.axisBottom(x));

// add the y Axis
svg.append("g")
   .attr("class", "axisWhite")
   .call(d3.axisLeft(y));