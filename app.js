// frequency against median age

var width = 500;
var height = 500;
var padding = 50;
var barPadding =1;
var regionDataFil = regionData.filter(d => {if(d.medianAge !== null) return d });
// var filteredData = regionData.filter(function(d){
//               if(d.medianAge !== null) return d.medianAge});
var allMedianAges = regionDataFil.map(d =>
                         d.medianAge);
var minMedianAge = d3.min(allMedianAges);
var maxMedianAge = d3.max(allMedianAges);

var xScale = d3.scaleLinear()
                  .domain([minMedianAge,maxMedianAge])
                  .rangeRound([padding,width - padding]);


var histogram = d3.histogram()
                    .domain(xScale.domain())
                    .thresholds(xScale.ticks())
                    .value(d => d.medianAge);

var bins = histogram(regionDataFil);

var yScale = d3.scaleLinear()
                  .domain([0, d3.max(bins, d => d.length)])
                  .range([height-padding,padding]);

var svg = d3.select('svg')
              .attr('width',width)
              .attr('height',height)

var rect = svg.selectAll('rect')
              .data(bins)
              .enter()
              .append('rect')
                .attr('x', d => {return xScale(d.x0)}) // d.x stands for lower bound
                .attr('y',d => {return yScale(d.length)})
                .attr('width', d => {return xScale(d.x1)-xScale(d.x0) - barPadding })// d.dx stands for range
                .attr('height', d => {return height - padding - yScale(d.length)})
                .attr('fill', 'steelblue')

svg.append("g")
    .attr("transform", "translate(0," + (height - padding) + ")")
    .classed("x-axis", true)
    .call(d3.axisBottom(xScale));

svg.append("g")
    .attr("transform", "translate(" + padding + ", 0)")
    .classed("y-axis", true)
    .call(d3.axisLeft(yScale));

    svg.append("text")
        .attr("x", width / 2)
        .attr("y", height - 10)
        .style("text-anchor", "middle")
        .text("Median Age");

    svg.append("text")
        .attr("transform", "rotate(-90)")
        .attr("x", - height / 2)
        .attr("y", 15)
        .style("text-anchor", "middle")
        .text("Frequency");
