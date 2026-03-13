# terraform/modules/network/variables.tf

variable "environment" {
  type = string
}

variable "admin_ipv4" {
  description = "Admin IPv4 for SSH/API access"
  type        = string
}

variable "admin_ipv6" {
  description = "Admin IPv6 for SSH/API access"
  type        = string
  default     = ""
}

variable "enable_private_network" {
  description = "Create a private network (for multi-node)"
  type        = bool
  default     = false
}

variable "private_network_cidr" {
  description = "Private network CIDR"
  type        = string
  default     = "10.0.0.0/16"
}

variable "private_subnet_cidr" {
  description = "Private subnet CIDR"
  type        = string
  default     = "10.0.1.0/24"
}