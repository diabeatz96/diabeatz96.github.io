const button = document.querySelector('button');
const h3 = document.querySelector('.display-6');
const h4 = document.querySelector('.display-4');
const list = document.querySelector('.list-group');
let isActive = true;
let clickCount = 0;
const highScores = [];




button.addEventListener("click", function() {
    button.classList.add("disabled");
    isActive = true;
    if(isActive === true) {
        startKeyboard();
    }
    timer(10);
})


function timer(duration) {
    let timer = duration, seconds;
    let start = setInterval(function () {
        seconds = parseInt(timer % 60, 10);
        seconds = seconds < 10 ? "0" + seconds : seconds;
        h3.innerHTML = seconds;

            if(--timer < 0) {
                button.classList.remove("disabled");
                isActive = false;
                highScores.push(clickCount);
                h3.innerHTML = "High Scores Listed Below!!!";
                document.removeEventListener('keydown', startKeyboard);
                listAppend();
                stopInterval(start);
        }

    }, 1000);

}

function stopInterval(interval) {
    clearInterval(interval)
}

function startKeyboard () {
    document.addEventListener('keydown', function (e) {
        if(e.code !== "KeyA") {
            h4.innerHTML = "WRONG KEY CLICK A";
            return;
        }

        if(e.code === "KeyA" && isActive === true) {
            clickCount++;
            h4.innerHTML = "Score: " + clickCount;
        } else {
            clickCount = 0;
            h4.innerHTML = "Score: " + clickCount;
        }
    })
}

function listAppend() {
    const newLi = document.createElement('LI')
    newLi.classList.add("list-group-item");
    newLi.innerText = `${highScores[highScores.length - 1]}`;
    list.append(newLi);
}