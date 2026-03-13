#!/bin/bash
# scripts/init.sh — Bootstrap complet d'un environnement
set -euo pipefail

# ──────────────────────────────────────────
# Configuration
# ──────────────────────────────────────────
ENV="${1:-dev}"
echo "🚀 Bootstrapping environment: ${ENV}"

# Vérifications
command -v terraform >/dev/null 2>&1 || { echo "❌ terraform not found"; exit 1; }
command -v ansible >/dev/null 2>&1 || { echo "❌ ansible not found"; exit 1; }
command -v hcloud >/dev/null 2>&1 || { echo "❌ hcloud CLI not found"; exit 1; }

if [ -z "${HCLOUD_TOKEN:-}" ]; then
  echo "❌ HCLOUD_TOKEN is not set!"
  echo "   Run: export HCLOUD_TOKEN='your-hetzner-api-token'"
  exit 1
fi

if [ ! -f "terraform/environments/${ENV}/terraform.tfvars" ]; then
  echo "❌ terraform.tfvars not found for ${ENV}"
  exit 1
fi

# ──────────────────────────────────────────
# Phase 1 : Terraform
# ──────────────────────────────────────────
echo ""
echo "📦 Phase 1: Terraform — Provisioning infrastructure..."
cd "terraform/environments/${ENV}"

terraform init -upgrade
terraform validate
terraform plan -var-file=terraform.tfvars -out=tfplan

echo ""
read -p "✅ Apply this plan? (yes/no): " CONFIRM
if [ "$CONFIRM" != "yes" ]; then
  echo "❌ Aborted"
  exit 0
fi

terraform apply tfplan
rm -f tfplan

# Récupérer les outputs
SERVER_IP=$(terraform output -raw server_ipv4)
echo "📍 Server IP: ${SERVER_IP}"

cd ../../..

# ──────────────────────────────────────────
# Phase 2 : Attendre que le serveur soit prêt
# ──────────────────────────────────────────
echo ""
echo "⏳ Phase 2: Waiting for server to be ready..."
for i in $(seq 1 30); do
  if ssh -o ConnectTimeout=5 -o StrictHostKeyChecking=no deploy@${SERVER_IP} "test -f /var/lib/cloud/instance/boot-finished" 2>/dev/null; then
    echo "✅ Server ready!"
    break
  fi
  echo "  Waiting... (${i}/30)"
  sleep 10
done

# ──────────────────────────────────────────
# Phase 3 : Ansible
# ──────────────────────────────────────────
echo ""
echo "🔧 Phase 3: Ansible — Configuring server..."
cd ansible/

ansible-playbook playbooks/site.yml \
  -i "inventories/${ENV}/hosts.yml" \
  --extra-vars "env_name=${ENV}"

cd ..

# ──────────────────────────────────────────
# Phase 4 : Vérification
# ──────────────────────────────────────────
echo ""
echo "✅ Phase 4: Verification..."
export KUBECONFIG="kubeconfigs/${ENV}-kubeconfig.yaml"

echo "  Nodes:"
kubectl get nodes -o wide

echo ""
echo "  Pods:"
kubectl get pods -A

echo ""
echo "  Storage Classes:"
kubectl get storageclass

echo ""
echo "══════════════════════════════════════════════"
echo "✅ Environment ${ENV} is ready!"
echo "  KUBECONFIG: kubeconfigs/${ENV}-kubeconfig.yaml"
echo "  Server: ${SERVER_IP}"
echo "══════════════════════════════════════════════"