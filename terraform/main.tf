terraform {
  cloud {
    organization = "t5mm"

    workspaces {
      tags = ["workspace"]
    }
  }
}