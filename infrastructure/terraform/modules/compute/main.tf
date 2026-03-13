# terraform/modules/compute/main.tf

terraform {
  required_providers {
    hcloud = {
      source  = "hetznercloud/hcloud"
      version = "~> 1.45"
    }
  }
}

# SSH Key
resource "hcloud_ssh_key" "default" {
  name       = "${var.environment}-${var.ssh_public_key_name}"
  public_key = var.ssh_public_key
}

# VPS Server
resource "hcloud_server" "k3s_node" {
  name        = "k3s-${var.environment}-01"
  server_type = var.server_type
  location    = var.location
  image       = var.image

  ssh_keys = [hcloud_ssh_key.default.id]

  firewall_ids = [var.firewall_id]

  user_data = templatefile("${path.module}/../../files/cloud-init.yml.tpl", {
    deploy_user    = var.deploy_user
    ssh_public_key = var.ssh_public_key
    environment    = var.environment
  })

  public_net {
    ipv4_enabled = true
    ipv6_enabled = true      # ← IPv6 dual-stack
  }

  labels = merge(var.labels, {
    environment = var.environment
    role        = "k3s-server"
    managed_by  = "terraform"
  })

  lifecycle {
    ignore_changes = [
      user_data,    # Ne pas recréer si cloud-init change
      ssh_keys,     # Géré par Ansible après le bootstrap
    ]
  }
}