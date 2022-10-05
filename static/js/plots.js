var url = "https://raw.githubusercontent.com/kealvarez/project3/main/resources/FullTimeEmployeeData.csv"

var dataset = [];


d3.csv(url, function(data) {
    console.log(data);
})


d3.csv(url, function (err, rows) {
    function unpack(rows, key) {
        return rows.map(function(row) { return row[key]; });
    }

    // we need to do data['company_location'].unique() in the ipynb and then loook up up the lat and long for each unique value and add coloums to the csv
    var country = unpack(rows, 'company_location'),
        remoteRatio = unpack(rows, 'remote_ratio')
})