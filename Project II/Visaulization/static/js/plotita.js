// Submit Button handler
function handleSubmit() {
    // @TODO: YOUR CODE HERE
    // Prevent the page from refreshing
    d3.event.preventDefault();
    d3.event.stopPropagation();

    // Select the input value from the form

    let selectedyear = d3.select("#yearInput").property("value");
    buildPlot(selectedyear);
    // clear the input value
    d3.select("#yearInput").property("value", "");
}
// Build the plot with the new date

function buildPlot(selectedyear) {

    console.log(selectedyear)
    d3.json(`/sales/${selectedyear}`).then(function(data) {
        console.log(data);
        // Grab values from the response json object to build the plots
        var brand = data.map(d => d.Brand);
        var selectedyear = data.map(d => d.Year);
        var salesofyear = data.map(d => d.Sales);



        // select the infomation for the traces 
        var trace1 = {
            type: "scatter",
            mode: "lines",
            name: brand,
            x: brand,
            y: salesofyear,
            line: {
                color: "#17BECF"
            }
        };

        var datos = [trace1];

        var layout = {
            title: `${selectedyear[0]} Sales`,

        };

        Plotly.newPlot("plot", datos, layout);

    });
}

// Add event listener for submit button

d3.select("#yearInput").on("change", handleSubmit);