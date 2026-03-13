# terraform/modules/storage/variables.tf

variable "environment" {
  type = string
}

variable "location" {
  type    = string
  default = "fsn1"
}

variable "server_id" {
  description = "Server ID to attach volumes"
  type        = string
}

variable "mongodb_volume_size" {
  description = "MongoDB volume size in GB"
  type        = number
  default     = 20
}

variable "minio_volume_size" {
  description = "MinIO volume size in GB"
  type        = number
  default     = 50
}