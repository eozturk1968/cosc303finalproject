//Global variables
let info; // User input variable on which pot they want to move
let nums = [4,4,4,4,4,4,4,4,4,4,4,4]; //nums[0 - 5] = Player, nums[6 - 11] = AI
let scoreRegion = [0,0]; //scoreRegion[0] = AI, scoreRegion[1] = Player
let mode; //Difficulty mode. (Easy: 0, Medium: 1, Hard: 2)
let winner; //Variable to store winner (0: AI, 1: Player);

//Function to set number of tiles based on nums array.
function setTiles()
{
    //Make sure pieces are in place
    //This 4 in the loop can later be changed to how many elements is to be stored in that hole.
    // We can keep track of that with an array (board) that stores how many elements should be in each hole. That can then be printed accordingly.
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

/*
//Accept user input of which circle to move and store it in global variable (that can be access anywhere), info.
function getData()
{
    let data = document.getElementById("moveBox");
    info = data.value;
    document.getElementById("moveBox").value = '';
}
*/
//Set difficulty mode
function eMode()
{
    mode = 0;
}

function mMode()
{
    mode = 1;
}

function hMode()
{
    mode = 2;
}

//Main function that runs game. 
function gamePlay()
{   
    //Let user move first. Get user entry with getData() function from the textbox.
    //Move pieces accordingly by editing nums and scoreRegion. Reprint with setTiles() function. 
    //Run computer player.
    //Move pieces and reprint again. 

    //Need to implement check to decide if gameplay is over or not. 

    //Implement user gameplay and interaction

    let temp = info;
    let area = 1;
    let total = nums[info];
    //Replace tiles as they should be.
    //Need to fix bug where user pit is properly skipped and stones are looped around. 
    for(let i = 0; i < total; i++)
    {
        if(temp == 5 && area == 1)
        {
            scoreRegion[1] += 1;
            area = 0;
            nums[info]--;
        }
        else
        {
            temp++;
            area = 1;
            nums[temp] += 1;
            nums[info]--;
        }

        if(i == total-1 && area == 0)
        {
            setTiles(); 
            alert("User goes again! Please renter next move.");
            //Skip AI since user is going again.
        }

        //Steal opponents when finishing in an empty store.
        else if(i == total-1 && nums[temp] == 1 && nums[11-temp] > 0)
        {
            scoreRegion[1] += nums[temp] + nums[11-temp];
            nums[temp] = 0;
            nums[11-temp] = 0;
            setTiles();

            //call AI to make move here.
        }

        else if(i == total-1)
        {
            setTiles(); 
            //call AI to make move here.
        }
    }

    if(nums[0] == 0 && nums[1] == 0 && nums[2] == 0 && nums[3] == 0 && nums[4] == 0 && nums[5] == 0)
    {
        alert("Your pockets are empty! Opponent now places theirs in their own region.")
        for(let i = 6; i < 12; i++)
        {
            scoreRegion[0] += nums[i];
            nums[i] = 0;
        }
        setTiles();
        if(scoreRegion[0] > scoreRegion[1])
            winner = 0;
        else if(scoreRegion[1] > scoreRegion[0])
            winner = 1;
        alert("Game is now over. Let's see who wins!")
        gameWinner();
    }
}

//Make game winner visible
function gameWinner()
{
    var t1 = document.getElementById("board");
    t1.style.visibility = 'hidden';

    var t3 = document.getElementById("win");
    var t4 = document.createElement("h2");
    if(winner == 0)
    {
        const t5 = document.createTextNode("YOU LOST!");
        t4.appendChild(t5);
        t3.appendChild(t4);
    }
    else if(winner == 1)
    {
        const t5 = document.createTextNode("YOU WON!");
        t4.appendChild(t5);
        t3.appendChild(t4);
    }
    t3.style.visibility = 'visible';
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
})

//Hide easy button after it is pressed.
var but2 = document.getElementById("easy");
but2.addEventListener('click', () => 
{
    but2.style.visibility = 'hidden';
    const rest = document.getElementById("restart");
    const modes2 = document.getElementById("med");
    const modes3 = document.getElementById("diff");
    rest.style.visibility = 'visible';
    modes2.style.visibility = 'hidden';
    modes3.style.visibility = 'hidden';
})

//Hide medium button after it is pressed.
var but3 = document.getElementById("med");
but3.addEventListener('click', () => 
{
    but3.style.visibility = 'hidden';
    const rest = document.getElementById("restart");
    const modes2 = document.getElementById("easy");
    const modes3 = document.getElementById("diff");
    rest.style.visibility = 'visible';
    modes2.style.visibility = 'hidden';
    modes3.style.visibility = 'hidden';
})

//Hide Difficult button after it is pressed.
var but4 = document.getElementById("diff");
but4.addEventListener('click', () => 
{
    but4.style.visibility = 'hidden';
    const rest = document.getElementById("restart");
    const modes2 = document.getElementById("easy");
    const modes3 = document.getElementById("med");
    rest.style.visibility = 'visible';
    modes2.style.visibility = 'hidden';
    modes3.style.visibility = 'hidden';
})


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
