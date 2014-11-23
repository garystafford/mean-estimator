#######################################################################
# Build and run 'meanestimator' project
# within (2) Docker containers: web and db, using fig
# Code for Docker/fig based on:
# http://blog.giantswarm.io/getting-started-with-docker-and-meanjs
#######################################################################

FROM dockerfile/nodejs

MAINTAINER Matthias Luebken, matthias@catalyst-zero.com

WORKDIR /home/meanestimator

# Install meanestimator Prerequisites
RUN npm install -g grunt-cli bower

# Install meanestimator packages
ADD package.json /home/meanestimator/package.json
RUN npm install

# Manually trigger bower. Why doesn't this work via npm install?
ADD .bowerrc /home/meanestimator/.bowerrc
ADD bower.json /home/meanestimator/bower.json
RUN bower install --config.interactive=false --allow-root

# Make everything available for start
ADD . /home/meanestimator

# currently only works for development
ENV NODE_ENV development

# Port 3111 for server
# Port 35729 for livereload
EXPOSE 3111 35729
CMD ["grunt"]

