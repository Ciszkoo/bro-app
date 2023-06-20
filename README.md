## Wymagania

- npm
- sbt 1.9.0
- scala 2.13.11

## Uruchomienie

- uruchamiamy serwisy (może być potrzebne uruchomienie ponowne żeby postgres uporządkował dane z wolumenu):

```
docker compose up  
```

- znajdując się w folderze bro-backend uruchamiamy server:

```
sbt run
```

- znajdując się w folderze bro-frontend instalujemy zależności i uruchamiamy klienta:

```
npm install
npm run dev
```

Aplikacja powinna być dostępna pod adresem http://localhost:5173

## Konta

### Konto administratora keycloak
- login: admin
- hasło: admin

### Konta w aplikacji
Konto zwykłego użytkownika:
- login: myuser
- hasło: password

Konto administratora:
- login: adminuser
- hasło: secret
