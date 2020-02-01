d3.json("./samples.json").then(function(data)
{
    let names = data.names;
    let metadata = data.metadata;
    let samples = data.samples;

    // let dropdown = d3.select("#selDataset")
    //     .selectAll("option")
    //     .data(names)
    //     .enter()
    //     .append("option")
    //     .attr("value", d => d.name)
    //     .text(d => d.name);

    // console.log(dropdown);
    // create the drop down menu of cities
	// var selector = d3.select("body")
    // .append("select")
    // .attr("id", "cityselector")
    // .selectAll("option")
    // .data(data)
    // .enter().append("option")
    // .text(function(d) { return d.city; })
    // .attr("value", function (d, i) {
    //     return i;
    // });

    // dropdown.append()

    let trace1 = 
    {

    };

    let layout = 
    {

    };

    // Plotly.newPlot("bar", [trace1], layout);
});