FROM jhj967878/backend:django
WORKDIR /project/server

ENV DOCKERIZE_VERSION v0.6.1

ENTRYPOINT ["dockerize", "-wait", "tcp://database:3306", "-timeout", "20s"]

CMD ./start.sh