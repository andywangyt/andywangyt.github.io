dataset = {
    'children': [
{'Publisher':'505 Games','Games':22,'Sales':14.26, 'SalesUS': 5.03, 'SalesEurope': 3.20, 'SalesJapan': 2.61, 'SalesOthers': 3.42},
{'Publisher':'Activision','Games':89,'Sales':63.39,  'SalesUS': 22.28, 'SalesEurope': 19.20, 'SalesJapan': 13.27, 'SalesOthers': 8.64},
{'Publisher':'Disney Interactive Studios','Games':35,'Sales':20.5, 'SalesUS': 7.26, 'SalesEurope': 5.20, 'SalesJapan': 4.21, 'SalesOthers': 3.49},
{'Publisher':'Electronic Arts','Games':88,'Sales':81.38,  'SalesUS': 30.70, 'SalesEurope': 22.40, 'SalesJapan': 17.27, 'SalesOthers': 11.01},
{'Publisher':'Microsoft Game Studios','Games':12,'Sales':49.16, 'SalesUS': 16.01, 'SalesEurope': 13.40, 'SalesJapan': 9.71, 'SalesOthers': 10.04 }, 
{'Publisher':'Nintendo','Games':28,'Sales':61.07, 'SalesUS': 20.28, 'SalesEurope': 19.20, 'SalesJapan': 13.07, 'SalesOthers': 8.64},
{'Publisher':'Sega','Games':39,'Sales':22.89, 'SalesUS': 9.26, 'SalesEurope': 5.59, 'SalesJapan': 4.21, 'SalesOthers': 3.49},
{'Publisher':'Sony Computer Entertainment','Games':43,'Sales':34.89, 'SalesUS': 13.26, 'SalesEurope': 7.20, 'SalesJapan': 7.21, 'SalesOthers': 7.22},
{'Publisher':'Take-Two Interactive','Games':35,'Sales':35.84,  'SalesUS': 14.26, 'SalesEurope': 7.10, 'SalesJapan': 7.11, 'SalesOthers': 7.25},
{'Publisher':'Ubisoft','Games':72,'Sales':42.62, 'SalesUS': 13.28, 'SalesEurope': 14.20, 'SalesJapan': 7.09, 'SalesOthers': 8.05},
    ]};

var tooltip3 = d3.select("#scene3_bubble_chart")
.append("div")
  .style("opacity", 0)
  .attr("class", "tooltip")
  .style("background-color", "black")
  .style("border-radius", "5px")
  .style("padding", "10px")
  .style("color", "white")

var showTooltip3 = function(d) {
    tooltip3
    .transition()
    .duration(200)
  tooltip3
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
var moveTooltip3 = function(d) {
tooltip3
  .style("left", (d3.mouse(this)[0]) + "px")
  .style("top", (d3.mouse(this)[1]) + "px")
}
var hideTooltip3 = function(d) {
tooltip3
  .transition()
  .duration(200)
  .style("opacity", 0)
}

var diameter = 500;
var color = d3.scaleOrdinal(d3.schemeCategory20);

var bubble = d3.pack(dataset)
    .size([diameter, diameter])
    .padding(1.5);

var svg = d3.select("#scene3_bubble_chart")
    .append("svg")
    .attr("width", diameter)
    .attr("height", diameter)
    .attr("class", "bubble");

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
        .on("mouseover", showTooltip3)
    .on("mousemove", moveTooltip3)
    .on("mouseleave", hideTooltip3)
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


svg.append("line")          // attach a line
.style("stroke", "lightgreen")  // colour the line
.style("stroke-width", 2)
.attr("x1", 160)     // x position of the first end of the line
.attr("y1", 230)      // y position of the first end of the line
.attr("x2", 40)     // x position of the second end of the line
.attr("y2", 420);

var text = svg.append("text");

text.attr("x", 0)
.attr("y", 430)
.attr("font-family", "sans-serif")
.attr("font-size", "15px")
.attr("fill", "lightgreen");

text.append('tspan')
.text('Electronic Arts is an American ')
.attr("x", 0)
.attr("y", 430);

text.append('tspan')
.text('video game company ')
.attr("x", 0)
.attr("y", 450);

text.append('tspan')
.text('headquartered in California.')
.attr("x", 0)
.attr("y", 470);