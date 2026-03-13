# terraform/modules/dns/main.tf

# ⚠️ Nécessite que le domaine soit géré par Hetzner DNS
# Si ton domaine est chez un autre registrar, configure les records manuellement
# ou utilise un provider DNS approprié (cloudflare, route53, etc.)

data "hcloud_dns_zone" "main" {
  name = var.domain
}

# A records (IPv4) pour chaque sous-domaine
resource "hcloud_dns_record" "a_records" {
  for_each = toset(var.subdomains)

  zone_id = data.hcloud_dns_zone.main.id
  name    = each.value
  type    = "A"
  value   = var.ipv4_address
  ttl     = var.ttl
}

# AAAA records (IPv6) pour chaque sous-domaine
resource "hcloud_dns_record" "aaaa_records" {
  for_each = toset(var.subdomains)

  zone_id = data.hcloud_dns_zone.main.id
  name    = each.value
  type    = "AAAA"
  value   = var.ipv6_address
  ttl     = var.ttl
}