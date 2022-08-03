#!/bin/bash
set -e

psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" <<-EOSQL
    CREATE DATABASE keycloak;
    GRANT ALL PRIVILEGES ON DATABASE keycloak TO postgres;
    CREATE DATABASE alumni_db;
    GRANT ALL PRIVILEGES ON DATABASE alumni_db TO postgres;
EOSQL