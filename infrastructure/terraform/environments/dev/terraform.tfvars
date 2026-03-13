# terraform/environments/dev/terraform.tfvars

environment         = "dev"
location            = "nbg1"
server_type         = "cx33"          # Dev : 4 vCPU / 8 GB — ~€7.49/mois
image               = "ubuntu-24.04"
ssh_public_key_name = "deploy-key"
mongodb_volume_size = 10                # Dev : 10 GB suffisent
minio_volume_size   = 20                # Dev : 20 GB suffisent
admin_ipv4          = "138.21.148.227"  # "88.161.145.83" # Ton IP publique
admin_ipv6          = ""                # Optionnel
ssh_private_key_path = "~/.ssh/hetzner_cloud"