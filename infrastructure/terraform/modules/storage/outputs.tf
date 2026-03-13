# terraform/modules/storage/outputs.tf

output "mongodb_volume_id" {
  value = hcloud_volume.mongodb.id
}

output "mongodb_volume_size" {
  value = hcloud_volume.mongodb.size
}

output "minio_volume_id" {
  value = hcloud_volume.minio.id
}

output "minio_volume_size" {
  value = hcloud_volume.minio.size
}