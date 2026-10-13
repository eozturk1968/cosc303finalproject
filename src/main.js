//Make sure pieces are in place
//This 4 in the loop can later be changed to how many elements is to be stored in that hole.
// We can keep track of that with an array (board) that stores how many elements should be in each hole. That can then be printed.
const el1 = document.getElementById('element1');
for(let i = 0; i < 4; i++)
{
    const img = document.createElement('img');
    img.src = '../assets/images/circle.svg';
    img.width = '15';
    el1.appendChild(img);
}

const el2 = document.getElementById('element2');
for(let i = 0; i < 4; i++)
{
    const img = document.createElement('img');
    img.src = '../assets/images/circle.svg';
    img.width = '15';
    el2.appendChild(img);
}

const el3 = document.getElementById('element3');
for(let i = 0; i < 4; i++)
{
    const img = document.createElement('img');
    img.src = '../assets/images/circle.svg';
    img.width = '15';
    el3.appendChild(img);
}

