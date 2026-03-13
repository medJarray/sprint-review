#cloud-config
# Cloud-init : Bootstrap initial (exécuté UNE SEULE FOIS)
# Le reste est géré par Ansible

# Mise à jour système au premier boot
package_update: true
package_upgrade: true

# Paquets minimaux (le reste est installé par Ansible)
packages:
  - curl
  - wget
  - ca-certificates
  - gnupg
  - lsb-release
  - sudo

# Créer l'utilisateur deploy (non-root)
users:
  - default
  - name: ${deploy_user}
    groups: [sudo]
    shell: /bin/bash
    sudo: ['ALL=(ALL) NOPASSWD:ALL']
    lock_passwd: true
    ssh_authorized_keys:
      - ${ssh_public_key}

# Désactiver le login par password SSH
ssh_pwauth: false

# Désactiver le login root SSH
disable_root: true

runcmd:
  - echo "${environment}" > /etc/environment-name
  - touch /var/lib/cloud/instance/boot-finished