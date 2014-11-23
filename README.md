<div class="page-header">
<p>
<a href='https://travis-ci.org/garystafford/meanestimator'><img src='https://travis-ci.org/garystafford/meanestimator.svg?branch=master'></a>
&nbsp;&nbsp;
<a href='https://david-dm.org/garystafford/meanestimator'><img src='https://david-dm.org/garystafford/meanestimator.png'></a>
&nbsp;&nbsp;
<a href='https://david-dm.org/garystafford/meanestimator#info=devDependencies'><img src='https://david-dm.org/garystafford/meanestimator/dev-status.png'></a>
&nbsp;&nbsp;
<a href='https://codeship.com/projects/46419'><img src='https://codeship.com/projects/ffb358c0-4ab8-0132-efcb-7aa9472b8ea5/status'></a>
</p>
<h2>MEAN Estimator</h2>
</div>
<p>
  This project is built using MEAN.JS - Full-Stack JavaScript Using MongoDB, Express, AngularJS, and Node.js
  From Creators of MEAN.IO (meanjs.org)
</p>
<p>
  Sample MEAN application for estimating the cost and resources required to add application platforms and
  infrastructure in development and test software environments. Collect and report on time and cost estimates
  from multiple resource groups.
  <ul>
    <li>
      Project source code and architecture originally based on the MEAN.JS project on GitHub
      (github.com/meanjs)
    </li>
    <li>
      Contains (3) modules: core, estimates, and modules
    </li>
    <li>
      Data for Applications, Environments, Estimate Types, and Resources are all read from json configuration file
    </li>
    <li>
      Can be built locally (npm, bower, grunt) or now with fig (fig.sh) and docker (docker.com)
    </li>
    <li>
      Run in browser at http://localhost:3111
    </li>
    </ul>
</p>
<dl>
  <dt><strong>View Estimates</strong></dt>
  <dd>
    List all estimates. Click on an estimate in list to view the estimate details.
    <br>
  </dd>
  <dt><strong>View Estimate Details</strong></dt>
  <dd>
    Click on an estimate in list of estimates to view the estimate details.
    <br>
  </dd>
  <dt><strong>New Estimate</strong></dt>
  <dd>
    Add a new estimate.
    <br>
  </dd>
  <dt><strong>Update an Estimate</strong></dt>
  <dd>
    Update an existing estimate. Access from the list of estimates.
    <br>
  </dd>
  <dt><strong>View Reports</strong> <i>Coming Soon</i></dt>
  <dd>
    View estimate summary reports.
  </dd>
</dl>
<strong>Code details</strong>
<p>
  Optional environment variables (defaults if not set, below):<br/>
  <pre><code>echo 'export NODE_PORT=3111' >> ~/.bashrc
  echo 'export NODE_ENV=development' >> ~/.bashrc
  echo 'export ENV_FORM_DATA=../../app/data/formData.json' >> ~/.bashrc
  . ~/.bashrc</code></pre>
</p>
<p> To run locally:<br/>
  <pre><code>npm install
  bower install
  grunt
  node server # alternate method</code></pre>
</p>
<p>
  To run with fig and Docker:<br />
  <pre><code>docker pull dockerfile/nodejs
  docker pull mongo
  fig build
  fig up
  fig ps # check your containers</code></pre>
</p>
<br>
<img src="https://github.com/garystafford/meanestimator/blob/master/images/main_page.png?raw=true" alt="Main Page - Desktop">
<br>
<img src="https://github.com/garystafford/meanestimator/blob/master/images/signup_mobile.png?raw=true" alt="Signup Page - Mobile">
<br>
<img src="https://github.com/garystafford/meanestimator/blob/master/images/main_page_mobile.png?raw=true" alt="Main Page - Mobile">
<br>
<img src="https://github.com/garystafford/meanestimator/blob/master/images/estimate_detail_mobile.png?raw=true" alt="Estimate Detail Page - Mobile">
<br>
<img src="https://github.com/garystafford/meanestimator/blob/master/images/edit_estimate_mobile.png?raw=true" alt="Estimate Edit Page - Mobile">
