# scripts/destroy.sh — Teardown complet (DANGER)
#!/bin/bash
set -euo pipefail

ENV="${1:-}"
if [ -z "$ENV" ]; then
  echo "Usage: ./scripts/destroy.sh <dev|prod>"
  exit 1
fi

if [ "$ENV" == "prod" ]; then
  echo "⚠️  WARNING: You are about to destroy PRODUCTION!"
  echo "⚠️  This will DELETE all servers, volumes, and data!"
  read -p "Type 'destroy-prod' to confirm: " CONFIRM
  if [ "$CONFIRM" != "destroy-prod" ]; then
    echo "❌ Aborted"
    exit 0
  fi
fi

echo "💥 Destroying ${ENV} environment..."
cd "terraform/environments/${ENV}"
terraform destroy -var-file=terraform.tfvars