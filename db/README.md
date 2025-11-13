# PostgreSQL Database Replication Setup

A Docker-based PostgreSQL database replication system with primary, shard, and replica databases. This project demonstrates a chess game application database architecture with streaming replication.

## Architecture

The project consists of three PostgreSQL databases:

- **Primary Database** (Port 5433): Main database with replication role configured
- **Shard Database** (Port 5435): Separate sharded database with different data
- **Replica Database** (Port 5434): Read-only replica that replicates from the primary database

## Project Structure

```
.
├── compose.yaml              # Docker Compose configuration
├── Dockerfile.replica        # Custom Dockerfile for replica database
├── setup-replica.sh          # Replica initialization script
├── primary-config.sh         # Primary database configuration script
├── init/
│   ├── primary-init.sql      # Primary database schema and data
│   ├── primary-config.sh     # Primary replication configuration
│   └── shard-init.sql        # Shard database schema and data
└── README.md                 # This file
```

## Database Schema

The database includes the following tables:

- **users**: Player accounts with ratings, match statistics, and currency balances
- **currencies**: Available in-game currencies
- **matches**: Chess game matches with moves, results, and ratings
- **shops**: Chess item shops
- **categories**: Item categories
- **items**: Purchasable chess items
- **transactions**: Purchase transactions

## Prerequisites

- Docker
- Docker Compose

## Setup Instructions

1. **Clone the repository** (if applicable):
   ```bash
   git clone <repository-url>
   cd "Data-intensive System/Final Project"
   ```

2. **Start the databases**:
   ```bash
   docker compose up -d
   ```

3. **Verify the services are running**:
   ```bash
   docker ps
   ```

## Database Connections

### Primary Database
- **Host**: localhost
- **Port**: 5433
- **User**: postgres
- **Password**: primary_pass
- **Database**: postgres

```bash
psql -h localhost -p 5433 -U postgres -d postgres
```

### Shard Database
- **Host**: localhost
- **Port**: 5435
- **User**: postgres
- **Password**: shard_pass
- **Database**: postgres

```bash
psql -h localhost -p 5435 -U postgres -d postgres
```

### Replica Database
- **Host**: localhost
- **Port**: 5434
- **User**: postgres
- **Password**: (same as primary)
- **Database**: postgres

```bash
psql -h localhost -p 5434 -U postgres -d postgres
```

## Replication Configuration

The replica database is configured to stream data from the primary database using PostgreSQL's physical replication:

1. **Replication Role**: Created in primary database with username `replicator` and password `replica_pass`
2. **Replication Method**: Uses `pg_basebackup` for initial data cloning
3. **Streaming Replication**: Configured via `primary_conninfo` in `postgresql.auto.conf`
4. **Hot Standby**: Enabled for read-only queries on replica

## Data

### Primary Database
- 30 users with chess player profiles
- 2 currencies (Gold Coins, Silver Pieces)
- 2 shops (Elite Chess Store, Classic Chess Shop)
- 30 categories
- 30 matches
- 30 items
- 30 transactions

### Shard Database
- 30 different users
- 2 currencies (same as primary: Gold Coins, Silver Pieces)
- 2 shops (same as primary: Elite Chess Store, Classic Chess Shop)
- 30 different categories
- 30 different matches
- 30 different items
- 30 different transactions

## Verification

### Check Replication Status

Connect to the replica database and check replication status:

```sql
SELECT * FROM pg_stat_replication;
```

### Verify Data

Check that data exists in primary:

```sql
SELECT COUNT(*) FROM users;
SELECT COUNT(*) FROM matches;
SELECT COUNT(*) FROM transactions;
```

Check that replica has the same data (read-only):

```sql
SELECT COUNT(*) FROM users;
SELECT COUNT(*) FROM matches;
SELECT COUNT(*) FROM transactions;
```

## Stopping the Services

```bash
docker compose down
```

To remove volumes (this will delete all data):

```bash
docker compose down -v
```

## Troubleshooting

### Replica not replicating

1. Check if primary is accessible:
   ```bash
   docker exec -it pg_primary pg_isready
   ```

2. Check replica logs:
   ```bash
   docker logs pg_replica
   ```

3. Verify replication role exists:
   ```bash
   docker exec -it pg_primary psql -U postgres -c "\du"
   ```

### Connection Issues

- Ensure ports 5433, 5434, and 5435 are not in use
- Check firewall settings
- Verify Docker network connectivity: `docker network ls`

## Security Notes

⚠️ **Warning**: This setup uses default passwords and is intended for development/testing purposes only. For production:

- Change all default passwords
- Use environment variables or secrets management
- Configure proper authentication (pg_hba.conf)
- Enable SSL/TLS connections
- Restrict network access

## License

This project is for educational purposes.

## Author

Long Le - Long.n.le@student.lut.fi
