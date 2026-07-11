from flask import Flask

app = Flask(__name__)

@app.route('/')
def home():
    return '''
<!DOCTYPE html>
<html>
<head>
    <title>Cloud-Native App</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
            font-family: Arial, sans-serif;
            background: #0f0f0f;
            color: white;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
        }
        .card {
            background: #1a1a1a;
            border: 1px solid #333;
            border-radius: 16px;
            padding: 40px;
            text-align: center;
            width: 420px;
        }
        .badge {
            background: #4a9eed;
            color: white;
            padding: 6px 16px;
            border-radius: 20px;
            font-size: 13px;
            display: inline-block;
            margin-bottom: 20px;
        }
        h1 { font-size: 28px; margin-bottom: 10px; }
        p { color: #888; margin-bottom: 8px; font-size: 14px; }
        .stack {
            display: flex;
            justify-content: center;
            gap: 10px;
            margin-top: 24px;
            flex-wrap: wrap;
        }
        .tag {
            background: #222;
            border: 1px solid #444;
            padding: 6px 14px;
            border-radius: 8px;
            font-size: 13px;
            color: #4a9eed;
        }
        .status {
            margin-top: 24px;
            background: #0d2b0d;
            border: 1px solid #1a5c1a;
            border-radius: 8px;
            padding: 12px;
            font-size: 13px;
            color: #4caf50;
        }
    </style>
</head>
<body>
    <div class="card">
        <div class="badge">Group 7 — SRM University AP</div>
        <h1>Cloud-Native App</h1>
        <p>Deployed using Docker & Kubernetes</p>
        <p>Ch. Dinesh & Ch. S.M. Harsha</p>
        <div class="stack">
            <span class="tag">Docker</span>
            <span class="tag">Kubernetes</span>
            <span class="tag">AWS EC2</span>
            <span class="tag">Flask</span>
            <span class="tag">GitHub Actions</span>
        </div>
        <div class="status">
            ● Application running on Kubernetes cluster — 3 Pods Active
        </div>
    </div>
</body>
</html>
    '''

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)