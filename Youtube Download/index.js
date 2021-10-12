let express = require('express')
let app = express();
const ytdl = require('ytdl-core')
const ID3Writer = require('browser-id3-writer');
const bent = require('bent')
app.use(express.json())
app.use(express.static("public"));
const PORT = process.env.PORT || 8080 || 5000 || 3000


app.get('/videoInfo', async function(req, res){
    let videoUrl = req.query.videoURL;
    let info = await ytdl.getInfo(videoUrl)
res.status(200).json(info)
})

app.get('/download', async function(req, res){
    let videoURL = req.query.videoURL;
    let itag = req.query.itag;
    let filename = req.query.filename;
let data2 = await ytdl.getBasicInfo(videoURL)
let thumb = data2.videoDetails.thumbnails[data2.videoDetails.thumbnails.length-1].url
    res.setHeader('Content-Type', 'audio/mp3');
    res.setHeader("Content-Disposition", 'attachment;\ filename='+filename)

    sexo = ytdl(videoURL, {
        format: 'mp3',
        filter: format => format.itag == itag
    }).pipe(res)
 

})

app.listen(PORT)

