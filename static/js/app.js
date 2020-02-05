d3.json("./samples.json").then(function(data)
{
    let names = data.names;
    let metadata = data.metadata;
    let samples = data.samples;

    let metatag = d3.select("#sample-metadata");
    let bar = d3.select("#bar");
    // let gauge = d3.select("#gauge");
    let bubble = d3.select("#bubble");

    // [9, 8, 7, ... 2, 1, 0]
    let ten = Array.from(Array(10).keys()).reverse();

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
        let newIndividual = d3.select(this).property("value");
        let newSample = samples.filter(s => s.id === newIndividual);
        let newMetadata = metadata.filter(s => s.id == newIndividual); // fuzzy match

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
            x: newSample[0].sample_values.slice(0,9),
            y: ten,
            text: newSample[0].otu_labels.slice(0,9),
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
                ticktext: newSample[0].otu_ids.slice(0,9).map(x => `OTU ${x.toString()}`)
            },
        };
        Plotly.newPlot("bar", [barTrace], barLayout);

        
        // bubble chart
        bubble.selectAll("div").remove();

        // The hue value of a marker is proportational to the value of otu_id, normalized from 0 to 360
        colors = [];
        let extent = d3.max(newSample[0].otu_ids) - d3.min(newSample[0].otu_ids);
        newSample[0].otu_ids.forEach(d =>
        {
            let rgba = d3.hsl(Math.floor((d * 360/extent)) % 360, 1, .5).rgb();
            colors.push(`rgb(${rgba["r"]}, ${rgba["g"]}, ${rgba["b"]}, 0.5)`);
        });
        
        bubbleTrace = 
        {
            x: newSample[0].otu_ids,
            y: newSample[0].sample_values,
            mode: 'markers',
            text: newSample[0].otu_labels,
            marker: 
            {
                size: newSample[0].sample_values,
                color: colors
            }
        };
        bubbleLayout = 
        {
            xaxis:
            {
                title: "OTU ID"
            }
        };
        Plotly.newPlot("bubble", [bubbleTrace], bubbleLayout);


        // gauge.selectAll("div").remove();
    };

    dropdown.on("change", dropdownChange);
});
