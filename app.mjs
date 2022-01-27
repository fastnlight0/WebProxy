import express from 'express'
import scrape from 'website-scraper'
import fs from 'fs'
import process from 'process'

var app = express()
var url = ""
const actives = ["get", "red", "del", "rm"]

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
        url = ""
        console.log("Starting download on: " + req.url.split("/get/")[1])
        url = req.url.split("/get/")[1]
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
    url = ""
    console.log("Executed rm")
    res.redirect("/")
})

app.get('/red/*', function (req, res) {
    if (req.url == "/red/" || url == "") {
        res.redirect('/red')
    } else {
        var urlt = new URL(url)
        res.redirect('/get/' + urlt.protocol + "//" + urlt.hostname + "/" + req.url.split("/red/")[1])
    }
})
app.get("/*", function (req, res, next) {
    if (actives.includes(req.url.split('/')[1])){
        next()
    } else {
        console.warn("REDIRECTED")
        next()
    }
})


process.on("SIGTERM", () => {
    console.log("Recieved SIGTERM, starting shutdown")
    fs.rmSync("public/del", { recursive: true, force: true })
    console.log("Executed rm")
    url = ""
    console.log("WebDel offline")
})

app.listen(process.env.PORT)
fs.rmSync("public/del", { recursive: true, force: true })
console.log("Executed rm")
url = ""
console.log("WebDel online")