import psycopg2
from flask import Flask
from flask import request
from flask import jsonify

app = Flask(__name__)
app.config["DEBUG"] = True
@app.route('/api/v1/salaries/all', methods=['GET'])
def apiViewAll():
    con = psycopg2.connect(host='localhost', dbname='DataScienceSalaries', user='postgres', password='postG')
    cur = con.cursor()
    all_salaries = cur.execute('SELECT * FROM salaries').fetchall()
    cur.close()
    return jsonify(all_salaries)



if __name__ == "__main__":
    app.run(debug=True)
