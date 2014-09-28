Smartphone-App
==============

This repository contains the code for the smart phone application of the Leipzig University of Applied Sciences. The application is created with the following frameworks:

* [Apache Cordova (3.5.0)](http://cordova.apache.org/)
* [JQueryMobile](http://jquerymobile.com/) Custom Build (1.4.4) (see www/js/lib/customJQM.README)
* [Jquery](http://jquery.com/) (2.1.1)
* [FontAwesome](http://fortawesome.github.io/Font-Awesome/) (4.2.0)
* [WURFL.js](http://wurfl.io/)

Installation guide to Cordova: [Guide](http://cordova.apache.org/docs/en/3.5.0/guide_cli_index.md.html#The%20Command-Line%20Interface)

Platforms are excluded from this repo. If you want to compile the project in case of a specific platform, first install the platform SDK and then add the desired platform to the project by executing 'cordova platform add xxx'.

Available branches:
* master-old --> Old developement branch. Not used anymore.
* master --> Actual developement branch.
* presentation --> custom build to be shown on http://htwk-app.github.io
* pushnotification --> Added ability to get push notifications
