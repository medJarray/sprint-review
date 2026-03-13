# terraform/modules/compute/variables.tf

variable "environment" {
  description = "Environment name (dev/prod)"
  type        = string
  validation {
    condition     = contains(["dev", "prod"], var.environment)
    error_message = "Environment must be 'dev' or 'prod'."
  }
}

variable "server_type" {
  description = "Hetzner server type"
  type        = string
  default     = "cx33"
}

variable "location" {
  description = "Hetzner datacenter location"
  type        = string
  default     = "fsn1"
}

variable "image" {
  description = "OS image"
  type        = string
  default     = "ubuntu-24.04"
}

variable "ssh_public_key" {
  description = "SSH public key content"
  type        = string
  sensitive   = true
}

variable "ssh_public_key_name" {
  description = "SSH key name in Hetzner"
  type        = string
}

variable "firewall_id" {
  description = "Hetzner Firewall ID to attach"
  type        = string
}

variable "network_id" {
  description = "Hetzner private network ID (optional)"
  type        = string
  default     = ""
}

variable "labels" {
  description = "Labels to apply to resources"
  type        = map(string)
  default     = {}
}

variable "k3s_version" {
  description = "K3s version for cloud-init"
  type        = string
  default     = "v1.30"
}

variable "deploy_user" {
  description = "Non-root user to create"
  type        = string
  default     = "deploy"
}