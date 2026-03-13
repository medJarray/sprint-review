# terraform/modules/network/outputs.tf

output "firewall_id" {
  value = hcloud_firewall.k3s.id
}

output "firewall_name" {
  value = hcloud_firewall.k3s.name
}

output "network_id" {
  value = var.enable_private_network ? hcloud_network.private[0].id : ""
}

output "subnet_id" {
  value = var.enable_private_network ? hcloud_network_subnet.k3s[0].id : ""
}