//Funktion som körs då fönstret har laddats
window.onload = function () {
    getLatestComic();
}
//Funktion för att hämta information från xkcd serien
function getComic(which) {
    fetch(`https://xkcd.vercel.app/?comic=${which}`)
        .then(response => {
            if (response.status === 200) {
                return response.json();
            }
        })
        .then(data => {
            updateComic(data);
        })
}
//Funktion som uppdaterar informationen med hjälp av xkcds api
function updateComic(data) {
    let mainComic = document.getElementById('mainComic');
    let titleComic = document.getElementById('titleComic');
//Rensar innehållet då ny information laddas
    mainComic.innerHTML = '';
    titleComic.innerHTML = '';
//Lägger till titel
    let title = document.createElement('H1');
    title.innerHTML = data.title;
    titleComic.appendChild(title);
//Lägger till datum
    let date = document.createElement('p');
    date.innerHTML = `${data.day}.${data.month}.${data.year}`;
    mainComic.appendChild(date);
//Lägger till bilden
    let img = document.createElement('img');
    img.src = data.img;
    img.alt = data.alt;
    mainComic.appendChild(img);

    let infoComic = document.getElementById('infoComic');
//Lägger till seriens nummer
    let num = document.createElement('p');
    num.innerHTML = data.num;

    mainComic.appendChild(num);
    currentComicNum = data.num;
}
//Funktion för att hämta den senaste serien
function getLatestComic() {
    fetch('https://xkcd.vercel.app/?comic=latest')
        .then(response => {
            if (response.status === 200) {
                return response.json();
            }
        })
        .then(latestComic => {
            getComic(latestComic.num.toString());
        })
        .catch(error => {
            console.error('Error fetching latest comic:', error);
        });
}
//Funktion som hämtar den första serien
function getFirstComic() {
    getComic('1');
}
//Funktion för att hämta en slumpmässig serie
function getRandomComic() {
    fetch('https://xkcd.vercel.app/?comic=latest')
        .then(response => {
            if (response.status === 200) {
                return response.json();
            }
        })
        .then(latestComic => {
            const randomComicNum = Math.floor(Math.random() * latestComic.num) + 1;
            getComic(randomComicNum.toString());
        })
        .catch(error => {
            console.error('Error fetching random comic:', error);
        });
}
//Funktion som hämtar föregående serie
function getPreviousComic() {
    if (currentComicNum > 1) {
        const previousNum = currentComicNum - 1;
        getComic(previousNum.toString());
    }
}
//Funktion för att hämta nästa serie
function getNextComic() {
    if (currentComicNum !== null) {
        fetch('https://xkcd.vercel.app/?comic=latest')
            .then(response => {
                if (response.status === 200) {
                    return response.json();
                }
            })
            .then(latestComic => {
                if (currentComicNum < latestComic.num) {
                    const nextNum = currentComicNum + 1;
                    getComic(nextNum.toString());
                }
            })
    }
}
