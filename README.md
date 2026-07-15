# ☁️ CloudSnap

A cloud-native image hosting platform, built to demonstrate an end-to-end DevOps pipeline — from containerization through orchestration, CI/CD, cloud deployment, and real-time monitoring.

Built as part of a research paper: **"Design and Implementation of a Cloud-Native Application Deployment Framework Using Docker and Kubernetes"**

---

## 🚀 What This Project Demonstrates

- **Containerization** — Flask app packaged with Docker
- **Orchestration** — 3 replicas running on Kubernetes (Minikube), behind a NodePort Service
- **CI/CD** — GitHub Actions automatically builds and pushes a new image to Docker Hub on every push
- **Cloud Hosting** — Live on AWS EC2 with a static Elastic IP
- **Monitoring** — Prometheus scrapes live metrics from every pod; Grafana visualizes request rate and pod uptime
- **Resilience** — Verified Kubernetes automatically recovers crashed pods without manual intervention

---

## 🏗️ Architecture

```
Developer → GitHub Repo → GitHub Actions (CI/CD) → Docker Hub
                                                        ↓
                                    ┌───────────────────┴───────────────────┐
                                    ↓                                       ↓
                    Kubernetes Cluster (Minikube)                  AWS EC2 Instance
                    3 Pod Replicas + NodePort Service              Docker Container + Elastic IP
                                    ↓
                    Prometheus (ServiceMonitor) → Grafana Dashboard
```

---

## 🧰 Tech Stack

| Layer            | Tool                      |
| ---------------- | ------------------------- |
| Application      | Flask (Python)            |
| Containerization | Docker                    |
| Orchestration    | Kubernetes (Minikube)     |
| CI/CD            | GitHub Actions            |
| Cloud Hosting    | AWS EC2 (Elastic IP)      |
| Monitoring       | Prometheus + Grafana      |
| Metrics Export   | prometheus_flask_exporter |

---

## 📦 Getting Started on Your Own Machine

### Prerequisites

Make sure you have these installed:

- [Python 3.11+](https://www.python.org/downloads/)
- [Docker Desktop](https://www.docker.com/products/docker-desktop/)
- [Minikube](https://minikube.sigs.k8s.io/docs/start/)
- [kubectl](https://kubernetes.io/docs/tasks/tools/)
- [Helm](https://helm.sh/docs/intro/install/) (for Prometheus/Grafana)
- Git

### 1. Clone the repository

```bash
git clone https://github.com/Midoriya-w/cloudSnap.git
cd cloudSnap
```

### 2. Run it locally (without Docker)

```bash
python -m venv .venv
# Windows
.venv\Scripts\Activate.ps1
# macOS/Linux
source .venv/bin/activate

pip install -r requirements.txt
python app.py
```

App will be running at **http://localhost:5000**
Metrics available at **http://localhost:5000/metrics**

### 3. Run it with Docker

```bash
docker build -t cloud-native-app .
docker run -d --name cloudsnap-app -p 5000:5000 cloud-native-app
```

Or pull the pre-built image directly:

```bash
docker pull midoriya543/cloud-native-app:latest
docker run -d --name cloudsnap-app -p 5000:5000 midoriya543/cloud-native-app:latest
```

### 4. Deploy to Kubernetes (Minikube)

```bash
minikube start
kubectl apply -f deployment.yaml
kubectl get pods       # confirm 3 pods are Running
kubectl get services    # confirm the NodePort service

minikube service cloud-native-app-service   # opens the app in your browser
```

### 5. Set up monitoring (Prometheus + Grafana)

```bash
helm repo add prometheus-community https://prometheus-community.github.io/helm-charts
helm repo update
helm install monitoring prometheus-community/kube-prometheus-stack

kubectl apply -f service-monitor.yaml
```

Get the Grafana admin password:

```bash
kubectl get secrets monitoring-grafana -o jsonpath="{.data.admin-password}" | base64 -d
```

Access Grafana:

```bash
kubectl port-forward svc/monitoring-grafana 3000:80
```

Then open **http://localhost:3000** and log in with username `admin` and the password above.

---

## 🔁 CI/CD Pipeline

Every push to `master` triggers `.github/workflows/` to:

1. Check out the repository
2. Build a new Docker image
3. Push it to Docker Hub as `midoriya543/cloud-native-app:latest`

No manual rebuild or redeploy needed — just push your code.

---

## 📊 Monitoring

- Prometheus scrapes `/metrics` from every pod every 15 seconds via a `ServiceMonitor`
- Grafana dashboard **"CloudSnap Monitoring"** tracks:
  - Request rate (`rate(flask_http_request_total[5m])`)
  - Pod uptime (`up{job="cloud-native-app-service"}`)

---

## 📁 Project Structure

```
cloudSnap/
├── app.py                  # Flask application
├── Dockerfile               # Container build instructions
├── deployment.yaml          # Kubernetes Deployment + Service
├── service-monitor.yaml     # Prometheus ServiceMonitor
├── requirements.txt         # Python dependencies
├── frontend/                 # UI (HTML/CSS/JS)
├── .github/workflows/        # CI/CD pipeline
└── README.md
```

---

## 👥 Contributors

- **Ch. Dinesh Sai Vardhan** — Technical implementation
- **Ch. S. M. Harsha** — Documentation and literature review

Project guide: **Dr. Sibendu Samanta**, Assistant Professor, SRM University AP

---

## 📄 Research Paper

- [x] Dockerize application
- [x] Deploy on Kubernetes with 3 replicas
- [x] Push image to Docker Hub
- [x] GitHub Actions CI/CD pipeline
- [x] Deploy on AWS EC2
- [x] Prometheus + Grafana monitoring

---

## 🔮 Future Work

- NGINX Ingress for host/path-based routing and TLS termination
- Horizontal Pod Autoscaling driven by Prometheus metrics
- Automated testing in the CI/CD pipeline
- Grafana alerting for pod failures
