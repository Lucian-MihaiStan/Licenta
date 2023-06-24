from flask import Flask, request, jsonify
from pymongo import MongoClient
from bson.objectid import ObjectId
from constants.mongo_constants import MONGO_COLLECTION, MONGO_DB, MONGO_URL
from flask_cors import CORS

app = Flask(__name__, static_url_path='/static')
CORS(app)

mongo_client = MongoClient(MONGO_URL)
mongo_db = mongo_client[MONGO_DB]
mongo_collection = mongo_db[MONGO_COLLECTION]

@app.route('/insert_document', methods=['POST'])
def insert_document():
    try:
        posted_info = request.get_json(silent=True)
        if (isinstance(posted_info, list)):
            posted_info = posted_info[0]
        print(posted_info)
        print(posted_info['file'])
        return jsonify({'document_id': str(mongo_collection.insert_one(posted_info).inserted_id)}), 200
    except Exception as e:
        print("Encountered exception while trying to add file in MongoDB")
        print(e)
    return jsonify({'Error': 400}), 400

@app.route('/find_document/<document_id>', methods=['GET'])
def find_document(document_id):
    try:
        print(document_id)
        entry = mongo_collection.find_one({"_id": ObjectId(document_id)})
        print(entry)
        print(entry['file'])
        return jsonify({'file': entry['file']}), 200 
    except Exception as e:
        print("Encountered exception while trying to search file in MongoDB")
        print(e)
    return jsonify({'Error': 400}), 400

if __name__ == '__main__':
    app.run(threaded=True, host='0.0.0.0', port=5002, debug=True)