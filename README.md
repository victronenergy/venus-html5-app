![screenshot](/victron-webapp-screenshot.png?raw=true)

# Venus OS hosted web app

The "app" is a single page application that communicates to the rest of Venus OS via MQTT over websockets.
It uses React with ES6 for the UI layer and also includes a wrapper service for the MQTT interface.

Its primary purpose is to be a simple to use and nice looking UI for a Victron system on
marine Multi Functional Displays, such as the ones from Garmin, Simrad and others. This
removes the need for a Victron panel at the helm: less clutter on the dashboard.

The secondary purpose is to help OEMs, boat builders and motorhome builders for example,
make their own custom UI.

## Getting started

### Initial setup

If it's the first time you run the app:

- make sure to have `node` & `npm` installed on your machine
- run `npm install` in the root folder

### Development

To run the app locally for development, run:

`npm run dev`

And then open the app in the browser at `http://localhost?host=<VENUS_IP>`.

This will start the webpack dev server, which will recompile the app on code changes and hot reload the UI.

You can to change the `host` (and optionally `port`) query parameters to point to your Venus device:

`path/to/venus-html5-app/dist/index.html?host=192.168.178.129&port=1884`

By default, the application starts with the `dev` flag enabled.
This adds some convenience features for debugging on actual devices and testing:

- "Reload page" button - refreshes the page
- "Browser info" button - links to page containing basic information about the browser in which the app is running

### Running the app with no Venus device available

If there is no real device to be used for MQTT data, you can run the app with a fake MQTT broker:

`npm run dev:mocked`
This shallowly fakes the MQTT implementation in the Venus device.

Also, keep in mind the Venus device also has a Demo mode, which allows you to get useful data if you have only the Venus device and no other Victron devices, without requiring various Victron devices to be connected to the Venus device.
To enable it, navigate to the Venus Remote Console -> Settings -> General.

### Device radiator

Since the app will be run on a plethora of different resolutions and split screens there is a "radiator" available which has iframes for all the
basic combinations of display "splits". The base 1/1 ui is 1280 x 720, which can be changed in the header. In the radiator there are the basic ui
and multiple split screen variations available relative to the "base" size.

To run this ui it is recommended to use mocked data. Run the mocked mqtt as described above and navigate to the radiator ui with `http://localhost/radiator.html`.
Since it is still served through the webpack dev server, the app will hot reload any time there are code changes.

## Metrics available

- Identify the D-bus channel that you want to read [from here](https://github.com/victronenergy/venus/wiki/dbus)
- Create a component using MqttSubscriptions or MqttTopicWildcard and pass the topic as the wrapper topi. See examples in other components

## Testing

### Cypress

Cypress is used to run integration tests on the compiled ui to make sure it opens and operated correctly in different
display sizes. To run cypress you need to run the live server with mocked mqtt:

- `npm run dev:mocked`

Then you can run the cypress ui with `npm run cypress`.

To run the ui tests in CI-style use `npm run test:ui`

## Deployment

### 1. Get the device ip

In order to deploy you need to know the target device's IP. It can be connected to by ethernet, LAN or the device's own WLAN.
Instructions on how to find the IPs can be found [here](https://www.victronenergy.com/live/venus-gx:start#accessing_the_device)
for the Venus GX device.

### 2. Run deploy script

In the project main folder run `./bin/deploy.sh <ip>` where ip is the target device's IP. The script also accepts an additional
`--user|-u` param that defines the user for the deployment connection. This defaults to `root`.

The deploy script also bundles the app. Nore that the script assumes that it's run from the root folder of the application.

### 3. Navigate to the app address again on the target device

Once deployed reload the page by navigating to the Venus host IP on the target device.
If you have enabled dev features and have previously deployed a new version of the UI to the device you can
press the `reload page` on the top left corner of the page.

## Making a new release

Whenever a new tag is created, Travis CI will build the app, archive the built files and upload them as `venus-html5-app.tar.gz` to the Github Release associated with the tag.
The app can then be downloaded from `https://github.com/victronenergy/venus-html5-app/releases/download/<TAG_NAME>/venus-html5-app.tar.gz`.
The build script expects the tags to follow semantic versioning (e.g. `1.2.3`, `1.2`, etc.) and will not trigger for tags that don't follow this convention (e.g. `v1.0`, `test`).

To include the HTML5 app in the next Venus OS version:

1. Create & push a tag for the version (do not use `v` in the version name, just the number)
2. Update the [todo](https://github.com/victronenergy/venus-private/wiki/todo) page for the build

You should add a note under "waiting for recipe", containing the tag name and the changes included:

```md
html5-app - <tag name>
<message>
```

For example:

```md
html5-app - 0.2 \* Reworked the UI
```

If you need any changes to the how the app is included inside Venus, please specify in the TODO file as well what changes need to be made to the recipe.
All Venus recipes are found [here](https://github.com/victronenergy/meta-victronenergy/tree/master/meta-ve-software/recipes-ve).
A sample recipe for the HTML5 app is [here](https://github.com/victronenergy/meta-victronenergy/tree/master/meta-ve-software/recipes-ve)

## Device error logging

When the app is hosted from a VenusGX, there is no convenient way to see the errors in the js console. To make troubleshooting easier the app sends (at least attempts) to send the error messages through websocket to the device. The log can be found at `/var/log/venus-html5-app/current`.
