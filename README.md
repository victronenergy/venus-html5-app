![screenshot](/screenshot.png?raw=true)

# Venus OS hosted web app
*Version 3*

The "app" is a single page application that communicates to the rest of Venus OS via MQTT over websockets.
It uses React for the UI layer and also includes a wrapper service for the MQTT interface.

Its primary purpose is to be a simple-to-use and nice looking UI for a Victron system on
marine Multi Functional Displays, such as the ones from Garmin, Simrad and others. This
removes the need for a Victron panel at the helm: less clutter on the dashboard.

The secondary purpose is to help OEMs, boat builders and motorhome builders for example,
make their own custom UI.

## 0. Contents

Chapters in this readme:

1. Functionality.
2. Development
3. Testing
4. Making a release
5. Device error logging
6. Device debugging

## 1. Functionality

### 1.1 Documentation per Box

`Boxes` are the various designed visualisation: there is a Battery box, a Generator box, a Shorepower box, and so forth.

How certain devices are visualised/rendered on HTML5, ie. in to what box(es), and what topics are used for what parameter, and more is documented in three places:

- [TOPICS.md](https://github.com/victronenergy/venus-html5-app/blob/master/TOPICS.md)
- [wiki/Translating system components into the HTML5 app](https://github.com/victronenergy/venus-html5-app/wiki/Translating-system-components-into-the-HTML5-app)
- [wiki/Dashboard overview](https://github.com/victronenergy/venus-html5-app/wiki/Dashboard-overview)

### 1.2 Handling disconnects

When devices are disconnected from the GX Device, see [this issue](https://github.com/victronenergy/venus-html5-app/issues/49)
for what happens on the D-Bus.

On MQTT, this is translated into sending an empty message on the subs which depend on the lost service. Depending on the element we show either -- for the value (in the case of numeric values) or another default state for the component (like disconnected for the active source).

## 2. Development

### 2.1 Initial setup

If it's the first time you run the app:

- make sure to have `node` & `npm` installed on your machine
- run `npm install` in the root folder

### 2.2 Development

To run the app locally for development, run:

`npm run start`

And then open the app in the browser at `http://localhost:8000`.

This will start the webpack dev server, which will recompile the app on code changes and hot reload the UI.

You can change the `host` and `port` (although the default 9001 is usually correct) query parameters to point to your Venus device:

`http://localhost:8000/?host=<VENUS_DEVICE_IP>&port=9001`

This way you can run the local app against venus device data if the venus device is on the same network as your computer.

### 2.3 Routing
Every route is prefixed with the current locale, i.e. `http://localhost:8000/en/box/EnergyOverview`. This is done automatically based on the language setting of the GX device, and stays in place when using the custom `<Link>` component.

### 2.4 Running the app with no Venus device available

The MQTT mock is no longer maintained. Use [venus-docker](https://github.com/victronenergy/venus-docker) instead or a Venus GX in demo mode (below).

You can run multiple `venus-docker` simulations by executing: `echo {a..z} | xargs -n1 ./run.sh -s`. Each container running a simulation will expose MQTT on
an increasing port number starting from `9001`.

~~If there is no real device to be used for MQTT data, you can run the app with a fake MQTT broker:~~

~~`npm run dev:mocked` This shallowly fakes the MQTT implementation in the Venus device.~~

Also keep in mind the Venus device also has a Demo mode, which allows you to get useful data if you only have the Venus device available, without requiring various Victron devices to be connected to the Venus device. To enable it, navigate to the Venus Remote Console -> Settings -> General.

### 2.5 Device radiator

Since the app will be run on a plethora of different resolutions and split screens there is a "radiator" available which has iframes for all the
basic combinations of display "splits". The base 1/1 ui is 1280 x 720, which can be changed in the header. In the radiator there are the basic ui
and multiple split screen variations available relative to the "base" size.

To run this ui it is recommended to use mocked data. Run the mocked mqtt as described above and navigate to the radiator ui with `http://localhost/radiator.html`.
Since it is still served through the webpack dev server, the app will hot reload any time there are code changes.

### 2.6 Metrics available

- Identify the D-bus channel that you want to read [from here](https://github.com/victronenergy/venus/wiki/dbus)
- Create a component using MqttSubscriptions or MqttTopicWildcard and pass the topic as the wrapper topi. See examples in other components

### 2.7 Deploying to a device during development

#### 2.7.1 Get the device ip

In order to deploy you need to know the target device's IP. It can be connected to by ethernet, LAN or the device's own WLAN.
Instructions on how to find the IPs can be found [here](https://www.victronenergy.com/live/venus-gx:start#accessing_the_device)
for the Venus GX device.

#### 2.7.2 Run deploy script

In the project main folder run `./bin/deploy.sh <ip>` where ip is the target device's IP. The script also accepts an additional
`--user|-u` param that defines the user for the deployment connection. This defaults to `root`.

The deploy script also bundles the app. Nore that the script assumes that it's run from the root folder of the application.

#### 2.7.3 Deploying using a USB stick

Since Venus OS 2.80, placing the build of the app in `/data/www/app` allows for serving a different version of the app than the one bundled with Venus OS at `/var/www/venus/app`. When the `/data/www/app` is present, it'll be server at `venus.local/app` and the original application at `venus.local/default/app`.

By creating an archive named `venus-data.zip` that contains the build files from the `dist` inside an `www/app/` folder will ensure that the `/data/www/app` folder will be created and the content of the archived extracted when the GX device is rebooted.

The content of the `/data` partition is persistent across firmware updates.

#### 2.7.4 Navigate to the app address again on the target device

Once deployed reload the page by navigating to the Venus host IP on the target device.
If you have enabled dev features and have previously deployed a new version of the UI to the device you can
press the `reload page` on the top left corner of the page.

### 2.8 Translations

#### 2.8.1 Syncronizing the translations files with the POEditor Project

[POEditor](https://poeditor.com/) is used as localization management platform for this project. In order to sync the translations using the scripts from the `poeditor` folder, an API key has to be placed in the `.env.local` according to the `.env.local.example` file.

#### 2.8.2 Pushing the local translation files to POEditor

```
npm run poeditor:push
```

Running the command will trigger the following actions:

1. Add the terms of the main language file (default: en)
1. Add new languges to the POEditor project if they are available locally but missing in POEditor
1. Add the local translations for all the languages
1. Mark translations as fuzzy if there are changes in the translation of the main language

```
npm run poeditor:push -f
```

Running the comamnd with the `-f` flag will delete the terms from POEditor that are not present in the local file.
Please use with caution. If wrong data is sent, existing terms and their translations might be irreversibly lost.

#### 2.7.3 Pulling the POEditor translations locally

```
npm run poeditor:pull
```

## 3. Testing

### 3.1 Venus OS Release test plan

In the Venus OS release test plan there is a tab containing all tests.

### 3.2 Enzyme

Most components have Enzyme unit tests. Run all of these tests with `npm run test:unit`

### 3.3 Cypress

Cypress is used to run integration tests on the compiled ui to make sure it opens and operated correctly in different
display sizes. To run cypress you need to run the live server and an instance of venus docker in the Venus GX demo mode (z):

(in html5 app repo): `npm run dev`

(in venus docker repo): `./run.sh -s z`

Then you can run the cypress ui with `npm run cypress`.

To run the ui tests in CI-style use `npm run test:e2e`

## 4. Making a release

Whenever a new tag is created, GitHub Actions will build the app, archive the built files and upload them as `venus-html5-app.tar.gz` to the Github Release associated with the tag.
The app can then be downloaded from `https://github.com/victronenergy/venus-html5-app/releases/download/<TAG_NAME>/venus-html5-app.tar.gz`.
The build script expects the tags to follow semantic versioning (e.g. `1.2.3`, `1.2`, etc.) and will not trigger for tags that don't follow this convention (e.g. `v1.0`, `test`).

To include the HTML5 app in the next Venus OS version:

1. Increment the version number in `package.json`. Create and push a commit.
2. Create & push a tag for the version (do not use `v` in the version name, just the number)
3. Update the [todo](https://github.com/victronenergy/venus-private/wiki/todo) page for the build

You should add a note under `Done - waiting for recipe / venus maintainer`, containing the tag name and the changes included:

```md
html5-app - <tag name>
<message>
```

For example:

```md
html5-app - 0.2 \
  * Reworked the UI
```

If you need any changes to the how the app is included inside Venus, please specify in the TODO file as well what changes need to be made to the recipe.
All Venus recipes are found [here](https://github.com/victronenergy/meta-victronenergy/tree/master/meta-ve-software/recipes-ve).
A sample recipe for the HTML5 app is [here](https://github.com/victronenergy/meta-victronenergy/tree/master/meta-ve-software/recipes-ve)

## 5. Device error logging

When the app is hosted from a VenusGX, there is no convenient way to see the errors in the js console. To make troubleshooting easier the app sends (at least attempts) to send the error messages through websocket to the device. The log can be found at `/var/log/venus-html5-app/current`.

## 6. Device debugging

By adding `debug=true` to the query params you can enable some convenience features for debugging on actual devices:

- "Reload page" button - refreshes the page
- "Browser info" button - links to page containing basic information about the browser in which the app is running
- A debug log element, which redirects all console messages to a visible element in the ui

To enable this on a device set the debugReload and debugLog elements to visible in index.html and deploy to the device.


## 7. Theming

The app supports theming. We try to use the [default](https://tailwindcss.com/docs/theme) Tailwind theme settings as much as possible. The theme overrides is defined in the `tailwing.config.js` file.

### 7.1. Colors

Theme support dark and light mode. To add support of the dark mode to a Component, add the `dark:{param}` classes to the `html` elements. Every color, except white and black, has its corresponding value for the dark theme mode. For example

```html
<div className="bg-victron-white text-victron-black dark:bg-victron-black dark:text-victron-white">
    <div>Normal text</div>
    <div className="text-victron-green dark:text-victron-green-dark">Green color for light and dark theme</div>
</div>
```

The dark mode is enabled by default on the Venus GX devices.

### 7.2. Icons

Icons are defined in the `public/icons` folder. Icons don't have predefined sizes and colors. To set the size and color of the icon, use the appropriate Tailwind classes. For example

```html
<ExpandIcon className='w-6 text-victron-blue dark:text-victron-blue-dark cursor-pointer' />
```
