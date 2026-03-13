# terraform/modules/storage/main.tf

terraform {
  required_providers {
    hcloud = {
      source  = "hetznercloud/hcloud"
      version = "~> 1.45"
    }
  }
}

# ──────────────────────────────────────────
# Block Storage Volumes
# ──────────────────────────────────────────

resource "hcloud_volume" "mongodb" {
  name      = "k3s-${var.environment}-mongodb"
  size      = var.mongodb_volume_size
  location  = var.location
  format    = "ext4"

  labels = {
    environment = var.environment
    service     = "mongodb"
    managed_by  = "terraform"
  }

  # ⚠️ IMPORTANT : ne pas supprimer le volume si le Terraform est détruit
  lifecycle {
    prevent_destroy = true
  }
}

resource "hcloud_volume" "minio" {
  name      = "k3s-${var.environment}-minio"
  size      = var.minio_volume_size
  location  = var.location
  format    = "ext4"

  labels = {
    environment = var.environment
    service     = "minio"
    managed_by  = "terraform"
  }

  lifecycle {
    prevent_destroy = true
  }
}

# ──────────────────────────────────────────
# Volume Attachments
# ──────────────────────────────────────────

resource "hcloud_volume_attachment" "mongodb" {
  volume_id = hcloud_volume.mongodb.id
  server_id = var.server_id
  automount = false    # Géré par le CSI Driver K8s
}

resource "hcloud_volume_attachment" "minio" {
  volume_id = hcloud_volume.minio.id
  server_id = var.server_id
  automount = false
}