# TTL App

## Dev compose

Start de ontwikkelomgeving:

```bash
docker-compose -f compose.dev.yml up --build -d
```

Stoppen:

```bash
docker-compose -f compose.dev.yml down
```

Troubleshooting:

- Bekijk logs met `docker-compose logs -f <service>`.
- Zorg dat poorten 5173, 5432 en 8080 vrij zijn; er is geen host-poort 3000.
- Herbouw alles met `docker-compose -f compose.dev.yml down -v`.

Healthcheck controleren:

```bash
curl http://localhost:5173/api/health
```

Verwacht HTTP 200.
