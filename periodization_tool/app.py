from datetime import datetime
from flask import Flask,render_template,request,jsonify
app = Flask(__name__)

session={}

cycle = [
    {"name": "Volume", "intensity": 0.75, "sets": 4, "reps": 8},
    {"name": "Forza", "intensity": 0.85, "sets": 4, "reps": 5},
    {"name": "Intensità", "intensity": 0.95, "sets": 3, "reps": 3},
    {"name": "Deload", "intensity": 0.60, "sets": 3, "reps": 8}
]

current_max= 75 

@app.route('/')
def index():
   return render_template('index.html')

@app.route('/add_session', methods=['POST'])
def add_session():
    data=request.json
    session_id = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    session[session_id] = data

    week=len(session)%4
    phase= cycle[week]
    next_weight= round(current_max * phase["intensity"],2)


    return jsonify({
        "next_phase": phase["name"],
        "next_weight": next_weight,
        "sets": phase["sets"],
        "reps": phase["reps"]
    })


if __name__ == '__main__':
    app.run(debug=True)
