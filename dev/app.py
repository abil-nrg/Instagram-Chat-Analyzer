import pandas as pd

from flask import Flask, request, jsonify
from flask_cors import CORS

from load import parse_json
from count import total_msgs_sent, total_msgs_recieved, get_activity_timeline


app = Flask(__name__)
CORS(app, origins="http://localhost:3000")

@app.route('/api/upload', methods=['POST'])
def get_main_files():
    files = request.files.getlist('files')
    msgs_arr = []
    ptcpts_arr = []
    for file in files:
        print(f"Received file: {file.filename}")
        print(f"Type: {type(file.read().decode('utf-8'))}")
        msg, participants = parse_json(file.read().decode('utf-8'))

        msgs_arr.append(msg)
        ptcpts_arr.append(participants)

    msgs = pd.concat(msgs_arr, axis = 1)
    ptcpts = pd.concat(ptcpts_arr, axis = 1)
    
    username = "DO HERE"

    totalMessagesSent = total_msgs_sent(msgs, username)
    totalMessagesReceived = total_msgs_recieved(msgs, username)
    activityTimeline = get_activity_timeline(msgs, username)    

    response = {"totalMessagesSent" : totalMessagesSent,
                "totalMessagesReceived" : totalMessagesReceived,
                "emojiFrequency": {},
                "topFriends" : {},
                "wordFrequency" : {}, 
                "activityTimeline" : activityTimeline,
                }

    return jsonify({"data": "success"}), 200

if __name__ == "__main__":
    app.run(debug=True)