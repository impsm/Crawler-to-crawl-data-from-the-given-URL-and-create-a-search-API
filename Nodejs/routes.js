var express = require('express');
var scrapperController = require('./controller/scrapper');
var router = express.Router();

router.get("/", async (req, res) => {
    res.send("Service running...");
});

router.get("/healthcheck", async (req, res) => {
    res.send("Service running...");
});

router.post("/search", async (req, res) => {
    var resp = await scrapperController.crawlMovies(req.body);
    res.send(resp);
});

module.exports = router;