#!/bin/bash
set -e

echo "Starting replica setup..."

# environment
PRIMARY_HOST=${PRIMARY_HOST:-primary}
PRIMARY_PORT=${PRIMARY_PORT:-5432}
REPLICA_USER=${REPLICA_USER:-replicator}
REPLICA_PASSWORD=${REPLICA_PASSWORD:-replica_pass}
DATA_DIR="/var/lib/postgresql/data"

# wait for primary
until pg_isready -h "$PRIMARY_HOST" -p "$PRIMARY_PORT" -U postgres; do
  echo "Waiting for primary..."
  sleep 2
done

# If not already initialized
if [ ! -s "$DATA_DIR/PG_VERSION" ]; then
  echo "Cloning data from primary..."
  export PGPASSWORD=$REPLICA_PASSWORD
  pg_basebackup -h "$PRIMARY_HOST" -p "$PRIMARY_PORT" -U "$REPLICA_USER" -D "$DATA_DIR" -Fp -Xs -P
  touch "$DATA_DIR/standby.signal"

  echo "primary_conninfo = 'host=$PRIMARY_HOST port=$PRIMARY_PORT user=$REPLICA_USER password=$REPLICA_PASSWORD application_name=pg_replica'" >> "$DATA_DIR/postgresql.auto.conf"
  echo "hot_standby = on" >> "$DATA_DIR/postgresql.conf"
fi

echo "Starting PostgreSQL replica..."
exec docker-entrypoint.sh postgres
