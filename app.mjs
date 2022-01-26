import express from 'express'
import scrape from 'website-scraper'
import fs from 'fs'

var app = express()
var url = new URL()

app.use(express.static(import.meta.url.split('file://')[1] + '/../public'))
app.get('/', function (req, res) {
    res.render('index')
})

app.get('/get/*', function (req, res) {
    if (req.url == "/get/") {
        res.redirect('/get')

    } else {
        fs.rmSync("public/del", { recursive: true, force: true })
        console.log("Executed rm")
        url = new URL()
        console.log("Starting download on: " + req.url.split("/get/")[1])
        url = new URL(req.url.split("/get/")[1])
        let options = {
            urls: [req.url.split("/get/")[1]],
            directory: ("public/del"),
        };

        scrape(options).then((result) => {
            console.log("Downloaded: " + req.url.split("/get/")[1])
            res.redirect("/del")
        }).catch((err) => {
            console.log("Error downloading: " + req.url.split("/get/")[1] + ", " + err)
            res.send('<script>alert("Error downloading: ' + req.url.split("/get/")[1] + ', ' + err + '"); window.location.href = "/"; </script>')
        });
    }
})

app.get('/rm', function (req, res) {
    fs.rmSync("public/del", { recursive: true, force: true })
    url = new URL()
    console.log("Executed rm")
    res.redirect("/")
})

app.get('/red/*', function (req, res) {
    if (req.url == "/red/") {
        res.redirect('/red')
    } else {
        res.redirect('/get/' + url.protocol + "//" + url.hostname+"/"+req.url.split("/red/")[1])
    }
})


app.listen(process.env.PORT)
fs.rmSync("public/del", { recursive: true, force: true })
console.log("Executed rm")
url = new URL()
console.log("WebDel online")