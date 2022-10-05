var url = "https://raw.githubusercontent.com/kealvarez/project3/main/resources/FullTimeEmployeeData.csv"

var dataset = [];

d3.csv("https://raw.githubusercontent.com/kealvarez/project3/main/resources/FullTimeEmployeeData.csv", function(data) {
    dataset=data;
    console.log(dataset);
});