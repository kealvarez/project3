var url = "http://127.0.0.1:5000/api/v1.0/all"

var data = d3.json(url, function(data) {
    console.log(data);
});

d3.json(url, function (err, rows){
    function unpack(rows, key) {
        return rows.map(function(row) { return row[key]; });
    }
    var trace1 = {
        x: unpack(rows, 'id'),
        y: unpack(rows, 'salary_in_usd'),
        z: unpack(rows, 'job_title'),
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