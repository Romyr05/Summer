//hiding the upload file function
function pic_clicked(){
    document.getElementById('upload-file').click()
}

    queueImage= [];

    document.getElementById('upload-file').addEventListener("change",function(){
        //upload the image in the frontend
        const files = Array.from(this.files)

        files.forEach((file,index) =>{

            const picture = URL.createObjectURL(file);
            queueImage.push({file,url:picture})

            console.log(index)
            const image = document.createElement('img')
            image.src = picture;
            image.id = `image-${index}`;

            if(index === 0)
            {
                document.getElementById('test').src = picture;
            }

            console.log(image);
            document.getElementById('preview-img').appendChild(image);
        })
    })

    stored = [];


    function keep(){
        document.getElementById('keep').addEventListener("click",() =>{
            console.log("asaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
            stored.push(queueImage[0])
            document.getElementById('test123').src = queueImage[0].url;
        })
    }






