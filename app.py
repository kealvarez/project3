from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine

from flask import Flask, jsonify, render_template
from flask_cors import CORS

engine = create_engine("sqlite:///ds_salaries.sqlite")


# reflect an existing database into a new model
Base = automap_base()
# reflect the tables
Base.prepare(engine, reflect=True)

# Save reference to the table
salaries = Base.classes.salaries


#################################################
# Flask Setup
#################################################
app = Flask(__name__)
CORS(app)

#################################################
# Flask Routes
#################################################

@app.route("/")
def welcome():
    """List all available api routes."""
    return (
        render_template("index.html")
    )


@app.route("/api/v1.0/all")
def view_all():
    session = Session(engine)
    results = session.query(salaries).all()
    #output = [{"job_title": x.job_title, "salary_in_usd": x.salary_in_usd} for x in results]
    output = [{"id": x.id, "work_year": x.work_year, "experience_level": x.experience_level, "job_title": x.job_title, "salary": x.salary, "salary_currency": x.salary_currency, "salary_in_usd": x.salary_in_usd, "employee_residence": x.employee_residence,
    "remote_ratio": x.remote_ratio, "company_location": x.company_location, "company_size": x.company_size, "country_name": x.country_name} for x in results]
    session.close()
    return jsonify(output)


# @app.route("/api/v1.0/groups")
# def view_groups():
#     session = Session(engine)
#     results = session.query(salaries.job_title, func.sum(salaries.salary_in_usd) / func.length(salaries.job_title)).all()
#     output = [{"job_title": x.job_title} for x in results]
#     session.close()
#     return jsonify(output)
# @app.route("/api/v1.0/all")
# def view_summary():
#     session = Session(engine)
#     results = session.query(summary).all()
#     output = [{"work_year": x.work_year, "country_name": x.country_name, "job_title": x.job_title, "experience_level": x.experience_level, "salary": x.salary, "remote_ratio": x.remote_ratio} for x in results]
#     session.close()
#     return jsonify(output)


# @app.route("/api/v1.0/searchbyjobtitle/<job_title>")
# def search_by_job_title(job_title):
#     session = Session(engine)
#     results = session.query(salaries).filter(salaries.job_title==job_title).all()
#     output = [{"job_title": x.job_title, "salary_in_usd": x.salary_in_usd} for x in results]
#     session.close()
#     return jsonify(output)


# @app.route("/api/v1.0/searchbysalaryinusd/<salary_in_usd>")
# def search_by_salary_in_usd(salary_in_usd):
#     session = Session(engine)
#     results = session.query(salaries).filter(salaries.salary_in_usd==salary_in_usd).all()
#     output = [{"job_title": x.job_title, "salary_in_usd": x.salary_in_usd} for x in results]
#     session.close()
#     return jsonify(output)

# @app.route("/api/v1.0/searchbyremoteratio/<remote_ratio>")
# def search_by_remote_ratio(remote_ratio):
#     session = Session(engine)
#     results = session.query(salaries).filter(salaries.remote_ratio==remote_ratio).all()
#     output = [{"job_title": x.job_title, "remote_ratio": x.remote_ratio} for x in results]
#     session.close()
#     return jsonify(output)


if __name__ == '__main__':
    app.run(debug=True)