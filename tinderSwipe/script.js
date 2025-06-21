
document.getElementById('test123').addEventListener("click",()=>{
    document.getElementById('upload-file').click();
})


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

    files.forEach((file,index) =>{
        const picture = URL.createObjectURL(file);
        queueImage.push({file,url:picture})
        ImageAll.push({file,url:picture})
        const image = document.createElement('img');
        if(track < ImageAll.length)
        {
            image.src = ImageAll[track].url
            track++;
            image.classList.add('image-prev');
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
        document.getElementById('test123').src = "/tinderSwipe/images/tinder2.png"
    }
}

document.getElementById('keep').addEventListener("click",() => {
    if(currentIndex < queueImage.length)
    {
        imageKeep.push(queueImage[currentIndex]);
        const keep = document.createElement('img');
        keep.src = imageKeep[currentIndex].url
        document.getElementById('keeped-img').append(keep)
        console.log(imageKeep);
        currentIndex++
        display_image()
    }
})


document.getElementById('delete').addEventListener("click", () => {
    if(currentIndex < queueImage.length)
    {
        console.log(`queue: ${(queueImage.length)}`);
        console.log(`currentIndex: ${(currentIndex)}`);
        currentIndex++
        display_image()
    }
})

function remove_all (array){
    array.splice(0,array.length)
}

console.log(imageKeep);


if(track_queue === queueImage.length)
{
    imageKeep.forEach((keeped,index) => {
    console.log(keeped)
    const keep = document.createElement('img');
    keep.src = imageKeep[index].url
    document.getElementById('keeped-img').appendChild(keep[index])
})
}

let clicked = false

document.getElementById('check-keep').addEventListener("click",()=>{
    if(!clicked){
        document.getElementById('keeped-img').style.display = 'block';
        clicked = true
    }else{
        document.getElementById('keeped-img').style.display = 'none';
        clicked = false
    }
    
})





