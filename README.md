# Mac Mini Homelab

My self-hosted homelab running on a 2018 Intel Mac mini with Debian, T2Linux, Docker and a monitoring-focused stack.

## Hardware

- Apple Mac mini 2018 (Macmini8,1)
- Intel Core i7-8700B
- 6 cores / 12 threads
- 16 GB DDR4-2666
- 256 GB internal NVMe SSD
- Ethernet

## Operating System

- Debian 13 (Trixie)
- T2Linux kernel
- Headless operation via SSH
- macOS recovery partition retained

## Platform

- Docker Engine
- Docker Compose
- Git

## Planned Services

### Management
- Arcane
- Homepage

### Monitoring
- Grafana
- Prometheus
- node_exporter
- cAdvisor
- SMART exporter
- Uptime Kuma
- Loki / Grafana Alloy

### Game Servers
- Crafty Controller
- Minecraft
- Terraria

### Infrastructure
- Tailscale
- Restic

## Goals

- Infrastructure and configuration tracked with Git
- Detailed host and container monitoring
- Historical metrics with Grafana and Prometheus
- Secure remote administration
- Automated backups
- No unnecessary public-facing administration ports

## Security

Secrets, credentials, environment files and backups are excluded from this public repository.

Never commit passwords, API tokens, private keys or other credentials.
