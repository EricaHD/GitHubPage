from flask import Flask
from flask_cors import CORS
import os
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)

# Enable CORS for all routes
CORS(app)

@app.route('/api/health', methods=['GET'])
def health():
    return {'status': 'ok'}, 200

@app.route('/api/data', methods=['GET'])
def get_data():
    return {'message': 'This is a data from the backend.'}, 200

if __name__ == '__main__':
    # We use debug_mode in development because it gives us
    # - auto-reload (the server automatically restarts when we make changes to the code)
    # - an interactive debugger in the browser
    # - better error messages in the browser
    debug_mode = os.getenv('FLASK_ENV') == 'development'
    app.run(debug=debug_mode, port=5001)
