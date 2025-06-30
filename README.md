# weathernow

## Backend

### Install python libs for Backend

```
python -m venv .venv

source .venv/bin/activate

pip install -r requirements.txt
 ```

### Run server
```
uvicorn app.main:app --reload
```

### Alembic

create new migration:
```
alembic revision --autogenerate -m "Initial migration"
```

run migration:
```
alembic upgrade head
```


## Docker

run mysql by Dockerfile:
```
docker build -t my-mysql -f Dockerfile.mysql .
docker images | grep my-mysql
docker run -d --name mysql-container -p 3306:3306 my-mysql

```

## Openweather API

Registered in https://home.openweathermap.org/ and get Api key for .env OPENWEATHER_API_KEY


### Swagger Weather API

```
http://127.0.0.1:8000/docs
```

## Frontend

Run frontend:
```
npm run dev
```

## Run all via docker-compose

```
docker-compose up --build
```

## Accepting connections at http://localhost:3000