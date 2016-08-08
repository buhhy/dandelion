# Get Started

Just install Docker and run `./command/start-dev.sh`, and you should have an operational development environment.

# Sysadmin Guide

Run `./command/deploy.sh` to push to Docker Hub and ec2-user@terencelei.com. The first time you do this, you'll need to create a Docker Hub account that I can add to the Sheepie organization, and then `docker login`.

## Exposed ports

| Port | Description |
| --- | --- |
| 3000 | Client |
| 3001 | Server (1) |
| 3002 | Postgres |

(1) Server is used by client for GraphQL queries. Relay by default assumes that this will be at /graphql on the same host, so configuration should look as follows:

| External path | Internal port | Internal path |
| --- | --- | --- |
| / | 3000 | / |
| /graphql | 3001 | / |
