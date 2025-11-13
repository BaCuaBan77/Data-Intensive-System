#!/bin/bash
set -e

# This script runs after Postgres has initialized its data directory.

echo "host replication all 0.0.0.0/0 trust" >> "$PGDATA/pg_hba.conf"
echo "listen_addresses = '*'" >> "$PGDATA/postgresql.conf"
