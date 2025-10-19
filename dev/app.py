
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app, origins="http://localhost:3000")

@app.route('/api/upload', methods=['POST'])
def get_main_files():
    files = request.files.getlist('files')
    for file in files:
        print(f"Received file: {file.filename}")
        print(f"Type: {type(file.read().decode('utf-8'))}")
        print(f"Content: {file.read().decode('utf-8')[:100]}...")
        
    return jsonify({"data": "success"}), 200

if __name__ == "__main__":
    app.run(debug=True)