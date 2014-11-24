[![TravisCI](https://travis-ci.org/garystafford/meanestimator.svg?branch=master)](https://travis-ci.org/garystafford/meanestimator)&nbsp;&nbsp;
[![David Dependencies](https://david-dm.org/garystafford/meanestimator.png)](https://david-dm.org/garystafford/meanestimator)&nbsp;&nbsp;
[![David Dev Dependencies](https://david-dm.org/garystafford/meanestimator/dev-status.png)](https://david-dm.org/garystafford/meanestimator#info=devDependencies)&nbsp;&nbsp;
[![Gitter](https://badges.gitter.im/Join Chat.svg)](https://gitter.im/garystafford/meanestimator?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)&nbsp;&nbsp;

[![Codeship](https://codeship.com/projects/ffb358c0-4ab8-0132-efcb-7aa9472b8ea5/status)](https://codeship.com/projects/46419)

## MEAN Estimator

This project is built using MEAN.JS - Full-Stack JavaScript Using MongoDB, Express, AngularJS, and Node.js. 
From Creators of MEAN.IO (<http://www.meanjs.org>). Sample MEAN application for estimating the cost and resources
required to add application platforms and infrastructure in development and test software environments. 
Collect and report on time and cost estimates from multiple resource groups.

* Project source code and architecture originally based on the MEAN.JS project on GitHub (<http://www.github.com/meanjs>)
* Docker and fig configuration originally based on post on GiantSwarm Blog (<http://blog.giantswarm.io/getting-started-with-docker-and-meanjs>)
* Contains (3) modules: core, estimates, and modules
* Data for Applications, Environments, Estimate Types, and Resources are all read from json configuration file
* Can be built locally (npm, bower, grunt) or now with fig (<http://www.fig.sh>) and docker (<http://www.docker.com>)
* Run in browser at `http://localhost:3111`

**View Estimates**  
List all estimates. Click on an estimate in the list to view the estimate details.  
RESTful endpoint (GET): `http://localhost:3111/estimates`

**View Estimate Details**  
Click on an estimate in the list of estimates to view the estimate details.  
RESTful enpoint (GET): `http://localhost:3111/estimates/<estimate_id>`

**New Estimate**  
Add a new estimate.  
RESTful endpoint (POST): `http://localhost:3111/estimates`

**Update an Estimate**  
Update an existing estimate. Access from the list of estimates.  
RESTful endpoint (PUT): `http://localhost:3111/estimates/<estimate_id>`

**Delete an Estimate**  
Update an existing estimate. Access from the list of estimates.  
RESTful endpoint (DELETE): `http://localhost:3111/estimates/54716703da107e3500c083a5`

**View Reports** _Coming Soon_  
View estimate summary reports coming soon. Service working.  
RESTful endpoint:  
`http://localhost:3111/reporting/resources`
`http://localhost:3111/reporting/infrastructure`

###Code Details

Optional environment variables (defaults if not set, below)
```
echo 'export NODE_PORT=3111' >> ~/.bashrc
echo 'export NODE_ENV=development' >> ~/.bashrc
echo 'export ENV_FORM_DATA=../../app/data/formData.json' >> ~/.bashrc
. ~/.bashrc
```

Run locally
```
npm install
bower install
grunt
node server # alternate method
```

Build and run with fig and Docker
```
docker pull dockerfile/nodejs
docker pull mongo
fig build
fig up
fig ps # check your containers
```

###Preview
![Main Page - Desktop](https://github.com/garystafford/meanestimator/blob/master/images/main_page.png?raw=true)

![Signup Page - Mobile](https://github.com/garystafford/meanestimator/blob/master/images/signup_mobile.png?raw=true)

![Main Page - Mobile](https://github.com/garystafford/meanestimator/blob/master/images/main_page_mobile.png?raw=true)

![Estimate Detail Page - Mobile](https://github.com/garystafford/meanestimator/blob/master/images/estimate_detail_mobile.png?raw=true)

![Estimate Edit Page - Mobile](https://github.com/garystafford/meanestimator/blob/master/images/edit_estimate_mobile.png?raw=true)
