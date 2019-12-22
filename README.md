# VRTestApp

Testing Repo for VR

Note that this (actual production VR app) is published at: http://nicostepan.me/VRTestApp/Hello360

## TODOs
- https://developer.oculus.com/documentation/oculus-browser/latest/concepts/browser-intro/
- https://facebook.github.io/react-360/docs/setup.html (React 360)

To build: https://facebook.github.io/react-360/docs/publish.html

v easy. note that the `index.html` file for prod is modified and the extra files added are `client.bundle.js` and `index.bundle.js`. So it's essential that a copy of the dev `index.html` is made and saved somewhere (either locally or in a test sort of directory).

github acts as the server (which is sweet). however we'll need a separate url to route from nicostepan.me/.... to whatever we should call this app. 

TODOs with this:
- look into adding a `client/` and `server/` directory to put the different files in as https://facebook.github.io/react-360/docs/publish.html suggests to put the build files from the `build` directory in a server directory. 




