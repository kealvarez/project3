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
        z: unpack(rows, 'remote_ratio'),
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

// // group by
// const groupBy = (arr, key) => {
//     const initialValue = {};
//     return arr.reduce((acc, cval) => {
//         const myAttribute = cval[key];
//         acc[myAttribute] = [...(acc[myAttribute] || []), cval]
//         return acc;
//     }, initialValue);
// };

// const gj = groupBy(data[0], "job_title");
// console.log("group by:", gj);

// d3.json(url).then(({features}) => {
//     features.forEach(feature => {
//         let { jobtitle } = feature.job_title;
//         console.log(jobtitle);
//     })
// });

d3.json(url, function(err, rows) {
    function unpack(rows, key) {
        return rows.map(function(row) {return row[key]; });
    }

    var pieTrace1 = {
        vals: unpack(rows, "salary_in_usd"),
        labels: unpack(rows, "job_title"),
        type: 'pie'
    };
    var pieData = [pieTrace1];
    var pielayout = {
        height: 1000,
        width: 2000
    };

    Plotly.newPlot('Piediv', pieData, pielayout);
    
})

// Drop down plots

d3.json(url, function (err, rows) {
    function unpack(rows, key) {
        return rows.map(function (row) {
            return row[key];
        });
        
    }
    
    var allCountryNames = unpack(rows, 'country_name'),
    allYears = unpack(rows, 'work_year'),
    allJobs = unpack(rows, "job_title"),
    allSalariesUSD = unpack(rows, "salary_in_usd"),
    listofCountries = [],
    currentCountry,
    currentJobs = [],
    currentSalariesUSD = [],
    currentYear = [];

    for (let i = 0; i < allCountryNames.length; i++) {
        if (listofCountries.indexOf(allCountryNames[i]) === -1) {
            listofCountries.push(allCountryNames[i]);
        }
        
    }
    function getCountryData(chosenCountry) {
        currentJobs = [];
        currentYear = [];
        for (var i = 0; i < allCountryNames.length; i++) {
            if ( allCountryNames[i] === chosenCountry) {
                currentJobs.push(allJobs[i]);
                currentYear.push(allYears[i]);
                currentSalariesUSD.push(allSalariesUSD[i]);
                
            }
            
        }
    };
    // default country, set plot
    // setplot
    function setPiePlot(chosenCountry) {
        getCountryData(chosenCountry);

        var newTrace1 = {
            values: currentSalariesUSD,
            labels: currentJobs,
            type: 'pie'
        };

        var newData = [newTrace1];

        var newLayout = {
            title: "Pie Chart",
            height: 1000,
            width: 900
        };
        Plotly.newPlot('Dropdiv', newData, newLayout);
        
    };

    var innerContainer = document.querySelector('[data-num="0"'),
    plotE1 = innerContainer.querySelector('.plot'),
    countrySelector = innerContainer.querySelector('.countrydata');

    function assignOptions(textArray, selector) {
        for (var i = 0; i < textArray.length; i++) {
            var currentOption = document.createElement('option');
            currentOption.text = textArray[i];
            selector.appendChild(currentOption);
            
        }
    }

    assignOptions(listofCountries, countrySelector);

    function updateCountry() {
        setPiePlot(countrySelector.value);
    }

    countrySelector.addEventListener('change', updateCountry, false);
});