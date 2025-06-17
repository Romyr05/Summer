        
        //Local storage means to get that item and store it locally here if it is not located then it will make the score like that object
        //uses parse so it can convert the JSON into an object 
        const score = JSON.parse(localStorage.getItem('score')) ||
         {
            wins : 0,
            lose:0,
            tie:0
        };

        //the one above is the same as
        /*
        if(score === null)
        {
         score = {
            wins : 0,
            lose:0,
            tie:0
        };
        }
        */

        document.querySelector('.js-rock').addEventListener('click', ()=>{
            play('rock')
        })

        document.querySelector('.js-paper').addEventListener('click', () => {
            play('paper');
        })

        document.querySelector('.js-scissors').addEventListener('click', () => {
            play('scissors');
        })

        document.getElementById('ans').addEventListener("click",()=>{
            const a = document.getElementById('alt').value;
            const choice = test(a);
            play(choice);
        })

        function test(choice) {
            if(choice === 'r')
            {
                return 'rock'
            }
            else if(choice === 's')
            {
                return 'scissors'
            }
            else if(choice === 'p')
            {
                return 'paper'
            }
        }



        /*
        also one way of doing the thing above 

        document.addEventListener('keydown',(event) => {
            console.log(event.key)
        })
            */
        

        function play(player_move){

            let computer_choice = computer_move();


            let result = '';
            

            if(player_move === computer_choice)
            {
                    score.tie++;
                    result = 'tie';
            }
            else if
               ((player_move === 'rock' && computer_choice === 'scissors')
                || (player_move === 'scissors' && computer_choice === 'paper') 
                || (player_move === 'paper' && computer_choice === 'rock')){
                    score.wins++;
                    result = 'win';

                }
            else {
                 score.lose++;
                    result = 'lose';

            }

        //sets the score into a JSON for the getItem
        localStorage.setItem('score',JSON.stringify(score));
        updateMatch(player_move,computer_choice);

        //updates result
        document.querySelector('.j-result').innerHTML = result;
        //updates scores
        updateScore();

        }

        function updateMatch(player_move,computer_choice){
            document.querySelector('.j-matchup').innerHTML = `You picked ${player_move}. Computer picked ${computer_choice}`
        }

        //updates the score
        function updateScore(){
            document.querySelector('.j-score').innerHTML= `Wins: ${score.wins}, Losses ${score.lose} Ties: ${score.tie}`; 
        }


        function computer_move(){
            
            let computer_choice = ''
            const randomMov = Math.random();
            console.log(`random number: ${randomMov}`);
            if(randomMov <= 1/3)
            {
                computer_choice = 'rock';
            }
            else if(randomMov <= 2/3)
            {
                computer_choice = 'paper';
            }
            else{
                computer_choice = 'scissors';
            }
            return computer_choice;
        }

        let is_autoplay = false;
        let interval_id;

        function autoplay(){

            if(!is_autoplay){
                interval_id = setInterval(function(){
                    const playermove = computer_move();
                    play(playermove);

            },1000);
                document.getElementById('js-autoplay').innerHTML = 'Stop Playing'
                is_autoplay = true;
            }else{
                clearInterval(interval_id);
                is_autoplay = false;
                document.getElementById('js-autoplay').innerHTML = 'Auto Play'
            }
        }

        document.getElementById('js-autoplay').addEventListener("click",() => {
            autoplay();
        })

        function reset() {
            score.wins = score.lose = score.tie = 0;
            localStorage.setItem('score',JSON.stringify(score));
            alert(`Wins: ${score.wins}, Losses ${score.lose} Ties: ${score.tie}`);
        }
        
        /*
        document.getElementById('js-reset').addEventListener("click",() => {
            reset();
        })
        */
        document.getElementById('js-reset').addEventListener("click", () =>{
                reset_conf()
        })

        function reset_conf() {
            document.querySelector(".j-reset-confirm").innerHTML =
            `Reset? <button class = 'js-yes'>Yes </button> <button class ='js-no'> No</button>`;


            document.querySelector('.js-yes').addEventListener("click", () =>{
            reset();
            updateScore();
            hide_reset();
            })

            document.querySelector('.js-no').addEventListener("click", () =>{
            hide_reset();
            updateScore()
            })
        }


        function hide_reset(){
            document.querySelector('.j-reset-confirm').innerHTML = ""
        }