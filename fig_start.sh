# remove all exited containers
docker rm -f $(docker ps --filter 'status=Exited' -a) 

# remove all <none> images
docker rmi $(docker images | grep "^<none>" | awk "{print $3}") 

#fig
fig build && fig up
