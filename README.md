# WebProxy

## About
WebProxy is a system that will download websites and serve them on your own website, allowing you to bypass web filters.
## How to Setup
WebProxy is a ExpressJS server that can be easily setup. Simply run:
```
npm install
```
in the project directory. You can then start the server with 
```
npm start
```
<b>Important Note:</b> the server will expect a port provided on $PORT. You can update the port in app.mjs near the bottom of the code. Simply replace process.env.PORT with whatever port you want (for example, 8888). Also, the default page is the Heroku maintenance page (to stay hidden), but you can update this. Simply update index.html (located in the public folder).

## Using WebProxy
To get a website, use /get/URL. For example, if you wanted to get github.com, you would go to ```yourwebproxy.com/get/https://github.com```. When you go to the URL, please be patient and wait. It might take a bit fot the website to be downloaded. You will be presented the website automaticly once downloaded. If you click on a link on the website, you will most likely get a ```Cannot GET /something``` error. To fix this, insert ```red/``` into the URL as shown: ```yourwebproxy.com/red/something```. This will process a redirect. To delete the currently downloaded website, go to ```yourwebproxy.com/rm```. To access the currently downloaded website, go to ```yourwebproxy.com/del```. You will be automaticly sent here when you download a website.