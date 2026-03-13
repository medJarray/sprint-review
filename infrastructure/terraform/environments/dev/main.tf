# terraform/environments/dev/main.tf

terraform {
  required_version = ">= 1.7.0"

  required_providers {
    hcloud = {
      source  = "hetznercloud/hcloud"
      version = "~> 1.45"
    }
    local = {
      source  = "hashicorp/local"
      version = "~> 2.5"
    }
  }

  # State stocké localement pour dev (ou S3-compatible pour prod)
  backend "local" {
    path = "terraform.tfstate"
  }
}

provider "hcloud" {
  token = var.hcloud_token
}

# ──────────────────────────────────────────
# Modules
# ──────────────────────────────────────────

module "network" {
  source = "../../modules/network"

  environment            = var.environment
  admin_ipv4             = var.admin_ipv4
  admin_ipv6             = var.admin_ipv6
  enable_private_network = false    # Single-node dev
}

module "compute" {
  source = "../../modules/compute"

  environment         = var.environment
  server_type         = var.server_type
  location            = var.location
  image               = var.image
  ssh_public_key      = var.ssh_public_key
  ssh_public_key_name = var.ssh_public_key_name
  firewall_id         = module.network.firewall_id

  labels = {
    project = "myapp"
  }

  depends_on = [module.network]
}

module "storage" {
  source = "../../modules/storage"

  environment         = var.environment
  location            = var.location
  server_id           = module.compute.server_id
  mongodb_volume_size = var.mongodb_volume_size
  minio_volume_size   = var.minio_volume_size

  depends_on = [module.compute]
}

# ──────────────────────────────────────────
# Génération automatique de l'inventaire Ansible
# ──────────────────────────────────────────

resource "local_file" "ansible_inventory" {
  filename = "${path.module}/../../../ansible/inventories/${var.environment}/hosts.yml"

  content = yamlencode({
    all = {
      hosts = {
        "k3s-${var.environment}-01" = {
          ansible_host           = module.compute.ipv4_address
          ansible_user           = "deploy"
          ansible_ssh_private_key_file = var.ssh_private_key_path
          ipv4_address           = module.compute.ipv4_address
          ipv6_address           = module.compute.ipv6_address
          ipv6_network           = module.compute.ipv6_network
          server_id              = module.compute.server_id
          mongodb_volume_id      = module.storage.mongodb_volume_id
          minio_volume_id        = module.storage.minio_volume_id
        }
      }
      children = {
        k3s_servers = {
          hosts = {
            "k3s-${var.environment}-01" = {}
          }
        }
      }
    }
  })

  file_permission = "0644"
}