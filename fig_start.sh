#!/bin/sh

# Clean up / start up script
# Gary A. Stafford
# https://github.com/garystafford

# remove all exited containers
echo "Removing all 'Exited' containers..."
docker rm -f $(docker ps --filter 'status=Exited' -a) > /dev/null 2>&1

# remove all <none> images
echo "Removing all untagged images..."
docker rmi $(docker images | grep "^<none>" | awk "{print $3}") > /dev/null 2>&1

# Build and start containers with fig
fig build && fig up
