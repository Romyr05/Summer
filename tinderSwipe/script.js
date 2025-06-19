//hiding the upload file function
function pic_clicked(){
    document.getElementById('upload-file').click()
}


function file_upload(event){
    console.log('a');
    var image = document.createElement('img')
    document.getElementById('upload-file').addEventListener("click",function(){
        //upload the image in the frontend
        const file = event.target.files[0]
        image.src = URL.createObjectURL(file)
        if(file)
        {
            console.log(image);
            document.getElementById('test').appendChild(image);
        }
        //show the image

    })
}

