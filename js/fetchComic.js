let currentComicNum = 0;

window.onload = function () {
    getLatestComic();
}

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

function updateComic(data) {
    let mainComic = document.getElementById('mainComic');

    mainComic.innerHTML = '';

    let title = document.createElement('H1');
    title.innerHTML = data.title;
    mainComic.appendChild(title);

    let date = document.createElement('p');
    date.innerHTML = `${data.day}.${data.month}.${data.year}`;
    mainComic.appendChild(date);

    let img = document.createElement('img');
    img.src = data.img;
    img.alt = data.alt;
    mainComic.appendChild(img);

    let infoComic = document.getElementById('infoComic');

    let num = document.createElement('p');
    num.innerHTML = data.num;

    mainComic.appendChild(num);
    currentComicNum = data.num;
}

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

function getFirstComic() {
    getComic('1');
}

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

function getPreviousComic() {
    if (currentComicNum > 1) {
        const previousNum = currentComicNum - 1;
        getComic(previousNum.toString());
    }
}

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
