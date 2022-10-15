var url = "http://127.0.0.1:5000/api/v1.0/all"

var data = d3.json(url, function(data) {
    console.log(data);
    
    
});

// d3.json("/api/v1.0/all").then(data => {
//     for (let index = 0; index < data.length; index++) {
//         const element = data[index];
//         let country = element.country_name;
//         console.log(country);    
//     }
// })

// test function for groupby
// function countryGroup(country) {
//     let countrygroup = GroupBY(country_name, job_tile, 2)
//     let countryJobs = Object.keys(countrygroup)
//     let valuesCountry = []
//     countryJobs.forEach(job => {
//         let allJobs = countryGroup[job].map(req => req.salary_in_usd)
//         let avgSalary = allJobs.reduce((a,b) => a + b, 0) / allJobs.length
//         valuesCountry.push(Math.ceil(avgSalary))
//     })

//     let traceBar1 = {
//         x: countryJobs,
//         y: avgSalary,
//         name: "test",
//         type: "bar"
//     }
//     var data = [traceBar1];
//     var layout = {barmode: 'group'};
//     Plotly.newPlot('chartdiv1', data, layout);
        
// }






// Groupby Function
// function GroupBY(array, key, level) {
//     if (level == 1) {
//         return array.reduce((result, currentValue) => {
//             (result[currentValue.attributes[key]] = result[currentValue.attributes[key]] || []).push(
//                 currentValue.attributes
//             );

//             return result;

//         }, {}); // empty object is the initial value for result objext
//     } else {
//         return array.reduce((result, currentValue) => {
//             (result[currentValue[key]] = result[currentValue[key]] || []).push(
//                 currentValue
//             );
//             return result;
//         }, {});
//     }
// }




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
    currentAvgSalaries = [],
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
                // let avgSalary = currentSalariesUSD.reduce((a, b) => a + b, 0) / currentJobs.length
                // currentAvgSalaries.push(Math.ceil(avgSalary))
                
            }

            let avgSalary = currentSalariesUSD.reduce((a, b) => a + b, 0) / currentJobs.length
                currentAvgSalaries.push(Math.ceil(avgSalary));

            
        }
    };

    // bar chart





    // default country, set plot
    setPiePlot('United States')
    function setPiePlot(chosenCountry) {
        getCountryData(chosenCountry);

        var newTrace1 = {
            y: currentAvgSalaries,
            x: currentJobs,
            type: 'bar'
        };

        var newData = [newTrace1];

        var newLayout = {
            title: "Pie Chart",
            height: 1000,
            width: 900
        };
        Plotly.newPlot('chartdiv', newData, newLayout);
        
    };

    var innerContainer = document.querySelector('[data-num="0"'),
    plotE1 = innerContainer.querySelector('.chart'),
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

// calc average

// d3.json(url, function (err, rows) {
//     function unpack(rows, key) {
//         return rows.map(function (row) {
//             return row[key];
//         });
        
//     }

//     function calcAvgArray(array) {
//         var total = 0;
//         var count = 0;

//         array.array.forEach(function(item, index) {
//             total += item;
//             count++;
//         });

//         return total / count;
//     }

//     console.log(calcAvgArray(rows, 'salary_in_usd'));
    
// })