# Hetzner Cloud Kubernetes Infrastructure

Infrastructure-as-Code for deploying a production-ready, single-node **K3s Kubernetes cluster** on [Hetzner Cloud](https://www.hetzner.com/cloud), with full OS hardening, persistent storage, and CI/CD pipelines.

---

## Overview

This project automates the full lifecycle of a Kubernetes cluster on Hetzner Cloud:

1. **Terraform** provisions cloud resources (VPS, firewall, volumes, DNS)
2. **cloud-init** bootstraps the server on first boot
3. **Ansible** configures K3s, Helm, security hardening, and Hetzner integrations
4. **GitHub Actions** handles CI security scanning and deployment pipelines

### What gets deployed

- K3s (lightweight Kubernetes) with dual-stack IPv6 networking
- Hetzner Cloud Controller Manager (CCM) — node lifecycle, load balancers
- Hetzner CSI Driver — persistent volumes backed by Hetzner block storage
- Helm package manager
- OS hardening: fail2ban, auditd, UFW, unattended-upgrades, sysctl tuning
- Two pre-provisioned block storage volumes (MongoDB and MinIO)

---

## Architecture

```
┌─────────────────────────────────────────────────────┐
│                  Hetzner Cloud                       │
│                                                      │
│  ┌──────────────────────────────────────────────┐   │
│  │  VPS (cx33 — 4vCPU / 8GB RAM / Ubuntu 24.04) │   │
│  │                                              │   │
│  │   K3s API :6443   HTTP :80   HTTPS :443      │   │
│  │                                              │   │
│  │   ┌────────────┐  ┌──────────────────────┐  │   │
│  │   │  K3s Node  │  │  Hetzner CCM + CSI   │  │   │
│  │   └────────────┘  └──────────────────────┘  │   │
│  └──────────────────────────────────────────────┘   │
│                                                      │
│  ┌───────────────┐  ┌────────────────────────────┐  │
│  │  Firewall     │  │  Block Storage             │  │
│  │  SSH :22      │  │  MongoDB Volume  (10 GB)   │  │
│  │  HTTP/S :80   │  │  MinIO Volume    (20 GB)   │  │
│  │  K3s API :6443│  └────────────────────────────┘  │
│  └───────────────┘                                   │
└─────────────────────────────────────────────────────┘
```

---

## Repository Structure

```
hetzner_cloud/
├── .github/
│   └── workflows/
│       ├── infra-plan.yml       # PR: terraform plan + security scans
│       ├── infra-apply.yml      # Manual deploy to dev/prod
│       └── security-scan.yml    # Weekly: drift detection + kube-bench
├── .pre-commit-config.yaml      # gitleaks, tfsec, checkov, YAML lint
├── ansible/
│   ├── ansible.cfg
│   ├── inventories/
│   │   ├── dev/
│   │   └── prod/
│   ├── playbooks/
│   │   ├── site.yml             # Full setup orchestration
│   │   ├── hardening.yml        # Security hardening only
│   │   └── upgrade.yml          # OS + K3s rolling upgrades
│   └── roles/
│       ├── common/              # Packages, SSH, sysctl, swap, timezone
│       ├── security/            # fail2ban, auditd, unattended-upgrades
│       ├── k3s_server/          # K3s install + dual-stack config
│       ├── helm/                # Helm install
│       ├── hetzner_ccm/         # Cloud Controller Manager
│       └── hetzner_csi/         # CSI driver + StorageClass
├── terraform/
│   ├── version.tf               # Terraform >= 1.7.0, hcloud ~1.45
│   ├── environments/
│   │   ├── dev/                 # Dev environment (local state)
│   │   └── prod/                # Prod environment (remote state)
│   ├── modules/
│   │   ├── compute/             # VPS provisioning
│   │   ├── network/             # Firewall + private network
│   │   ├── storage/             # Block storage volumes
│   │   └── dns/                 # DNS A/AAAA records
│   └── files/
│       └── cloud-init.yml.tpl   # Server bootstrap template
├── scripts/
│   ├── init.sh                  # Full bootstrap (Terraform → Ansible)
│   └── destroy.sh               # Safe teardown with confirmation
└── makefile                     # Common make targets
```

---

## Prerequisites

| Tool | Version |
|------|---------|
| Terraform | >= 1.7.0 |
| Ansible | >= 2.10 |
| kubectl | latest |
| Hetzner CLI (`hcloud`) | latest |
| pre-commit | latest |

You also need:
- A [Hetzner Cloud](https://console.hetzner.cloud/) account
- An API token (Project → Security → API Tokens)
- An SSH key pair:

```bash
ssh-keygen -t ed25519 -f ~/.ssh/id_ed25519
```

---

## Quick Start

### 1. Clone and configure

```bash
git clone <repo-url>
cd hetzner_cloud
export HCLOUD_TOKEN='your-hetzner-api-token'
```

### 2. Set up `terraform.tfvars`

```hcl
# terraform/environments/dev/terraform.tfvars
environment           = "dev"
server_type           = "cx33"           # 4 vCPU, 8 GB RAM
location              = "fsn1"           # Frankfurt
image                 = "ubuntu-24.04"
ssh_public_key        = "ssh-ed25519 AAAA... your-key"
ssh_public_key_name   = "deploy-key"
admin_ipv4            = "1.2.3.4"        # Your IP for SSH + K3s API access
mongodb_volume_size   = 10               # GB
minio_volume_size     = 20               # GB
ssh_private_key_path  = "~/.ssh/id_ed25519"
```

### 3. Bootstrap the full stack

```bash
make init-dev
```

This runs [init.sh](init.sh) which:

1. `terraform init` → `validate` → `plan` → `apply`
2. Waits for the server to become ready (up to 5 minutes)
3. Runs `ansible-playbook playbooks/site.yml`
4. Verifies the cluster via `kubectl get nodes`

### 4. Access your cluster

```bash
export KUBECONFIG=$(pwd)/kubeconfigs/dev-kubeconfig.yaml
kubectl get nodes
kubectl get pods -A
```

---

## Usage

### Make targets

| Command | Description |
|---------|-------------|
| `make init-dev` | Full bootstrap: Terraform + Ansible |
| `make plan-dev` | Terraform plan (no apply) |
| `make apply-dev` | Terraform apply only |
| `make ansible-dev` | Run Ansible playbooks only |
| `make harden ENV=dev` | Re-run security hardening |
| `make kubeconfig-dev` | Print kubeconfig export command |
| `make destroy-dev` | Destroy dev infrastructure |
| `make security-scan` | Run tfsec + checkov + gitleaks |
| `make lint` | Terraform fmt + ansible-lint |
| `make pre-commit` | Run all pre-commit hooks |

### Upgrade OS and K3s

```bash
ansible-playbook ansible/playbooks/upgrade.yml \
  -i ansible/inventories/dev/hosts.yml \
  -e "k3s_upgrade=true"
```

### Destroy infrastructure

```bash
./scripts/destroy.sh dev    # Prompts for confirmation
./scripts/destroy.sh prod   # Requires typing 'destroy-prod'
```

---

## Security

### Pre-commit hooks

All commits are scanned by:
- **gitleaks** — secret detection
- **tfsec** — Terraform security analysis
- **checkov** — infrastructure compliance
- **yamllint** — YAML linting

Install hooks:
```bash
pip install pre-commit
pre-commit install
```

### OS hardening (Ansible)

- SSH: root login disabled, password authentication disabled, pubkey only
- **fail2ban**: brute-force protection on SSH
- **auditd**: monitors sudoers, SSH config, K3s binary, kubeconfig changes
- **unattended-upgrades**: daily automatic security patching
- **sysctl tuning**: socket limits, TCP backlog, inotify, IPv6 forwarding

### Network / Firewall

| Port | Protocol | Access |
|------|----------|--------|
| 22 | TCP | Admin IP only |
| 80 | TCP | Public |
| 443 | TCP | Public |
| 6443 | TCP | Admin IP only (K3s API) |
| ICMP | — | Public |

### Storage protection

Block storage volumes use a **Retain** reclaim policy — volumes are never deleted automatically even if the Terraform resource is removed.

---

## CI/CD Pipelines

| Workflow | Trigger | Actions |
|----------|---------|---------|
| `infra-plan.yml` | PR touching `terraform/` or `ansible/` | tfsec, checkov, ansible-lint, terraform plan |
| `infra-apply.yml` | Manual | Deploy to dev or prod |
| `security-scan.yml` | Weekly (Mon 06:00 UTC) | Drift detection, kube-bench CIS audit |

---

## Configuration Reference

### Terraform variables (`variables.tf`)

| Variable | Default | Description |
|----------|---------|-------------|
| `environment` | — | `dev` or `prod` |
| `server_type` | `cx33` | Hetzner server type |
| `location` | `fsn1` | Hetzner datacenter |
| `image` | `ubuntu-24.04` | OS image |
| `ssh_public_key` | — | SSH public key content |
| `ssh_public_key_name` | — | Key label in Hetzner |
| `admin_ipv4` | — | Your IP (SSH + K3s API) |
| `admin_ipv6` | — | Your IPv6 (optional) |
| `mongodb_volume_size` | `10` | MongoDB volume GB |
| `minio_volume_size` | `20` | MinIO volume GB |
| `ssh_private_key_path` | — | Local path to private key |

### K3s configuration

K3s is installed with:
- Traefik **disabled** (bring your own ingress)
- ServiceLB **disabled**
- Dual-stack: cluster CIDR `10.42.0.0/16,fd42::/48`, service CIDR `10.43.0.0/16,fd43::/112`
- Kubeconfig at `/etc/rancher/k3s/k3s.yaml`

---

## Generated Files (git-ignored)

| Path | Description |
|------|-------------|
| `kubeconfigs/{env}-kubeconfig.yaml` | Kubernetes credentials |
| `ansible/inventories/{env}/hosts.yml` | Auto-generated from Terraform outputs |
| `terraform/environments/{env}/terraform.tfstate` | Infrastructure state |
| `terraform/environments/{env}/.terraform/` | Provider cache |

---

## Available Hetzner Server Types

| Type | vCPU | RAM | Disk | Monthly (~) |
|------|------|-----|------|-------------|
| cx22 | 2 | 4 GB | 40 GB | ~4 € |
| cx33 | 4 | 8 GB | 80 GB | ~8 € |
| cx43 | 8 | 16 GB | 160 GB | ~16 € |
| cx52 | 16 | 32 GB | 320 GB | ~32 € |

Locations: `fsn1` (Falkenstein), `nbg1` (Nuremberg), `hel1` (Helsinki), `ash` (Ashburn), `hil` (Hillsboro)

---

## Kubernetes avec K3s — Guide complet

### Accéder au cluster

```bash
# Après le run Ansible
export KUBECONFIG=$(pwd)/kubeconfigs/dev-kubeconfig.yaml

# Ou directement sur le serveur
ssh -i ~/.ssh/hetzner_cloud deploy@46.225.138.222
export KUBECONFIG=/etc/rancher/k3s/k3s.yaml
kubectl get nodes
```

---

### Les ressources Kubernetes essentielles

#### Namespace — Isoler ses workloads

Un namespace est un espace logique pour regrouper et isoler des ressources.

```yaml
# namespace.yaml
apiVersion: v1
kind: Namespace
metadata:
  name: myapp
```

```bash
kubectl apply -f namespace.yaml
kubectl get namespaces
```

---

#### Deployment — Déployer une application

Le Deployment gère les pods applicatifs, les rolling updates et les rollbacks.

```yaml
# deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: myapp
  namespace: myapp
spec:
  replicas: 2
  selector:
    matchLabels:
      app: myapp
  template:
    metadata:
      labels:
        app: myapp
    spec:
      containers:
        - name: myapp
          image: nginx:alpine
          ports:
            - containerPort: 80
          resources:
            requests:
              cpu: "100m"
              memory: "128Mi"
            limits:
              cpu: "500m"
              memory: "256Mi"
```

```bash
kubectl apply -f deployment.yaml
kubectl get deployments -n myapp
kubectl get pods -n myapp

# Mettre à jour l'image (rolling update)
kubectl set image deployment/myapp myapp=nginx:1.25 -n myapp

# Rollback
kubectl rollout undo deployment/myapp -n myapp

# Historique
kubectl rollout history deployment/myapp -n myapp
```

---

#### Service — Exposer une application

Le Service fournit une IP stable et du load-balancing vers les pods.

```yaml
# service.yaml
apiVersion: v1
kind: Service
metadata:
  name: myapp
  namespace: myapp
spec:
  selector:
    app: myapp
  ports:
    - port: 80
      targetPort: 80
  type: ClusterIP   # Interne uniquement
```

**Types de Service :**

| Type | Description |
|------|-------------|
| `ClusterIP` | IP interne au cluster (défaut) |
| `NodePort` | Expose un port sur le nœud (30000-32767) |
| `LoadBalancer` | Crée un Hetzner Load Balancer (via CCM) |

```bash
kubectl apply -f service.yaml
kubectl get services -n myapp
kubectl describe service myapp -n myapp
```

---

#### Ingress — Router le trafic HTTP/HTTPS

L'Ingress route les requêtes HTTP vers les bons Services selon le hostname/path.
K3s a Traefik désactivé dans cette config — installer d'abord un ingress controller.

**Installer Nginx Ingress :**
```bash
helm repo add ingress-nginx https://kubernetes.github.io/ingress-nginx
helm repo update
helm install ingress-nginx ingress-nginx/ingress-nginx \
  --namespace ingress-nginx --create-namespace
```

**Créer un Ingress :**
```yaml
# ingress.yaml
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: myapp
  namespace: myapp
  annotations:
    nginx.ingress.kubernetes.io/rewrite-target: /
spec:
  ingressClassName: nginx
  rules:
    - host: myapp.dev.example.com
      http:
        paths:
          - path: /
            pathType: Prefix
            backend:
              service:
                name: myapp
                port:
                  number: 80
```

```bash
kubectl apply -f ingress.yaml
kubectl get ingress -n myapp
```

---

#### PersistentVolumeClaim — Stockage persistant (Hetzner CSI)

Le CSI Hetzner est déjà installé par Ansible. Les volumes sont des blocs Hetzner.

```yaml
# pvc.yaml
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: myapp-data
  namespace: myapp
spec:
  accessModes:
    - ReadWriteOnce
  storageClassName: hcloud-volumes   # StorageClass créée par le CSI
  resources:
    requests:
      storage: 10Gi
```

```bash
kubectl apply -f pvc.yaml
kubectl get pvc -n myapp
kubectl get pv   # Volumes physiques créés chez Hetzner
```

**Utiliser le PVC dans un Deployment :**
```yaml
spec:
  template:
    spec:
      containers:
        - name: myapp
          volumeMounts:
            - name: data
              mountPath: /data
      volumes:
        - name: data
          persistentVolumeClaim:
            claimName: myapp-data
```

---

#### ConfigMap — Configuration applicative

```yaml
# configmap.yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: myapp-config
  namespace: myapp
data:
  APP_ENV: "production"
  LOG_LEVEL: "info"
  DATABASE_HOST: "mongodb.myapp.svc.cluster.local"
```

```bash
kubectl apply -f configmap.yaml

# Injecter dans un pod
kubectl set env deployment/myapp --from=configmap/myapp-config -n myapp
```

---

#### Secret — Données sensibles

```yaml
# secret.yaml
apiVersion: v1
kind: Secret
metadata:
  name: myapp-secrets
  namespace: myapp
type: Opaque
stringData:              # stringData encode automatiquement en base64
  DB_PASSWORD: "monmotdepasse"
  API_KEY: "maclésecrete"
```

```bash
kubectl apply -f secret.yaml

# Utiliser dans un Deployment
# Dans spec.containers :
envFrom:
  - secretRef:
      name: myapp-secrets
```

---

#### CronJob — Tâches planifiées

```yaml
# cronjob.yaml
apiVersion: batch/v1
kind: CronJob
metadata:
  name: backup
  namespace: myapp
spec:
  schedule: "0 2 * * *"   # Tous les jours à 2h
  jobTemplate:
    spec:
      template:
        spec:
          restartPolicy: OnFailure
          containers:
            - name: backup
              image: alpine
              command: ["/bin/sh", "-c", "echo 'backup done'"]
```

---

### Déployer MongoDB avec Helm

MongoDB utilisera le volume bloc Hetzner pré-provisionné.

```bash
helm repo add bitnami https://charts.bitnami.com/bitnami
helm repo update

helm install mongodb bitnami/mongodb \
  --namespace myapp \
  --create-namespace \
  --set auth.rootPassword="monmotdepasse" \
  --set auth.databases[0]="mydb" \
  --set auth.usernames[0]="myuser" \
  --set auth.passwords[0]="userpass" \
  --set persistence.storageClass="hcloud-volumes" \
  --set persistence.size="10Gi"
```

**Connection string :**
```
mongodb://myuser:userpass@mongodb.myapp.svc.cluster.local:27017/mydb
```

---

### Déployer MinIO avec Helm

```bash
helm repo add minio https://charts.min.io/
helm repo update

helm install minio minio/minio \
  --namespace myapp \
  --set rootUser=admin \
  --set rootPassword=monmotdepasse \
  --set persistence.storageClass="hcloud-volumes" \
  --set persistence.size="20Gi" \
  --set mode=standalone
```

---

### Commandes kubectl essentielles

```bash
# ─── Exploration ───
kubectl get all -n myapp                    # Tout dans un namespace
kubectl get pods -A                         # Tous les pods du cluster
kubectl describe pod <pod-name> -n myapp    # Détails d'un pod
kubectl logs <pod-name> -n myapp            # Logs d'un pod
kubectl logs <pod-name> -n myapp -f         # Logs en live
kubectl logs <pod-name> -n myapp --previous # Logs du crash précédent

# ─── Debug ───
kubectl exec -it <pod-name> -n myapp -- /bin/sh   # Shell dans un pod
kubectl port-forward svc/myapp 8080:80 -n myapp   # Accès local temporaire
kubectl top pods -n myapp                          # CPU/RAM consommés

# ─── Gestion ───
kubectl delete pod <pod-name> -n myapp      # Force redémarrage
kubectl scale deployment myapp --replicas=3 -n myapp
kubectl apply -f ./k8s/                     # Appliquer un dossier entier
kubectl delete -f ./k8s/                    # Supprimer les ressources

# ─── Contextes ───
kubectl config get-contexts
kubectl config use-context <context-name>
kubectl config current-context
```

---

### Structure recommandée pour déployer une app

```
k8s/
├── namespace.yaml
├── configmap.yaml
├── secret.yaml
├── pvc.yaml
├── deployment.yaml
├── service.yaml
└── ingress.yaml
```

```bash
# Déployer tout d'un coup
kubectl apply -f k8s/

# Vérifier
kubectl get all -n myapp
```

---

### TLS avec cert-manager (Let's Encrypt)

```bash
helm repo add jetstack https://charts.jetstack.io
helm repo update

helm install cert-manager jetstack/cert-manager \
  --namespace cert-manager \
  --create-namespace \
  --set installCRDs=true
```

```yaml
# clusterissuer.yaml
apiVersion: cert-manager.io/v1
kind: ClusterIssuer
metadata:
  name: letsencrypt-prod
spec:
  acme:
    server: https://acme-v02.api.letsencrypt.org/directory
    email: tonemail@example.com
    privateKeySecretRef:
      name: letsencrypt-prod
    solvers:
      - http01:
          ingress:
            class: nginx
```

```yaml
# Dans l'Ingress, ajouter :
metadata:
  annotations:
    cert-manager.io/cluster-issuer: "letsencrypt-prod"
spec:
  tls:
    - hosts:
        - myapp.dev.example.com
      secretName: myapp-tls
```

---

## License

MIT
