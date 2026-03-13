# terraform/environments/prod/terraform.tfvars

environment         = "prod"
location            = "fsn1"
server_type         = "cx33"          # Prod : 4 vCPU / 8 GB — €6.59/mois
image               = "ubuntu-24.04"
ssh_public_key_name = "deploy-key"
mongodb_volume_size = 20              # Prod : 20 GB
minio_volume_size   = 50              # Prod : 50 GB
admin_ipv4          = "YOUR_IPV4"
admin_ipv6          = "YOUR_IPV6"
ssh_private_key_path = "~/.ssh/id_ed25519"