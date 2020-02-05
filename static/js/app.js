d3.json("./samples.json").then(function(data)
{
    let names = data.names;
    let metadata = data.metadata;
    let samples = data.samples;

    let metatag = d3.select("#sample-metadata");
    let bar = d3.select("#bar");
    let gauge = d3.select("#gauge");
    let bubble = d3.select("#bubble");

    // [9, 8, 7, ... 2, 1, 0]
    let ten = Array.from(Array(10).keys()).reverse();
    let colors = ["red", "orange", "yellow", "#bcbd22", "green", "#2ca02c", "blue", 
        "indigo", "violet", "#e377c2"];

    // populating the dropdown menu
    let dropdown = d3.select("#selDataset");
    dropdown.selectAll("option")
        .data(names)
        .enter()
        .append("option")
        .attr("value", d => d)
        .text(d => d);


    let dropdownChange = function()
    {
        // "this" will be whatever object calls the dropdownChange function
        let newIndividual = d3.select(this).property("value");
        let newSample = samples.filter(s => s.id === newIndividual);
        let newMetadata = metadata.filter(s => s.id == newIndividual); // fuzzy match
        
        let sample_values = newSample[0].sample_values.slice(0,9);
        let otu_id_strings = newSample[0].otu_ids.slice(0,9).map(x => `OTU ${x.toString()}`);


        // demographic info
        // remove existing list elements and append new metadata
        metatag.selectAll("li").remove();
        // the data we want is in an object with key "0"
        Object.entries(newMetadata["0"]).forEach(([k,v]) =>
        {
            metatag.append("li")
                .text(`${k}: ${v}`)
                .attr(k);
        });


        // bar chart
        bar.selectAll("div").remove();
        // instead of using the otu ids directly, use descending 9 through 0 and then add ids as tick labels
        let barTrace = 
        {
            x: sample_values,
            y: ten,
            type: "bar",
            orientation: "h"
        };
        let barLayout = 
        {
            xaxis:
            {
                title: "Number of Samples"
            },
            yaxis: 
            {
                title: "Operational Taxonomic Unit ID",
                tickmode: "array",
                tickvals: ten,
                ticktext: otu_id_strings
            },
        };
        Plotly.newPlot("bar", [barTrace], barLayout);

        // bubble chart
        bubble.selectAll("div").remove();
        bubbleTrace = 
        {
            x: otu_id_strings,
            y: sample_values,
            mode: 'markers',
            marker: 
            {
                size: sample_values,
                color: colors
            }
        };
        bubbleLayout = 
        {

        };
        Plotly.newPlot("bubble", [bubbleTrace], bubbleLayout);


        // gauge.selectAll("div").remove();
    };

    // dropdownChange();
    dropdown.on("change", dropdownChange);

    let update = function(sample)
    {

    };


    // let testSample = samples.filter(s => s.id === "978");

    // console.log(testSample);
        
    
    // var optionChanged = function(value) {return value;}
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
});