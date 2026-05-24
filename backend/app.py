from chalice import Chalice

app = Chalice(app_name='githubpage')


@app.route('/api/health', methods=['GET'], cors=True)
def health():
    return {'status': 'ok'}

@app.route('/api/data', methods=['GET'], cors=True)
def get_data():
    return {'message': 'This is a data from the backend.'}
