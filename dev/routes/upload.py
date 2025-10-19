from flask import Blueprint, request, jsonify
import json, os

upload_bp = Blueprint('upload',__name__)

UPLOAD_FOLDER = "dev/uploads"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

@upload_bp.route('/upload', methods=['POST'])
def upload_file():
    if 'file' not in request.files:
        return jsonify({"error":"file?"}),400

    file = request.files['file']

    if file and file.filename.endswith('.json'):
        filepath=  os.path.join(UPLOAD_FOLDER,file.filename)
        file.save(filepath)