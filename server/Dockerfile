FROM python:3.13-alpine3.21 AS build

WORKDIR /source

COPY Pipfile Pipfile.lock ./

RUN pip install --upgrade pip

RUN pip install pipenv 

RUN pipenv install --system --deploy

FROM python:3.13-alpine3.21 AS final

WORKDIR /source

COPY --from=build /source ./

COPY api ./
COPY scripts ./

RUN addgroup -g 1234 footeam-group && \
  adduser -D -u 1234 -G footeam-group footeam-user

USER footeam-user:footeam-group