
document.getElementById('test123').addEventListener("click",()=>{
    document.getElementById('upload-file').click();
})


imageKeep = [];
queueImage= [];
ImageAll = [];
let currentIndex = 0;
let track = 0;
let track_queue = 0;
let tracking = 0; 

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
    updateProgressBar()


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
        document.getElementById('test123').src = "/tinderSwipe/images/test.png"
    }
}

document.getElementById('keep').addEventListener("click",() => {
    if(currentIndex < queueImage.length)
    {   
        console.log(currentIndex)
        imageKeep.push(queueImage[currentIndex]);
        const keep = document.createElement('img');
        keep.src = imageKeep[tracking].url
        document.getElementById('keeps').append(keep)
        keep.classList.add('image-keep');
        console.log(imageKeep);
        tracking++
        currentIndex++
        display_image()
        updateProgressBar()
    }
})


document.getElementById('delete').addEventListener("click", () => {
    if(currentIndex < queueImage.length)
    {
        console.log(`queue: ${(queueImage.length)}`);
        console.log(`currentIndex: ${(currentIndex)}`);
        currentIndex++
        display_image()
        updateProgressBar()
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
    document.getElementById('keeps').appendChild(keep)
})
}

let clicked = false

document.getElementById('check-keep').addEventListener("click",()=>{
    if(!clicked){
        document.getElementById('keeps').style.display = 'flex';
        clicked = true
    }else{
        document.getElementById('keeps').style.display = 'none';
        clicked = false
    }
    
})
//Swipe

let startX = 0;
let endX = 0;

function swipe() {
    const deltaX = endX - startX;

    if (deltaX > 0) {
        console.log('keep');
        document.getElementById('keep').click();

    } else {
        console.log('delete'); // swipe left
        document.getElementById('delete').click();
    }
}

const card = document.querySelector('.card');

//mobile
card.addEventListener("touchstart", (e) => {
    startX = e.changedTouches[0].screenX;
},{passive:true});

card.addEventListener("touchend", (e) => {
    endX = e.changedTouches[0].screenX;
    swipe();
},{passive:true});


//website

//mouse is pressed

card.addEventListener('mousedown',(e) =>{
    startX = e.screenX;
})

card.addEventListener('mouseleave', (e)=>{
    endX = e.screenX
    swipe();
})


function updateProgressBar() {
    const progress = (currentIndex / queueImage.length) * 100;
    document.getElementById('progress-bar').style.width = `${progress}%`;
}