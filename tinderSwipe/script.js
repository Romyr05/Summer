//hiding the upload file function
function pic_clicked(){
    document.getElementById('upload-file').click()
}

imageKeep = [];
queueImage= [];
ImageAll = [];
let currentIndex = 0;
let track = 0;
let track_queue = 0;

document.getElementById('upload-file').addEventListener("change",function(){
    //upload the image in the frontend
    const files = Array.from(this.files)

    if(track_queue === queueImage.length)
    {
        console.log("running")
        remove_all(queueImage);
        console.log(`rawr ${queueImage}`)
    }
    track_queue = 0;

    files.forEach((file,index) =>{
        const picture = URL.createObjectURL(file);
        queueImage.push({file,url:picture})
        ImageAll.push({file,url:picture})
        const image = document.createElement('img');
        if(track < ImageAll.length)
        {
            image.src = ImageAll[track].url
            track++;
        }
        document.getElementById('preview-img').append(image)
    })
    document.getElementById('upload-file').value = ""
    currentIndex = 0;
    console.log(`track: ${track_queue}`)

    display_image()


})

function display_image() {
    if(currentIndex < queueImage.length)
    {
        console.log(`display queue: ${(queueImage.length)}`);
        console.log(`display: currentINdex: ${(currentIndex)}`);
        document.getElementById('test123').src = queueImage[currentIndex].url
        track_queue++
    }else
    {
        document.getElementById('test123').src = ""
    }
}

document.getElementById('keep').addEventListener("click",() => {
    if(currentIndex < queueImage.length)
    {
        imageKeep.push(queueImage[currentIndex]);
        console.log(imageKeep)
        currentIndex++
        display_image()
        track_queue++;
    }
})


document.getElementById('delete').addEventListener("click", () => {
    if(currentIndex < queueImage.length)
    {
        queueImage[currentIndex] = null;
        console.log(`queue: ${(queueImage.length)}`);
        console.log(`currentIndex: ${(currentIndex)}`);
        currentIndex++
        display_image()

    }
})

function remove_all (array){
    array.splice(0,array.length)
}






