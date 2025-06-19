pictures = [];
filequeue = []

keep = [];

var file_upload = function (event){
    //appends each image to the children
    for(let i = 0; i< event.target.files.length;i++){
        var image = document.createElement('img')
        image.src = URL.createObjectURL(event.target.files[i])
        pictures.push(image)
        document.getElementById('preview-img').appendChild(pictures[i])
        console.log(pictures);
    }
}

//Clicking the hidden function
function pic_clicked(){
    document.getElementById('upload-file').click()
}


document.querySelector('.keep').addEventListener("click", () => {
    for(let i = 0; i<pictures.length; i++)
    {
        keep.push(pictures[i].src)
        document.getElementById('test').src = keep[i]
        console.log(i);
    }
})

