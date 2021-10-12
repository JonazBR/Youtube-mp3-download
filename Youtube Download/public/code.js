document.querySelector("#download-btn").addEventListener("click", async function(){
let video  = document.querySelector("#video-link").value
if(video.length == 0) {
    return;
}
try {
    document.querySelector(".loader").classList.add("show");
    let res = await fetch("/videoInfo?videoURL="+video)
    let data = await res.json();
    console.log(data)
    document.querySelector(".loader").classList.remove("show");
    let audios = data.formats.filter(function(obj)
    {
        return obj.mimeType.includes('audio/webm');

    })
    let filename = data.videoDetails.title+'.mp3';

    console.log(filename)
    let itag = audios[0].itag;

    alert(`"${filename}" Vai vai ser baixado automaticamente`)
    document.querySelector("#download-frame").src = `./download?videoURL=${video}&itag=${itag}&filename=${filename}`

} catch (msg) {
    console.log(msg)
    document.querySelector(".loader").classList.remove("show");
    notify("Ocorreu algum erro, por favor tente novamente")
}
});

function notify(text) {
     let notification = document.createElement("div");
     notification.classList.add("notification")
     notification.innerText = text;
     document.body.appendChild(notification)
     setTimeout(() => {
        notification.classList.add("show")
     }, 100);
     setTimeout(() => {
        notification.classList.remove("show")

        setTimeout(() => {
            
            document.body.removeChild(notification)

         }, 300);

     }, 4000);
}