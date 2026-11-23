//Global variables
let info; // User input variable on which pot they want to move
let nums = [4,4,4,4,4,4,4,4,4,4,4,4]; //nums[0 - 5] = Player, nums[6 - 11] = AI
let scoreRegion = [0,0]; //scoreRegion[0] = AI, scoreRegion[1] = Player
let mode; //Difficulty mode. (Easy: 0, Medium: 1, Hard: 2)
let winner; //Variable to store winner (0: AI, 1: Player, 2: Tie);
let aiThinking = false; //Blocks player clicks while AI is moving.

let userCount = 0; //Keep track of total number of wins.
let aiCount = 0; //Keep track of total number of wins.

//Initialize table variables to whatever the counts are.
document.querySelector("#user").innerHTML = userCount;
document.querySelector("#AI").innerHTML = aiCount;

//Function to set number of tiles based on nums array.
function setTiles()
{
    //Print the number of stones based upon the stored value in nums. Do this for the 12 pits and 2 scoring regions. 
    const el1 = document.getElementById('element1');
    //This line ensures that the previous printed images are first removed, before reprinting in order to ensure duplicates are not printed. 
    el1.innerHTML = "";
    for(let i = 0; i < nums[0]; i++)
    {
        const img = document.createElement('img');
        img.src = '../assets/images/circle.svg';
        img.width = '15';
        el1.appendChild(img);
    }

    const el2 = document.getElementById('element2');
    el2.innerHTML = "";
    for(let i = 0; i < nums[1]; i++)
    {
        const img = document.createElement('img');
        img.src = '../assets/images/circle.svg';
        img.width = '15';
        el2.appendChild(img);
    }

    const el3 = document.getElementById('element3');
    el3.innerHTML = "";
    for(let i = 0; i < nums[2]; i++)
    {
        const img = document.createElement('img');
        img.src = '../assets/images/circle.svg';
        img.width = '15';
        el3.appendChild(img);
    }

    const el4 = document.getElementById('element4');
    el4.innerHTML = "";
    for(let i = 0; i < nums[3]; i++)
    {
        const img = document.createElement('img');
        img.src = '../assets/images/circle.svg';
        img.width = '15';
        el4.appendChild(img);
    }

    const el5 = document.getElementById('element5');
    el5.innerHTML = "";
    for(let i = 0; i < nums[4]; i++)
    {
        const img = document.createElement('img');
        img.src = '../assets/images/circle.svg';
        img.width = '15';
        el5.appendChild(img);
    }

    const el6 = document.getElementById('element6');
    el6.innerHTML = "";
    for(let i = 0; i < nums[5]; i++)
    {
        const img = document.createElement('img');
        img.src = '../assets/images/circle.svg';
        img.width = '15';
        el6.appendChild(img);
    }

    const el7 = document.getElementById('element7');
    el7.innerHTML = "";
    for(let i = 0; i < nums[6]; i++)
    {
        const img = document.createElement('img');
        img.src = '../assets/images/circle.svg';
        img.width = '15';
        el7.appendChild(img);
    }

    const el8 = document.getElementById('element8');
    el8.innerHTML = "";
    for(let i = 0; i < nums[7]; i++)
    {
        const img = document.createElement('img');
        img.src = '../assets/images/circle.svg';
        img.width = '15';
        el8.appendChild(img);
    }

    const el9 = document.getElementById('element9');
    el9.innerHTML = "";
    for(let i = 0; i < nums[8]; i++)
    {
        const img = document.createElement('img');
        img.src = '../assets/images/circle.svg';
        img.width = '15';
        el9.appendChild(img);
    }

    const el10 = document.getElementById('element10');
    el10.innerHTML = "";
    for(let i = 0; i < nums[9]; i++)
    {
        const img = document.createElement('img');
        img.src = '../assets/images/circle.svg';
        img.width = '15';
        el10.appendChild(img);
    }

    const el11 = document.getElementById('element11');
    el11.innerHTML = "";
    for(let i = 0; i < nums[10]; i++)
    {
        const img = document.createElement('img');
        img.src = '../assets/images/circle.svg';
        img.width = '15';
        el11.appendChild(img);
    }

    const el12 = document.getElementById('element12');
    el12.innerHTML = "";
    for(let i = 0; i < nums[11]; i++)
    {
        const img = document.createElement('img');
        img.src = '../assets/images/circle.svg';
        img.width = '15';
        el12.appendChild(img);
    }

    const score1 = document.getElementById('scoreRegion1');
    score1.innerHTML = "";
    for(let i = 0; i < scoreRegion[0]; i++)
    {
        const img = document.createElement('img');
        img.src = '../assets/images/circle.svg';
        img.width = '15';
        score1.appendChild(img);
    }

    const score2 = document.getElementById('scoreRegion2');
    score2.innerHTML = "";
    for(let i = 0; i < scoreRegion[1]; i++)
    {
        const img = document.createElement('img');
        img.src = '../assets/images/circle.svg';
        img.width = '15';
        score2.appendChild(img);
    }
}

