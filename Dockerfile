FROM postgres:15-bullseye
LABEL name="benkyo_postgres"

ENV POSTGRES_USER postgres
ENV POSTGRES_PASSWORD postgres

EXPOSE 5432
