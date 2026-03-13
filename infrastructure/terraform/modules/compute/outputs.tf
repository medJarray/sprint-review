# terraform/modules/compute/outputs.tf

output "server_id" {
  description = "Server ID"
  value       = hcloud_server.k3s_node.id
}

output "server_name" {
  description = "Server name"
  value       = hcloud_server.k3s_node.name
}

output "ipv4_address" {
  description = "Public IPv4 address"
  value       = hcloud_server.k3s_node.ipv4_address
}

output "ipv6_address" {
  description = "Public IPv6 address"
  value       = hcloud_server.k3s_node.ipv6_address
}

output "ipv6_network" {
  description = "IPv6 /64 network"
  value       = hcloud_server.k3s_node.ipv6_network
}

output "status" {
  description = "Server status"
  value       = hcloud_server.k3s_node.status
}