const url = "http://127.0.0.1:5000/api/v1.0/all"

const data = d3.json(url, function(data) {
    console.log(data);    
});

const log = console.log

// WE WANTED TO KEEP THIS GROUP BY Function - it took us forever to figure out. 

//const salaryData = Array.from(d3.json(url))
// Groupby function
// const groupBy = (key,arr) => arr.reduce((cache, row) => ({ ... cache, [row[key]]: row[key] in cache ? cache[row[key]].concat(row) : [row] }), {})

// const unpack = (rows, key) => {
//     return rows.map(function (row) {
//         return row[key];

// log(groupBy)

// log(groupBy('country_name', salaryData));

// let countries = groupBy('country_name', salaryData);
// let jobs = groupBy('job_title', salaryData);

// var barData = [
//     {
//         x: 
//     }
// ]

// log(salaryData.country_name);

// d3.json(url, function (data) {
    // let countryGroups = groupBy('country_name', data);
    // let countryKeys = Object.keys(countryGroups)
    // barTraces = []
    // let jobGroups = groupBy('job_title', data);
    // let jobKeys = Object.keys(jobGroups);
    // let salaries = []

    // countryKeys.forEach(country => salaries.push(countryGroups[country].length))

    // log(countryGroups);
    // log(countryKeys);
    // log(jobGroups);
    // log(jobKeys);
    // log(salaries);

    // salaries.push(countryGroups.map(row=>row.salary_in_usd))

// })




d3.json(url, function(err, rows){

    function unpack(rows, key) {
        return rows.map(function(row) { return row[key]; });
    }    
var allCountryNames = unpack(rows, 'country_name'),
    allYear = unpack(rows, 'work_year'),
    allSalaries = unpack(rows, 'salary_in_usd'),
    allJobs = unpack(rows, 'job_title'),
    allIDs = unpack(rows, 'id'),
    allRemote = unpack(rows, 'remote_ratio')
    listofCountries = [],
    listofJobtitles = [],
    // currentJobtitle,
    // currentCountry,
    currentSalaries = [],
    currentID = [],
    currentRemote = [],
    currentYear = [];




  for (var i = 0; i < allCountryNames.length; i++ ){
    if (listofCountries.indexOf(allCountryNames[i]) === -1 ){
      listofCountries.push(allCountryNames[i]);
    }
  }

  for (var i = 0; i < allJobs.length; i++ ){
    if (listofJobtitles.indexOf(allJobs[i]) === -1){
        listofJobtitles.push(allJobs[i]);
    }
  }
  
  function getCountryData(chosenCountry) {
    currentSalaries = [];
    currentYear = [];
    currentID = [];
    for (var i = 0 ; i < allCountryNames.length ; i++){
      if ( allCountryNames[i] === chosenCountry ) {
        currentSalaries.push(allSalaries[i]);
        currentYear.push(allYear[i]);
        currentID.push(allIDs[i]);
      } 
    }
  };

  function getJobData(chosenJob) {
    currentSalaries = [];
    currentYear = [];
    currentID = [];
    currentRemote = [];
    for (var i = 0 ; i < allJobs.length ; i++){
        if ( allJobs[i] === chosenJob ) {
            currentSalaries.push(allSalaries[i]);
            currentYear.push(allYear[i]);
            currentID.push(allIDs[i]);
            currentRemote.push(allRemote[i]);
        }
    }
  };

function setScatterPlot(chosenJob) {
    getJobData(chosenJob);  

    var trace1 = {
      x: currentID,
      y: currentSalaries,
      type: 'scatter',
      mode: "markers"
      
    };

    var data = [trace1];

    var layout = {
      title: 'Salaries by JobTite<br>'+ chosenJob + ' Salary'
    };

    Plotly.newPlot('plotdiv', data, layout, {showSendToCloud: true});
};
  
var innerContainer = document.querySelector('[data-num="0"'),
    plotEl = innerContainer.querySelector('.plot'),
    jobSelector = innerContainer.querySelector('.jobdata');

function assignOptions(textArray, selector) {
  for (var i = 0; i < textArray.length;  i++) {
      var currentOption = document.createElement('option');
      currentOption.text = textArray[i];
      selector.appendChild(currentOption);
  }
}

assignOptions(listofJobtitles, jobSelector);

function updateJobTitle(){
    setScatterPlot(jobSelector.value);
    setBarChart(jobSelector.value);
}
  
jobSelector.addEventListener('change', updateJobTitle, false);

function setBarChart(chosenJob) {
    getJobData(chosenJob);

    var trace3 = {
        x: currentID,
        y: currentRemote,
        type: 'bar'
    };
    
    var data3 = [trace3];

    var layout = {
      title: 'Remote Ratio by Job Title<br>'+ chosenJob + ' Remote Ratio'
    };
    
    Plotly.newPlot('myDiv', data3, layout);
    
}
});

let pivot = new Flexmonster({
  container: "pivot-container",
  componentFolder: "https://cdn.flexmonster.com/",
  width: "100%",
  height: 500,
  toolbar: true,
  report: {
    dataSource: {
      filename: "https://raw.githubusercontent.com/kealvarez/project3/main/resources/DataScience_DataAnalysist.csv"
    },
    slice: {
      rows: [{
        uniqueName: "job_title"
      },
      {
        uniqueName: "[Measures]"
      }
    ],
    columns: [{
      uniqueName: "country_name"
    }],
    measures: [{
      uniqueName: "salary_in_usd", aggregation: "average", format: "currency"
    }
  ]
    }
  }
});
