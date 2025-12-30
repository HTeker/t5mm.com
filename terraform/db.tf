resource "google_sql_database_instance" "db" {
  name             = "${local.host_key}-db"
  database_version = "POSTGRES_17"
  region           = var.region

  settings {
	edition = "ENTERPRISE"
    tier = var.db_instance_tier

	disk_size           = 10
	disk_type           = "PD_SSD"

    ip_configuration {
      ipv4_enabled    = true
	  ssl_mode = "ENCRYPTED_ONLY"
    }

    backup_configuration {
      enabled = local.is_prod
	  start_time                  = "02:00"
  	  location                    = var.region
	  point_in_time_recovery_enabled = local.is_prod
	  transaction_log_retention_days = 7
	  backup_retention_settings {
		retained_backups          = 7
		retention_unit            = "COUNT"
	  }
    }

	activation_policy = "ALWAYS"
  }
}

resource "google_sql_database" "default" {
  name     = var.db_name
  instance = google_sql_database_instance.db.name
}

resource "google_sql_user" "db_user" {
  name     = var.db_user
  instance = google_sql_database_instance.db.name
  password_wo = var.db_password

  lifecycle {
    ignore_changes = []
  }
}