# Ansible Architecture & File Breakdown

Ce document détaille l'architecture Ansible du projet Hetzner Cloud Kubernetes, le rôle de chaque fichier, dossier et package, et le lien avec Terraform.

---

## 1. Structure Générale Ansible

```
ansible/
├── ansible.cfg
├── inventories/
│   ├── dev/
│   │   └── group_vars/
│   │       └── all.yml
│   └── prod/
│       └── group_vars/
│           └── all.yml
├── playbooks/
│   ├── site.yml
│   ├── hardening.yml
│   └── upgrade.yml
└── roles/
    ├── common/
    ├── security/
    ├── k3s_server/
    ├── helm/
    ├── hetzner_ccm/
    └── hetzner_csi/
```

---

## 2. Fichiers Racine

- **ansible.cfg** : Configuration Ansible (chemins, plugins, etc.)
- **inventories/** : Définition des groupes d'hôtes (dev/prod), variables associées.
- **playbooks/** : Orchestration des tâches (setup, sécurité, upgrade).
- **roles/** : Modules réutilisables, chaque rôle gère un aspect (K3s, sécurité, etc.).

---

## 3. Inventories

- **dev/**, **prod/** : Environnements séparés.
  - **group_vars/all.yml** : Variables globales pour tous les hôtes du groupe.
  - **hosts.yml** (généré) : Liste des serveurs, IP, variables d'accès.

Lien avec Terraform :
- Terraform génère hosts.yml à partir des outputs (IP, hostname, etc.), assurant cohérence entre infra et configuration.

---

## 4. Playbooks

- **site.yml** : Playbook principal, orchestre tous les rôles (setup complet).
- **hardening.yml** : Applique uniquement les rôles de sécurité (fail2ban, auditd, etc.).
- **upgrade.yml** : Gère les mises à jour OS et K3s (rolling upgrade).

---

## 5. Rôles

### 5.1 common/
- **defaults/main.yml** : Variables par défaut (timezone, swap, etc.).
- **handlers/main.yml** : Actions à déclencher (restart services).
- **tasks/main.yml** : Tâches principales (packages, SSH, sysctl).
- **tasks/ssh.yml** : Configuration SSH (root login, pubkey, etc.).
- **tasks/sysctl.yml** : Tuning kernel (sysctl).
- **templates/sshd_config.j2** : Template du fichier SSHD.

### 5.2 security/
- **tasks/auditd.yml** : Installation et configuration d'auditd.
- **tasks/fail2ban.yml** : Installation et configuration de fail2ban.
- **tasks/unattended-upgrades.yml** : Mises à jour automatiques.
- **tasks/main.yml** : Sécurité générale.

### 5.3 k3s_server/
- **defaults/main.yml** : Variables K3s (version, options).
- **tasks/install.yml** : Installation K3s.
- **tasks/kubeconfig.yml** : Gestion du kubeconfig.
- **tasks/main.yml** : Orchestration du rôle.

### 5.4 helm/
- **tasks/main.yml** : Installation de Helm.

### 5.5 hetzner_ccm/
- **tasks/main.yml** : Installation du Cloud Controller Manager.

### 5.6 hetzner_csi/
- **tasks/main.yml** : Installation du CSI driver (stockage).

---

## 6. Templates

- **sshd_config.j2** : Template pour la configuration SSH, appliquée par le rôle common.

---

## 7. Lien Ansible ↔ Terraform

- Terraform provisionne l'infrastructure (VPS, volumes, réseau).
- Génère hosts.yml (inventaire Ansible) avec IP, hostname, etc.
- Ansible utilise cet inventaire pour configurer les serveurs provisionnés.
- cloud-init (template Terraform) crée l'utilisateur deploy et injecte la clé SSH.
- Ansible se connecte en SSH (deploy) pour appliquer les rôles.

---

## 8. Packages et Sécurité

- **fail2ban** : Protection brute-force SSH.
- **auditd** : Audit des accès et modifications.
- **unattended-upgrades** : Patchs sécurité automatiques.
- **sysctl** : Tuning kernel.
- **Helm** : Gestionnaire de packages Kubernetes.
- **Hetzner CCM/CSI** : Intégration cloud (load balancer, stockage).

---

## 9. Workflow

1. Terraform crée l'infra et génère l'inventaire.
2. Ansible configure le serveur (OS, sécurité, K3s, Helm, Hetzner).
3. Sécurité renforcée (root login désactivé, pubkey only, fail2ban, auditd).
4. K3s prêt à l'emploi, Helm installé, stockage Hetzner provisionné.

---

## 10. Résumé

Chaque fichier/dossier Ansible a un rôle précis :
- **Inventaire** : Cible et variables.
- **Playbooks** : Orchestration.
- **Rôles** : Modules réutilisables.
- **Templates** : Configurations dynamiques.
- **Lien Terraform** : Provisionnement + génération inventaire.

Pour toute modification, adapter les rôles ou playbooks selon le besoin.
