# ☁️ Cloud-Native App Deployment Framework

![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)
![Kubernetes](https://img.shields.io/badge/Kubernetes-326CE5?style=for-the-badge&logo=kubernetes&logoColor=white)
![Flask](https://img.shields.io/badge/Flask-000000?style=for-the-badge&logo=flask&logoColor=white)
![AWS](https://img.shields.io/badge/AWS-232F3E?style=for-the-badge&logo=amazonaws&logoColor=white)
![GitHub Actions](https://img.shields.io/badge/GitHub_Actions-2088FF?style=for-the-badge&logo=githubactions&logoColor=white)

A production-ready cloud-native web application containerized with Docker and orchestrated using Kubernetes. Demonstrates a complete DevOps workflow from code to deployment.

---

## 🏗️ Architecture

Developer → GitHub → GitHub Actions → Docker Build → Docker Hub
↓
Kubernetes Cluster (AWS EC2)
↙ ↓ ↘
Pod 1 Pod 2 Pod 3
↓
NGINX Ingress Controller
↓
Prometheus + Grafana

---

## 🔄 CI/CD Flow

1. Developer pushes code to GitHub
2. GitHub Actions triggers automatically
3. Docker image is built and pushed to Docker Hub
4. Kubernetes pulls latest image and redeploys
5. 3 replicas running for high availability
6. Prometheus scrapes metrics, Grafana visualizes

---

## 🛠️ Tech Stack

| Tool           | Purpose                 |
| -------------- | ----------------------- |
| Flask          | Web Application         |
| Docker         | Containerization        |
| Kubernetes     | Container Orchestration |
| AWS EC2        | Cloud Infrastructure    |
| GitHub Actions | CI/CD Automation        |
| NGINX Ingress  | Traffic Routing         |
| Prometheus     | Metrics Collection      |
| Grafana        | Monitoring Dashboard    |

---

## 🚀 Getting Started

### Run with Docker

```bash
docker pull midoriya543/cloud-native-app
docker run -d -p 5000:5000 midoriya543/cloud-native-app
```

### Deploy on Kubernetes

```bash
git clone https://github.com/Midoriya-w/cloud-native-app.git
cd cloud-native-app
minikube start
kubectl apply -f deployment.yaml
minikube service cloud-native-app-service
```

### Check pods

```bash
kubectl get pods
kubectl get services
```

---

## 📦 Docker Hub

[midoriya543/cloud-native-app](https://hub.docker.com/r/midoriya543/cloud-native-app)

---

## 🔮 Roadmap

- [x] Dockerize application
- [x] Deploy on Kubernetes with 3 replicas
- [x] Push image to Docker Hub
- [ ] GitHub Actions CI/CD pipeline
- [ ] Deploy on AWS EC2
- [ ] NGINX Ingress setup
- [ ] Prometheus + Grafana monitoring

---

## 👤 Author

**Ch. Dinesh**
[![GitHub](https://img.shields.io/badge/GitHub-Midoriya--w-black?style=flat&logo=github)](https://github.com/Midoriya-w)
