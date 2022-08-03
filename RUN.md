1.a For Mac OS

```
chmod 755 ./DB.sh
```

1.b For Windows OS d


2. RUN docker services

```
docker-compose up -d || docker-compose -f docker-compose-windows.yml up -d
```

Warning!

If it's first time running docker-compose uncomment KEYCLOAK_USER, KEYCLOAK_PASSWORD
Otherwise, run with commenting KEYCLOAK_USER, KEYCLOAK_PASSWORD