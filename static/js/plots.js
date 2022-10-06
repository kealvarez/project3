var url = "https://raw.githubusercontent.com/kealvarez/project3/main/resources/CleanFullTimeData.csv"

var data = d3.csv(url, function(data) {
    console.log(data);
});

d3.csv(url, function (err, rows){
    function unpack(rows, key) {
        return rows.map(function(row) { return row[key]; });
    }
    var trace1 = {
        x: unpack(rows, 'id'),
        y: unpack(rows, 'work_year'),
        z: unpack(rows, 'salary_in_usd'),
        marker: {
            size: 2,
            color: unpack(rows, 'salary_in_usd'),
            colorscale: 'Greens',
            line: {color: 'transparent'}
        },
        mode: 'markers',
        type: 'scatter3d',
        text: unpack(rows, 'country_name'),
        hoverinfo: 'x+y+z+text',
        showlegend: false

    };
    var data = [trace1];
    var layout = {margin: {
        l: 0,
        r: 0,
        b: 0,
        t: 0
    }};
    Plotly.newPlot('Mydiv', data, layout, {showLink: false});
});