const sendData = async (canvasHash, currentDate /* TODO: Other data to come later */) => {
    // Send API request
    fetch("/store", {
        method: "POST",
        mode: "cors",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            data: {
                canvas: canvasHash,
                date: currentDate,
                // TODO Other data to come later
            }
        }),
    }).then(res => res.json())
    .then(response => {
        if (response.success) {
            console.log(response.message);

            // Add the last visited time/date to the page
            const formattedDate = new Date(response.lastVisited);
            let dateParagraph = document.createElement("p");
            dateParagraph.innerHTML = 
                `You last visited this page on 
                ${Number(formattedDate.getMonth())+1}/${formattedDate.getDate()}/${formattedDate.getFullYear()} at
                ${formattedDate.getHours()}:${formattedDate.getMinutes()}:${formattedDate.getSeconds()}`;
            document.body.appendChild(dateParagraph);

            // Add website list
            const listHeader = document.createElement("h4");
            listHeader.innerHTML = "Websites you have visited: ";
            
            const ul = document.createElement("ul");
            response.sites.map((site) => {
                let li = document.createElement("li");
                li.innerHTML = site;
                ul.appendChild(li);
            });

            document.body.appendChild(listHeader);
            document.body.appendChild(ul);
        }
        else {
            console.error(response.message);
        }
    })
    .catch(error => console.error("ERROR: ", error));
};

const onload = (() => {
    const canvas = document.createElement("canvas");
    //document.body.appendChild(canvas);

    var ctx = canvas.getContext("2d");

    console.log("begin draw");

    //Timing attack w/3rd party graphic
    var start_ts = Date.now();
    //const timage = await fetch("https://commons.wikimedia.org/wiki/Main_Page#/media/File:Rosy-faced_lovebird_(Agapornis_roseicollis_roseicollis).jpg");
    //const ti_blob = await response.blob();
    //const arrayBuffer = await ti_blob.arrayBuffer();
    //const buffer = Buffer.from(arrayBuffer);


    var end_ts = Date.now();
    var elapsed = end_ts - start_ts;

    ctx.fillStyle = "rgb(255,0,255)";
    ctx.beginPath();
    ctx.rect(20, 20, 150, 100);
    ctx.fill();
    ctx.stroke();
    ctx.closePath();
    ctx.beginPath();
    ctx.fillStyle = "rgb(0,255,255)";
    ctx.arc(50, 50, 50, 0, Math.PI * 2, true);
    ctx.fill();
    ctx.stroke();
    ctx.closePath();

    txt = "abz190#$%^@£éú";
    ctx.textBaseline = "top";
    ctx.font = '17px "Arial 17"';
    ctx.textBaseline = "alphabetic";
    ctx.fillStyle = "rgb(255,5,5)";
    ctx.rotate(0.03);
    ctx.fillText(txt, 4, 17);
    ctx.fillStyle = "rgb(155,255,5)";
    ctx.shadowBlur = 8;
    ctx.shadowColor = "red";
    ctx.fillRect(20, 12, 100, 5);

    console.log("begin hash");

    // hashing function
    src = canvas.toDataURL();
    hash = 0;

    for (i = 0; i < src.length; i++) {
        char = src.charCodeAt(i);
        hash = (hash << 5) - hash + char;
        hash = hash & hash;
    }

    // output this however you want
    let paragraph = document.createElement("p");
    paragraph.innerHTML = `Your fingerprint is: ${hash}\n Time elapsed: ${elapsed}ms`;
    document.body.appendChild(paragraph);

    sendData(hash, Date.now());
})();