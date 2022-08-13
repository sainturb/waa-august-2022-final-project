#For Mac OS or Linux

```
chmod 755 ./DB.sh
sudo -- sh -c "echo 127.0.0.1 kubernetes.docker.internal >> /etc/hosts"
```

#For Windows OS

- For windows some mount folder or files dir may require update

```
- Window + R
notepad c:\windows\system32\drivers\etc\hosts

- add following line
127.0.0.1 kubernetes.docker.internal
```


#RUN all docker services

```
docker-compose up -d
```

#RUN on local
```
docker-compose -f docker-compose-double-db.yml up -d

cd /backend && ./mvnw package && ./mvnw spring-boot:run

cd /frontend && npm install && npm run start
```

##Warning!

If it's first time running docker-compose uncomment KEYCLOAK_USER, KEYCLOAK_PASSWORD
Otherwise, run with commenting KEYCLOAK_USER, KEYCLOAK_PASSWORD