from flask import Flask
app = Flask(__name__)

@app.route('/')
def home():
    return '''
    <h1>Cloud-Native App</h1>
    <p>Deployed using Docker and Kubernetes</p>
    <p>Group 7 — Ch. Dinesh & Ch. Harsha</p>
    '''

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)