//Main function that runs game. 
function gamePlay()
{   
    //Let user move first. Get user entry with getData() function from the textbox.
    //Move pieces accordingly by editing nums and scoreRegion. Reprint with setTiles() function. 
    //Run computer player.
    //Move pieces and reprint again.

    //Ignore clicks while the AI is moving or on an empty pit.
    if(aiThinking || nums[info] == 0) return;

    let aiNext = false;
    let temp = info;
    let area = 1;
    let total = nums[info];
    //Replace tiles as they should be.
    for(let i = 0; i < total; i++)
    {
        //If scoring region increment it.
        if(temp % 12 == 5 && area == 1)
        {
            scoreRegion[1] += 1;
            area = 0;
            nums[info]--;
        }
        //Otherwise increment number of stones in pits.
        else
        {
            temp++;
            area = 1;
            nums[temp % 12] += 1;
            nums[info]--;
        }

        //If user ends in their own pit they can go again.
        if(i == total-1 && area == 0)
        {
            setTimeout(setTiles, 700);  
            //This check ensures that the alert is not printed on the last turn when there are actually no more moves to be made.
            if(nums[0] == 0 && nums[1] == 0 && nums[2] == 0 && nums[3] == 0 && nums[4] == 0 && nums[5] == 0)
                break;
            else
                alert("Go again! Please select next move.");
            //Skip AI since user is going again.
        }

        //Steal opponents when finishing in an empty store.

        else if(i == total-1 && nums[temp] == 1 && nums[11-temp] > 0 && temp < 6)
        {
            scoreRegion[1] += nums[temp] + nums[11-temp];
            nums[temp] = 0;
            nums[11-temp] = 0;
            setTimeout(setTiles, 400);
            setTimeout(aiNext = true, 700);
        }

        //If the two other conditions are not met, still print the board and call AI.
        else if(i == total-1)
        {
            setTimeout(setTiles, 400);
            setTimeout(aiNext = true, 700);
        }
    }

    
    //Check if game ended after the player's move. If not, let the AI move.
    if(checkGameOver()) return;
    if(aiNext)
    {
        aiThinking = true;
        setTimeout(aiTurn, 1500); //Short pause so the player can see their move first.
    }
        
}

//Search depth for each difficulty (Easy: 0, Medium: 1, Hard: 2)
const DEPTHS = [1, 3, 5];

//Convert nums/scoreRegion into the 14-slot board ai.js uses:
//[0-5] player pits, [6] player store, [7-12] AI pits, [13] AI store
function toBoard()
{
    return [...nums.slice(0, 6), scoreRegion[1], ...nums.slice(6, 12), scoreRegion[0]];
}

function fromBoard(b)
{
    nums = [...b.slice(0, 6), ...b.slice(7, 13)];
    scoreRegion = [b[13], b[6]];
}

//AI makes its move (and keeps going while it lands in its store).
function aiTurn()
{
    const depth = DEPTHS[mode] ?? DEPTHS[0];
    let board = toBoard();
    let again = true;
    const { move } = window.ai.minimax(board, depth, true);
    const result = window.ai.simulate_move(move, board, true);
    board = result.new_board;
    again = result.landed_in_store;
    fromBoard(board);
    setTiles();
    if(again)
    {
        alert("AI goes again! Wait for the move selection");
        setTimeout(aiTurn, 1000);
    }

    aiThinking = false;
    checkGameOver();
}

//If either side is empty: sweep remaining stones into stores and show winner.
function checkGameOver()
{
    const playerEmpty = nums.slice(0, 6).every(n => n == 0);
    const aiEmpty = nums.slice(6, 12).every(n => n == 0);
    if(!playerEmpty && !aiEmpty) return false;

    for(let i = 0; i < 6; i++) { scoreRegion[1] += nums[i]; nums[i] = 0; }
    for(let i = 6; i < 12; i++) { scoreRegion[0] += nums[i]; nums[i] = 0; }
    setTiles();

    if(scoreRegion[0] > scoreRegion[1]) winner = 0;
    else if(scoreRegion[1] > scoreRegion[0]) winner = 1;
    else winner = 2;

    setTimeout(() => {
        //alert("Game is now over. Let's see who wins!");
        gameWinner();
    }, 2000);
    return true;
}

