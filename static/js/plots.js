var url = "https://raw.githubusercontent.com/kealvarez/project3/main/resources/FullTimeEmployeeData.csv"

var dataset = [];


d3.csv(url, function(data) {
    console.log(data);
})
