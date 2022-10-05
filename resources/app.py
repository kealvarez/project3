import psycopg2
from flask import Flask
from flask import jsonify



app = Flask(__name__)

@app.route('/data')
def sendData():
    con = psycopg2.connect(host='localhost', dbname='DataScienceSalaries', user='postgres', password='postG')
    cur = con.cursor()
    cur.execute('select * from salaries')
    data = [col for col in cur]
    cur.close()
    return jsonify(data)

if __name__ == "__main__":
    app.run(debug=True)