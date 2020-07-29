data3 = 
  [
     
      {'GameName':'WarioWare: D.I.Y.','Games':'GBA','Sales':0.73, 'Images': 'images/logos/default_game.jpg', 'Publisher': 'Nintendo'},
      {'GameName':'Limbo ','Games':'GBA','Sales':1.17, 'Images': 'images/logos/default_game.jpg', 'Publisher': 'Nintendo'},
      {'GameName':'Bayonetta','Games': 'PS3','Sales':1.23, 'Images': 'images/logos/default_game.jpg', 'Publisher': 'Sega'},
      {'GameName':'Minecraft Alpha','Games':'Platform','Sales':2.10, 'Images': 'images/logos/Minecraft Alpha.png', 'Publisher': 'Nintendo'},
      {'GameName':'Red Dead Redemption','Games':'PS3','Sales':2.85, 'Images': 'images/logos/Red Dead Redemption.png', 'Publisher': 'Take-Two Interactive'},
      {'GameName':'Dragon Quest IX','Games':'DS','Sales':5.84, 'Images': 'images/logos/Dragon Quest IX.jpg', 'Publisher': 'Nintendo'},
      {'GameName':'Donkey Kong Country Returns: Solid Snake','Games':'Platform','Sales':6.59, 'Images': 'images/logos/Donkey Kong Country Returns.png', 'Publisher': 'Nintendo'},
      {'GameName':'Super Mario Galaxy 2','Games':'Platform','Sales':7.69, 'Images': 'images/logos/TM_Wii_SuperMarioGalaxy2.png', 'Publisher': 'Nintendo'},
      {'GameName':'StarCraft II: Wings of Liberty','Games':'PC','Sales':14.83, 'Images': 'images/logos/StarCraft II Wings of Liberty.png', 'Publisher': 'Activision'}
  ];

var tooltip_bar3 = d3.select("#scene3_bar_chart")
.append("div")
  .style("opacity", 0)
  .attr("class", "tooltip")
  .style("background-color", "black")
  .style("border-radius", "5px")
  .style("padding", "10px")
  .style("color", "white");

var showTooltip_bar3 = function(d) {
    tooltip_bar3
  .transition()
  .duration(200)
tooltip_bar3
  .style("opacity", 1)
  .html("<span style='font-size: 17px; font-style: normal;'>Game Name: " + d.GameName 
          + "<br/>Publisher : " + d.Publisher
          + "<br/>Platform: " + d.Games 
          + "<br/>Sales (Millions of Copies): " + d.Sales
          + "</span>"
           + "<br/><img src='"  +  d.Images  + "' width='200' height='200'>"
          + "</img>"
          )
  .style("top", (d3.mouse(this)[1]) + "px")
}

var moveTooltip_bar3= function(d) {
    tooltip_bar3
  .style("left", (500 + (d3.mouse(this)[0])) + "px")
  .style("top", (d3.mouse(this)[1]) + "px")
}
var hideTooltip_bar3 = function(d) {
    tooltip_bar3
  .transition()
  .duration(200)
  .style("opacity", 0)
}

//set the dimensions and margin3s of the graph
var margin3 = {top: 20, right: 0, bottom: 80, left: 350};
var width3 = 600 - margin3.left - margin3.right;
var height3 = 650 - margin3.top - margin3.bottom;

//set the ranges
var y3 = d3.scaleBand()
       .range([height3, 0])
       .padding(0.1);

var x3 = d3.scaleLinear()
       .range([0, width3]);
       
//append the svg object to the body of the page
//append a 'group' element to 'svg'
//moves the 'group' element to the top left margin3
var svg3 = d3.select("#scene3_bar_chart")
 .append("svg")
 .attr("width", width3 + margin3.left + margin3.right)
 .attr("height", height3 + margin3.top + margin3.bottom)
 .append("g")
 .attr("class", "annotation-group")
// .call(makeannotations3)
 .attr("transform", 
       "translate(" + margin3.left + "," + margin3.top + ")");

// format the data
//data.forEach(function(d) {
// d.Sales = +d.Sales;
//});

// Scale the range of the data in the domains
x3.domain([0, d3.max(data3, function(d){ return d.Sales; })])
y3.domain(data3.map(function(d) { return d.GameName; }));
//y.domain([0, d3.max(data, function(d) { return d.sales; })]);

// append the rectangles for the bar chart
svg3.selectAll(".bar")
   .data(data3)
 .enter().append("rect")
   .attr("class", "bar")
       .on("mouseover", showTooltip_bar3)
    .on("mousemove", moveTooltip_bar3)
    .on("mouseleave", hideTooltip_bar3)
   //.attr("x", function(d) { return x(d.sales); })
   .attr("width", function(d) {return x3(d.Sales); } )
   .attr("y", function(d) { return y3(d.GameName); })
   .attr("height", y.bandwidth());

// add the x Axis
svg3.append("g")
   .attr("class", "axisWhite")
   .attr("transform", "translate(0," + height + ")")
   .call(d3.axisBottom(x));

// add the y Axis
svg3.append("g")
   .attr("class", "axisWhite")
   .call(d3.axisLeft(y3));