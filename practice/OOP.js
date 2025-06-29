function test() {
    return {
        number: 1,
        rawr: 2,
        draw: function testing(){
            console.log("testing");
        }
    }
}

function test1(){
    this.number =  1,
    this.rawr = 2,
    this.draw = function testing(){
        console.log("testing");
    }
}

const testinggg = new test1();

let prot = 'location'
testinggg[prot] = {x:1}

console.log(testinggg)