//Make game winner visible
function gameWinner()
{
    var t1 = document.getElementById("board");
    t1.style.visibility = 'hidden';

    var t3 = document.getElementById("win");
    var t0 = document.createElement("h1");
    var t4 = document.createElement("h2");
    var t5 = document.getElementById("again");
    t3.innerHTML = "";
    if(winner == 0)
    {
        aiCount += 1;
        document.querySelector("#AI").innerHTML = aiCount;
        const t5 = document.createTextNode("YOU LOST!");
        const t6 = document.createTextNode("RESULTS:");
        t0.appendChild(t6);
        t4.appendChild(t5);
        t3.appendChild(t0);
        t3.appendChild(t4);
    }
    else if(winner == 1)
    {
        userCount += 1;
        document.querySelector("#user").innerHTML = userCount;
        const t6 = document.createTextNode("RESULTS:");
        const t5 = document.createTextNode("YOU WON!");
        t0.appendChild(t6);
        t4.appendChild(t5);
        t3.appendChild(t0);
        t3.appendChild(t4);
    }
    else if(winner == 2)
    {
        userCount += 1;
        aiCount += 1;
        t0.appendChild(document.createTextNode("RESULTS:"));
        t4.appendChild(document.createTextNode("IT'S A TIE!"));
        t3.appendChild(t0);
        t3.appendChild(t4);
    }
    t3.style.visibility = 'visible';
    t5.style.visibility = 'visible';
}

//Hide start button after it is pressed and show other buttons.
var but = document.getElementById("start");
but.addEventListener('click', () => 
{
    but.style.visibility = 'hidden';
    const modes = document.getElementById("easy");
    const modes2 = document.getElementById("med");
    const modes3 = document.getElementById("diff");
    modes.style.visibility = 'visible';
    modes2.style.visibility = 'visible';
    modes3.style.visibility = 'visible';
    var t0 = document.getElementById("instructions");
    t0.style.visibility = 'visible';
})

//Hide easy button after it is pressed.
var but2 = document.getElementById("easy");
but2.addEventListener('click', () => 
{
    but2.style.visibility = 'hidden';
    const t0 = document.getElementById("instructions");
    const t1 = document.getElementById("trackScore");
    const rest = document.getElementById("restart");
    const modes2 = document.getElementById("med");
    const modes3 = document.getElementById("diff");
    const brd = document.getElementById("board");
    t0.style.visibility = 'hidden';
    t1.style.visibility = 'visible';
    brd.style.visibility = 'visible';
    rest.style.visibility = 'visible';
    modes2.style.visibility = 'hidden';
    modes3.style.visibility = 'hidden';
    mode = 0;
    
})

//Hide medium button after it is pressed.
var but3 = document.getElementById("med");
but3.addEventListener('click', () => 
{
    but3.style.visibility = 'hidden';
    const t0 = document.getElementById("instructions");
    const t1 = document.getElementById("trackScore");
    const rest = document.getElementById("restart");
    const modes2 = document.getElementById("easy");
    const modes3 = document.getElementById("diff");
    const brd = document.getElementById("board");
    t0.style.visibility = 'hidden';
    t1.style.visibility = 'visible';
    brd.style.visibility = 'visible';
    rest.style.visibility = 'visible';
    modes2.style.visibility = 'hidden';
    modes3.style.visibility = 'hidden';
    mode = 1;
})

//Hide Difficult button after it is pressed.
var but4 = document.getElementById("diff");
but4.addEventListener('click', () => 
{
    but4.style.visibility = 'hidden';
    const t0 = document.getElementById("instructions");
    const t1 = document.getElementById("trackScore");
    const rest = document.getElementById("restart");
    const modes2 = document.getElementById("easy");
    const modes3 = document.getElementById("med");
    const brd = document.getElementById("board");
    t0.style.visibility = 'hidden';
    t1.style.visibility = 'visible';
    brd.style.visibility = 'visible';
    rest.style.visibility = 'visible';
    modes2.style.visibility = 'hidden';
    modes3.style.visibility = 'hidden';
    mode = 2;
})

//Function to restart game.
function keep()
{
    nums = [4,4,4,4,4,4,4,4,4,4,4,4];
    scoreRegion = [0,0];
    setTiles();

    var t1 = document.getElementById("win");
    var t2 = document.getElementById("again");
    const modes = document.getElementById("easy");
    const modes2 = document.getElementById("med");
    const modes3 = document.getElementById("diff");
    t1.style.visibility = 'hidden';
    t2.style.visibility = 'hidden';
    modes.style.visibility = 'visible';
    modes2.style.visibility = 'visible';
    modes3.style.visibility = 'visible'; 
}


//Assign info with its correct value after user clicks desired pit.
function num()
{
    info = 0;
    gamePlay();
}

function num2()
{
    info = 1;
    gamePlay();
}

function num3()
{
    info = 2;
    gamePlay();
}

function num4()
{
    info = 3;
    gamePlay();
}

function num5()
{
    info = 4;
    gamePlay();
}

function num6()
{
    info = 5;
    gamePlay();
}
