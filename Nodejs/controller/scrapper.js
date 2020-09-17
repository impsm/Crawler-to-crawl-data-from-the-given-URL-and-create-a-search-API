const http = require('https');
const cheerio = require('cheerio');
const fs = require('fs'); 
let myjson = [];

module.exports.crawlMovies = async() => {

    return new Promise((resolve, reject) => {

        http.get("https://www.imdb.com/search/title/?count=100&groups=top_1000&sort=user_rating", (resp) => {
            let data;

            // A chunk of data has been recieved.
            resp.on('data', (chunk) => {
                data += chunk;
            });

            // The whole response has been received. Print out the result.
            resp.on('end', async () => {

                var $ = cheerio.load(data);

                $('.lister-item.mode-advanced .lister-item-content').each((i, p) => {
                    myjson.push({
                        name: $(p).find(".lister-item-header a").text(),
                        rating: $(p).find(".ratings-bar > .inline-block.ratings-imdb-rating strong").text(),
                        duration: $(p).find(".text-muted > .runtime").text(),
                        genre: $(p).find(".text-muted > .genre").text().replace(/(\r\n|\n|\r)/gm,"").trim()
                    });
                });

                console.log("crawl movies details", myjson);
                fs.writeFile('movies.json', JSON.stringify(myjson), function (err) { 
                    if(err) { 
                        console.log(err); 
                    } else { 
                        console.log("successfully stored movies data in json file"); 
                    } 
                }); 
                resolve(myjson);
            });

        }).on("error", (err) => {
            console.log("Error: " + err.message);
            reject(err.message);
        });
    });
}