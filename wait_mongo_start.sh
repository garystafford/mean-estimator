#!/bin/sh

# Start up script from inside web_1 (node) container
# Gary A. Stafford
# https://github.com/garystafford

# great reference:
# https://blog.codecentric.de/en/2014/01/docker-networking-made-simple-3-ways-connect-lxc-containers/

echo "wait for mongo to start first..."

# optional, view meanestimator_db_1 container-related env vars
#env | grep DB_1 | sort

# wait until mongo is running in meanestimator_db_1 container
until nc -zvv $DB_1_PORT_27195_TCP_ADDR $DB_1_PORT_27195_TCP_PORT > /dev/null 2>&1
do
    echo "waiting for 3 seconds..."
    sleep 3
done

# start node app
node server