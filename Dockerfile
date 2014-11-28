#######################################################################
# Build and run 'mean-estimator' project
# within (2) Docker containers: web and db, using fig
# Code for Docker/fig based on:
# http://blog.giantswarm.io/getting-started-with-docker-and-meanjs
#######################################################################

FROM dockerfile/nodejs

MAINTAINER Matthias Luebken, matthias@catalyst-zero.com

WORKDIR /home/mean-estimator

# Install mean-estimator Prerequisites
RUN npm install -g grunt-cli bower

# Install mean-estimator packages
ADD package.json /home/mean-estimator/package.json
RUN npm install

# Manually trigger bower. Why doesn't this work via npm install?
ADD .bowerrc /home/mean-estimator/.bowerrc
ADD bower.json /home/mean-estimator/bower.json
RUN bower install --config.interactive=false --allow-root

# Make everything available for start
ADD . /home/mean-estimator

# currently only works for development
ENV NODE_ENV development

#RUN which node; node --version; which npm; npm --version
RUN mkdir -p /startup
ADD wait_mongo_start.sh /startup/wait_mongo_start.sh

# Port 3111 for server
# Port 35729 for livereload
EXPOSE 3111 35729

CMD /bin/sh /startup/wait_mongo_start.sh

