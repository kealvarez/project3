const url = "http://127.0.0.1:5000/api/v1.0/all"

const data = d3.json(url, function(data) {
    console.log(data);    
});

const log = console.log

const salaryData = Array.from(d3.json(url))
// Groupby function
const groupBy = (key,arr) => arr.reduce((cache, row) => ({ ... cache, [row[key]]: row[key] in cache ? cache[row[key]].concat(row) : [row] }), {})

log(groupBy)

log(groupBy('country_name', salaryData));

// let countries = groupBy('country_name', salaryData);
// let jobs = groupBy('job_title', salaryData);

// var barData = [
//     {
//         x: 
//     }
// ]

log(salaryData.country_name);

// d3.json(url, function (data) {
//     let countries = groupBy('country_name', data);
//     let jobs = groupBy('job_title', data);
//     log(jobs);
//     log(countries);
//     log(countries[0]);
//     log(countries.job_title);

//     var trace1 ={
//         x: jobs[0],
//         y: jobs.salary_in_usd[0],
//         type: 'bar'
//     };

//     var data = [trace1];

//     Plotly.newPlot('MyDiv', data);

    

// })

d3.json(url, function(rows) {
    rows.forEach(row => {
        let { job } = row.job_title;
        let { country } = row.country_name;
        let { salary } = row.salary_in_usd;

        var trace1 = {
            x: job,
            y: salary,
            type: 'bar'
        };

        var data = [trace1];

        Plotly.newPlot('MyDiv', data);


    });
})








// Drop down plots

// d3.json(url, function (err, rows) {
//     function unpack(rows, key) {
//         return rows.map(function (row) {
//             return row[key];
//         });
        
//     }
    
//     var allCountryNames = unpack(rows, 'country_name'),
//     allYears = unpack(rows, 'work_year'),
//     allJobs = unpack(rows, "job_title"),
//     allSalariesUSD = unpack(rows, "salary_in_usd"),
//     listofCountries = [],
//     currentCountry,
//     currentJobs = [],
//     currentSalariesUSD = [],
//     currentAvgSalaries = [],
//     currentYear = [];

//     for (let i = 0; i < allCountryNames.length; i++) {
//         if (listofCountries.indexOf(allCountryNames[i]) === -1) {
//             listofCountries.push(allCountryNames[i]);
//         }
        
//     }

//     function getCountryData(chosenCountry) {
//         currentJobs = [];
//         currentYear = [];

//         for (var i = 0; i < allCountryNames.length; i++) {
//             if ( allCountryNames[i] === chosenCountry) {
//                 currentJobs.push(allJobs[i]);
//                 currentYear.push(allYears[i]);
//                 currentSalariesUSD.push(allSalariesUSD[i]);
//                 // let avgSalary = currentSalariesUSD.reduce((a, b) => a + b, 0) / currentJobs.length
//                 // currentAvgSalaries.push(Math.ceil(avgSalary))
                
//             }

//             let avgSalary = currentSalariesUSD.reduce((a, b) => a + b, 0) / currentJobs.length
//                 currentAvgSalaries.push(Math.ceil(avgSalary));

            
//         }
//     };

    // bar chart





    // default country, set plot
//     setPiePlot('United States')
//     function setPiePlot(chosenCountry) {
//         getCountryData(chosenCountry);

//         var newTrace1 = {
//             y: currentAvgSalaries,
//             x: currentJobs,
//             type: 'bar'
//         };

//         var newData = [newTrace1];

//         var newLayout = {
//             title: "Pie Chart",
//             height: 1000,
//             width: 900
//         };
//         Plotly.newPlot('chartdiv', newData, newLayout);
        
//     };

//     var innerContainer = document.querySelector('[data-num="0"'),
//     plotE1 = innerContainer.querySelector('.chart'),
//     countrySelector = innerContainer.querySelector('.countrydata');

//     function assignOptions(textArray, selector) {
//         for (var i = 0; i < textArray.length; i++) {
//             var currentOption = document.createElement('option');
//             currentOption.text = textArray[i];
//             selector.appendChild(currentOption);
            
//         }
//     }

//     assignOptions(listofCountries, countrySelector);

//     function updateCountry() {
//         setPiePlot(countrySelector.value);
//     }

//     countrySelector.addEventListener('change', updateCountry, false);
// });

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