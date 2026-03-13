# terraform/environments/dev/variables.tf
# ⚠️ Ce fichier est OBLIGATOIRE — il déclare toutes les variables
#    utilisées dans main.tf. Sans lui : "No declaration found for var.xxx"

variable "hcloud_token" {
  description = "Hetzner Cloud API token"
  type        = string
  sensitive   = true
}

variable "environment" {
  description = "Environment name (dev/prod)"
  type        = string
  default     = "dev"

  validation {
    condition     = contains(["dev", "prod"], var.environment)
    error_message = "Environment must be 'dev' or 'prod'."
  }
}

# ─── Compute ───

variable "server_type" {
  description = "Hetzner server type (cax11, cx23, cx33...)"
  type        = string
  default     = "cx33"
}

variable "location" {
  description = "Hetzner datacenter location (fsn1, nbg1, hel1)"
  type        = string
  default     = "fsn1"
}

variable "image" {
  description = "OS image for the server"
  type        = string
  default     = "ubuntu-24.04"
}

variable "ssh_public_key" {
  description = "SSH public key content (cat ~/.ssh/id_ed25519.pub)"
  type        = string
  sensitive   = true
}

variable "ssh_public_key_name" {
  description = "Name for the SSH key in Hetzner Cloud"
  type        = string
  default     = "deploy-key"
}

# ─── Network / Security ───

variable "admin_ipv4" {
  description = "Admin IPv4 address for SSH and K3s API access"
  type        = string
}

variable "admin_ipv6" {
  description = "Admin IPv6 address for SSH and K3s API access (optional)"
  type        = string
  default     = ""
}

# ─── Storage ───

variable "mongodb_volume_size" {
  description = "MongoDB block volume size in GB"
  type        = number
  default     = 10

  validation {
    condition     = var.mongodb_volume_size >= 10
    error_message = "Minimum Hetzner volume size is 10 GB."
  }
}

variable "minio_volume_size" {
  description = "MinIO block volume size in GB"
  type        = number
  default     = 20

  validation {
    condition     = var.minio_volume_size >= 10
    error_message = "Minimum Hetzner volume size is 10 GB."
  }
}

# ─── Ansible ───

variable "ssh_private_key_path" {
  description = "Path to SSH private key (used in generated Ansible inventory)"
  type        = string
  default     = "~/.ssh/id_ed25519"
}