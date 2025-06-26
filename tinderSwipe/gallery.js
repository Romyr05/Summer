
//y-index 
let yscroll = window.scrollY

//if scroll check the y-index after scroll
addEventListener("scroll" ,() =>{
    const nav = document.getElementById("navbar");
    Cscroll = window.scrollY;
    if(Cscroll > yscroll && Cscroll > 50)
    {
        //add a classlist called hidden; css function just puts the navbar on a negative value
        nav.classList.add('hidden')
    }
    //if scrolled up and is less than 50 pixels it will remove the class just here 
    //will not run the task
    else{
        nav.classList.remove('hidden')
    }
    // every after same value to check if the user has scrolled up or scrolled down
    yscroll = Cscroll
})

document.addEventListener("DOMContentLoaded", () =>{
    const observer = new IntersectionObserver( (entries) => {
        entries.forEach(entry => {
            if(entry.isIntersecting)
            {
                entry.target.classList.add('in-view')
            }else{
                entry.target.classList.remove('in-view')
            }
        })
    })

    const animated = document.querySelectorAll('[data-animate]');

    animated.forEach(element => {
        observer.observe(element)
    })
})