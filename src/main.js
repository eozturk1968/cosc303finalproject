//GamePlay Function 
function startGame()
{
    const nums = [4,4,4,4,4,4,4,4,4,4,4,4];
    //Make sure pieces are in place
    //This 4 in the loop can later be changed to how many elements is to be stored in that hole.
    // We can keep track of that with an array (board) that stores how many elements should be in each hole. That can then be printed accordingly.
    const el1 = document.getElementById('element1');
    for(let i = 0; i < nums[0]; i++)
    {
        const img = document.createElement('img');
        img.src = '../assets/images/circle.svg';
        img.width = '15';
        el1.appendChild(img);
    }

    const el2 = document.getElementById('element2');
    for(let i = 0; i < nums[1]; i++)
    {
        const img = document.createElement('img');
        img.src = '../assets/images/circle.svg';
        img.width = '15';
        el2.appendChild(img);
    }

    const el3 = document.getElementById('element3');
    for(let i = 0; i < nums[2]; i++)
    {
        const img = document.createElement('img');
        img.src = '../assets/images/circle.svg';
        img.width = '15';
        el3.appendChild(img);
    }

    const el4 = document.getElementById('element4');
    for(let i = 0; i < nums[3]; i++)
    {
        const img = document.createElement('img');
        img.src = '../assets/images/circle.svg';
        img.width = '15';
        el4.appendChild(img);
    }

    const el5 = document.getElementById('element5');
    for(let i = 0; i < nums[4]; i++)
    {
        const img = document.createElement('img');
        img.src = '../assets/images/circle.svg';
        img.width = '15';
        el5.appendChild(img);
    }

    const el6 = document.getElementById('element6');
    for(let i = 0; i < nums[5]; i++)
    {
        const img = document.createElement('img');
        img.src = '../assets/images/circle.svg';
        img.width = '15';
        el6.appendChild(img);
    }

    const el7 = document.getElementById('element7');
    for(let i = 0; i < nums[6]; i++)
    {
        const img = document.createElement('img');
        img.src = '../assets/images/circle.svg';
        img.width = '15';
        el7.appendChild(img);
    }

    const el8 = document.getElementById('element8');
    for(let i = 0; i < nums[7]; i++)
    {
        const img = document.createElement('img');
        img.src = '../assets/images/circle.svg';
        img.width = '15';
        el8.appendChild(img);
    }

    const el9 = document.getElementById('element9');
    for(let i = 0; i < nums[8]; i++)
    {
        const img = document.createElement('img');
        img.src = '../assets/images/circle.svg';
        img.width = '15';
        el9.appendChild(img);
    }

    const el10 = document.getElementById('element10');
    for(let i = 0; i < nums[9]; i++)
    {
        const img = document.createElement('img');
        img.src = '../assets/images/circle.svg';
        img.width = '15';
        el10.appendChild(img);
    }

    const el11 = document.getElementById('element11');
    for(let i = 0; i < nums[10]; i++)
    {
        const img = document.createElement('img');
        img.src = '../assets/images/circle.svg';
        img.width = '15';
        el11.appendChild(img);
    }

    const el12 = document.getElementById('element12');
    for(let i = 0; i < nums[11]; i++)
    {
        const img = document.createElement('img');
        img.src = '../assets/images/circle.svg';
        img.width = '15';
        el12.appendChild(img);
    }

}

//Hide start button after it is pressed.
var but = document.getElementById("start");
but.addEventListener('click', () => 
{
    but.style.visibility = 'hidden';
    const modes = document.getElementById("easy");
    const modes2 = document.getElementById("med");
    const modes3 = document.getElementById("diff")
    modes.style.visibility = 'visible';
    modes2.style.visibility = 'visible';
    modes3.style.visibility = 'visible';
})






