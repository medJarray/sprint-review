# terraform/modules/network/main.tf

terraform {
  required_providers {
    hcloud = {
      source  = "hetznercloud/hcloud"
      version = "~> 1.45"
    }
  }
}

# ──────────────────────────────────────────
# Firewall
# ──────────────────────────────────────────

resource "hcloud_firewall" "k3s" {
  name = "k3s-${var.environment}-fw"

  labels = {
    environment = var.environment
    managed_by  = "terraform"
  }

  # ─── SSH (IPv4) ───
  rule {
    direction  = "in"
    protocol   = "tcp"
    port       = "22"
    source_ips = ["${var.admin_ipv4}/32"]
    description = "SSH admin IPv4"
  }

  # ─── SSH (IPv6) ───
  dynamic "rule" {
    for_each = var.admin_ipv6 != "" ? [1] : []
    content {
      direction  = "in"
      protocol   = "tcp"
      port       = "22"
      source_ips = ["${var.admin_ipv6}/128"]
      description = "SSH admin IPv6"
    }
  }

  # ─── HTTP (IPv4 + IPv6) ───
  rule {
    direction  = "in"
    protocol   = "tcp"
    port       = "80"
    source_ips = ["0.0.0.0/0", "::/0"]
    description = "HTTP"
  }

  # ─── HTTPS (IPv4 + IPv6) ───
  rule {
    direction  = "in"
    protocol   = "tcp"
    port       = "443"
    source_ips = ["0.0.0.0/0", "::/0"]
    description = "HTTPS"
  }

  # ─── K3s API (IPv4 admin only) ───
  rule {
    direction  = "in"
    protocol   = "tcp"
    port       = "6443"
    source_ips = ["${var.admin_ipv4}/32"]
    description = "K3s API Server admin IPv4"
  }

  # ─── K3s API (IPv6 admin only) ───
  dynamic "rule" {
    for_each = var.admin_ipv6 != "" ? [1] : []
    content {
      direction  = "in"
      protocol   = "tcp"
      port       = "6443"
      source_ips = ["${var.admin_ipv6}/128"]
      description = "K3s API Server admin IPv6"
    }
  }

  # ─── ICMP Ping (IPv4 + IPv6) ───
  rule {
    direction  = "in"
    protocol   = "icmp"
    source_ips = ["0.0.0.0/0", "::/0"]
    description = "Ping"
  }
}

# ──────────────────────────────────────────
# Private Network (pour multi-node futur)
# ──────────────────────────────────────────

resource "hcloud_network" "private" {
  count    = var.enable_private_network ? 1 : 0
  name     = "k3s-${var.environment}-net"
  ip_range = var.private_network_cidr

  labels = {
    environment = var.environment
    managed_by  = "terraform"
  }
}

resource "hcloud_network_subnet" "k3s" {
  count        = var.enable_private_network ? 1 : 0
  network_id   = hcloud_network.private[0].id
  type         = "cloud"
  network_zone = "eu-central"
  ip_range     = var.private_subnet_cidr
}