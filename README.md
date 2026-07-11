# ☁️ Cloud-Native App

![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)
![Kubernetes](https://img.shields.io/badge/Kubernetes-326CE5?style=for-the-badge&logo=kubernetes&logoColor=white)
![Flask](https://img.shields.io/badge/Flask-000000?style=for-the-badge&logo=flask&logoColor=white)
![AWS](https://img.shields.io/badge/AWS-232F3E?style=for-the-badge&logo=amazonaws&logoColor=white)

A containerized Flask web application deployed on a Kubernetes cluster.

---

## 🛠️ Tech Stack
- **Flask** — Web application
- **Docker** — Containerization
- **Kubernetes** — Orchestration
- **AWS EC2** — Cloud hosting
- **GitHub Actions** — CI/CD
- **Prometheus + Grafana** — Monitoring

---

## 🚀 Getting Started

```bash
# Clone
git clone https://github.com/Midoriya-w/cloud-native-app.git
cd cloud-native-app

# Run with Docker
docker build -t cloud-native-app .
docker run -d -p 5000:5000 cloud-native-app

# Deploy on Kubernetes
minikube start
kubectl apply -f deployment.yaml
minikube service cloud-native-app-service
```

---

## 📦 Docker Hub
```bash
docker pull midoriya543/cloud-native-app
```
