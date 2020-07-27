dataset = {
    'children': [
{'Publisher':'Capcom','Games':3,'Sales':3.92, 'SalesUS': 1.03, 'SalesEurope': 1.20, 'SalesJapan': 0.61, 'SalesOthers': 1.08},
{'Publisher':'Enix Corporation','Games':1,'Sales':3.12, 'SalesUS': 1.20,  'SalesEurope': 1.10, 'SalesJapan': 0.42, 'SalesOthers': 0.40},
{'Publisher':'Konami Digital Entertainment','Games':1,'Sales':2.23, 'SalesUS': 0.8,  'SalesEurope': 0.2, 'SalesJapan': 0.31, 'SalesOthers': 0.92},
{'Publisher':'Namco Bandai Games','Games':2,'Sales':0.63, 'SalesUS': 0.20,  'SalesEurope': 0.11, 'SalesJapan': 0.21, 'SalesOthers': 0.11},
{'Publisher':'Nintendo','Games':7,'Sales':35.49, 'SalesUS': 10.51,  'SalesEurope': 10.72, 'SalesJapan': 10.99, 'SalesOthers': 3.27},
{'Publisher':'Sega','Games':1,'Sales':2.6, 'SalesUS': 0.90,  'SalesEurope': 1.31, 'SalesJapan': 0.11, 'SalesOthers': 0.28},
{'Publisher':'SquareSoft','Games':1,'Sales':1.4, 'SalesUS': 0.40, 'SalesEurope': 0.50, 'SalesJapan': 0.30, 'SalesOthers': 0.20}
    ]};

var tooltip = d3.select("#scene1_bubble_chart")
.append("div")
  .style("opacity", 0)
  .attr("class", "tooltip")
  .style("background-color", "black")
  .style("border-radius", "5px")
  .style("padding", "10px")
  .style("color", "white")

var showTooltip = function(d) {
tooltip
  .transition()
  .duration(200)
tooltip
  .style("opacity", 1)
  .html("<span style='font-size: 17px; font-style: normal;'>Publisher: " 
          + d.data.Publisher + "<br/>Games: " + d.data.Games 
          + "<br/>Sales (Millions of Copies): " + d.data.Sales 
          + "</span><br/><span style='font-size: 12px; font-style: italic;'>Sales in the US: " + d.data.SalesUS 
          + "</span><br/><span style='font-size: 12px; font-style: italic;'>Sales in Europe: " + d.data.SalesEurope 
          + "</span><br/><span style='font-size: 12px; font-style: italic;'>Sales in Japan: " + d.data.SalesJapan 
          + "</span><br/><span style='font-size: 12px; font-style: italic;'>Sales in Other Countries: " + d.data.SalesOthers 
          + "</span>"
          // + "<img src='images/abstract-background-old.jpg' alt='Girl in a jacket' width='100' height='100'>"
          //+ "</img>"
          )
  .style("left", (d3.mouse(this)[0]) + "px")
  .style("top", (d3.mouse(this)[1]) + "px")
}


var moveTooltip = function(d) {
tooltip
  .style("left", (d3.mouse(this)[0]) + "px")
  .style("top", (d3.mouse(this)[1]) + "px")
}
var hideTooltip = function(d) {
tooltip
  .transition()
  .duration(200)
  .style("opacity", 0)
}

const type = d3.annotationLabel

var diameter = 500;
var color = d3.scaleOrdinal(d3.schemeCategory20);

var bubble = d3.pack(dataset)
    .size([diameter, diameter])
    .padding(1.5);

var svg = d3.select("#scene1_bubble_chart")
    .append("svg")
    .attr("width", diameter)
    .attr("height", diameter)
    .attr("class", "bubble")

var nodes = d3.hierarchy(dataset)
    .sum(function(d) { return d.Sales; });

var node = svg.selectAll(".node")
    .data(bubble(nodes).descendants())
    .enter()
    .filter(function(d){
        return  !d.children
    })
    .append("g")
    .attr("class", "node")
    .on("mouseover", showTooltip)
    .on("mousemove", moveTooltip)
    .on("mouseleave", hideTooltip)
    .attr("transform", function(d) {
        return "translate(" + d.x + "," + d.y + ")";
    });

node.append("title")
    .text(function(d) {
        return d.data.Publisher + ": " + d.data.Sales;
    });

node.append("circle")
    .attr("r", function(d) {
        return d.r;
    })
    .style("fill", function(d,i) {
        return color(i);
    });

node.append("text")
    .attr("dy", ".2em")
    .style("text-anchor", "middle")
    .text(function(d) {
        return d.data.Publisher.substring(0, d.r / 3);
    })
    .attr("font-family", "sans-serif")
    .attr("font-size", function(d){
        return d.r/5;
    })
    .attr("fill", "white");

node.append("text")
    .attr("dy", "1.3em")
    .style("text-anchor", "middle")
    .text(function(d) {
        return d.data.Sales;
    })
    .attr("font-family",  "Gill Sans", "Gill Sans MT")
    .attr("font-size", function(d){
        return d.r/5;
    })
    .attr("fill", "white");

d3.select(self.frameElement)
    .style("height", diameter + "px");