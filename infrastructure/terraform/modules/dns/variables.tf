# terraform/modules/dns/variables.tf

variable "environment" {
  type = string
}

variable "domain" {
  description = "Base domain name"
  type        = string
}

variable "ipv4_address" {
  type = string
}

variable "ipv6_address" {
  type = string
}

variable "subdomains" {
  description = "List of subdomains to create"
  type        = list(string)
  default     = ["app", "s3"]
}

variable "ttl" {
  type    = number
  default = 300
}