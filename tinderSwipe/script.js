
    //here it needs to be different pictures to run
var file_upload = function (event){
    //appends each image to the children
    for(let i = 0; i< event.target.files.length;i++){
        var image = document.createElement('img')
        image.src = URL.createObjectURL(event.target.files[i])
        document.getElementById('preview-img').appendChild(image)
    }
}

//Clicking the hidden function
function pic_clicked(){
    document.getElementById('upload-file').click()
}
