# Makefile
.PHONY: help init-dev init-prod plan-dev plan-prod apply-dev apply-prod \
        ansible-dev ansible-prod lint security-scan destroy-dev

ENV ?= dev

help: ## Afficher l'aide
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | \
	awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-20s\033[0m %s\n", $$1, $$2}'

# ─── Bootstrap ───
init-dev: ## Bootstrap complet dev
	./scripts/init.sh dev

init-prod: ## Bootstrap complet prod
	./scripts/init.sh prod

# ─── Terraform ───
plan-dev: ## Terraform plan dev
	cd terraform/environments/dev && terraform plan -var-file=terraform.tfvars

plan-prod: ## Terraform plan prod
	cd terraform/environments/prod && terraform plan -var-file=terraform.tfvars

apply-dev: ## Terraform apply dev
	cd terraform/environments/dev && terraform apply -var-file=terraform.tfvars

apply-prod: ## Terraform apply prod (manual approval required)
	cd terraform/environments/prod && terraform apply -var-file=terraform.tfvars

# ─── Ansible ───
ansible-dev: ## Ansible full setup dev
	@test -n "$$HCLOUD_TOKEN" || (echo "\u274c HCLOUD_TOKEN not set. Run: export HCLOUD_TOKEN='your-token'" && exit 1)
	cd ansible && ansible-playbook playbooks/site.yml -i inventories/dev/hosts.yml

ansible-prod: ## Ansible full setup prod
	@test -n "$$HCLOUD_TOKEN" || (echo "\u274c HCLOUD_TOKEN not set. Run: export HCLOUD_TOKEN='your-token'" && exit 1)
	cd ansible && ansible-playbook playbooks/site.yml -i inventories/prod/hosts.yml

harden: ## Run security hardening only
	cd ansible && ansible-playbook playbooks/hardening.yml -i inventories/$(ENV)/hosts.yml

# ─── Security ───
lint: ## Lint Terraform + Ansible
	cd terraform && terraform fmt -recursive -check
	cd ansible && ansible-lint playbooks/

security-scan: ## Run security scans
	cd terraform && tfsec .
	cd terraform && checkov -d .
	gitleaks detect --source .

pre-commit: ## Run pre-commit hooks
	pre-commit run --all-files

# ─── Cleanup ───
destroy-dev: ## Destroy dev environment
	cd terraform/environments/dev && terraform destroy -var-file=terraform.tfvars

# ─── Kubeconfig ───
kubeconfig-dev: ## Set KUBECONFIG for dev
	@echo "export KUBECONFIG=$(PWD)/kubeconfigs/dev-kubeconfig.yaml"

kubeconfig-prod: ## Set KUBECONFIG for prod
	@echo "export KUBECONFIG=$(PWD)/kubeconfigs/prod-kubeconfig.yaml"