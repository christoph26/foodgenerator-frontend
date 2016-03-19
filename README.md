# angular-movies
Movies example application based on AngularJS. Backend can be found [here](https://github.com/treschenhofer/moviebass)

## prerequisites

(for the front end)

* bower [official website]() [SEBA wiki link]()
* gulp [official website]() [SEBA wiki link]()

(both for the front end and the back end)

* nodejs [official website]() [SEBA wiki link]()
* npm [official website]() [SEBA wiki link]()



## setup (before first run)

* install dependencies `npm install && bower install`

## running

* execute gulp tasks (and keep watching for further changes) `gulp watch`
* optional: start built in web server `node node_modules/http-server/bin/http-server` (you can also run the project using your own installation of e.g. XAMPP on windows or even locally). The root folder will be public/

##  directory structure

and important files

```javascript
app/                //your app
-- ng/              // your angular app (js-files and html-templates)
---- components/    // your components (services, directives etc.)
---- views/         // your views. each view has it's own url
-- sass/            //all scss files and libraries
---- screen.scss    // your main scss file. this sould be the only non-partial file
bower_components/   // bower components
node_modules/       // npm modules
public/             // this is the root of your (public) website. Do not put stuff there that is not intended for the client
-- index.html       // entry point of the application. **There's only one html page in your application**
-- js/              // your js files
---- app.js         // your (minified and sourcemapped) angular app. Created from the files in your app/ firectory by gulp
---- templates.js   // your angular templates. Created by gulp
-- cs/              // css files. created from your sass sources
-- img/             // images
-- libs             // third party libs
gulpfile.js         // gulp task specifications
package.json        // npm dependencies information
bower.json          // bower dependencies information
```