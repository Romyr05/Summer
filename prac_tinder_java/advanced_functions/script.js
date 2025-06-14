        
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

        function play(player_move){

            let computer_choice = "";

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
            console.log(computer_choice);

            let result = '';
            

            if(player_move === computer_choice)
            {
                    score.tie++;
                    alert(`You picked ${player_move}. Computer picked ${computer_choice}. Its a tie
Wins: ${score.wins}, Losses ${score.lose} Ties: ${score.tie}`);
            }
            else if
               ((player_move === 'rock' && computer_choice === 'scissors')
                || (player_move === 'scissors' && computer_choice === 'paper') 
                || (player_move === 'paper' && computer_choice === 'rock')){
                    score.wins++;
                    alert(`You picked ${player_move}. Computer picked ${computer_choice}. You Win 
Wins: ${score.wins}, Losses ${score.lose} Ties: ${score.tie}`
                        
                    );
                }
            else {
                 score.lose++;
                    alert(`You picked ${player_move}. Computer picked ${computer_choice}. You Lose
Wins: ${score.wins}, Losses ${score.lose} Ties: ${score.tie}`);
            }


        //sets the score into a JSON for the getItem
        localStorage.setItem('score',JSON.stringify(score));
        updateScore();


        }

        //updates the score
        function updateScore(){
            document.querySelector('.j-score').innerHTML= `Wins: ${score.wins}, Losses ${score.lose} Ties: ${score.tie}`; 
        }