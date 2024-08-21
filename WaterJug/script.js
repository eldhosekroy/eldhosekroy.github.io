let jug3 = 0;
let jug4 = 0;

function updateJugs() {
    const water3 = document.getElementById("water3");
    const water4 = document.getElementById("water4");

    water3.style.height = (jug3 / 3) * 100 + "%";
    water4.style.height = (jug4 / 4) * 100 + "%";

    checkWin();
}

function fillJug(jug) {
    if (jug === 3) {
        jug3 = 3;
    } else if (jug === 4) {
        jug4 = 4;
    }
    animateWater(jug);
    updateJugs();
}

function emptyJug(jug) {
    if (jug === 3) {
        jug3 = 0;
    } else if (jug === 4) {
        jug4 = 0;
    }
    animateWater(jug);
    updateJugs();
}

function transfer(fromJug, toJug) {
    if (fromJug === 3 && toJug === 4) {
        const transferAmount = Math.min(jug3, 4 - jug4);
        jug3 -= transferAmount;
        jug4 += transferAmount;
    } else if (fromJug === 4 && toJug === 3) {
        const transferAmount = Math.min(jug4, 3 - jug3);
        jug4 -= transferAmount;
        jug3 += transferAmount;
    }
    animateTransfer(fromJug, toJug);
    updateJugs();
}

function animateWater(jug) {
    const water = document.getElementById(`water${jug}`);
    water.classList.add("animate-fill");
    setTimeout(() => {
        water.classList.remove("animate-fill");
    }, 500);
}

function animateTransfer(fromJug, toJug) {
    const waterFrom = document.getElementById(`water${fromJug}`);
    const waterTo = document.getElementById(`water${toJug}`);
    waterFrom.classList.add("animate-transfer-out");
    waterTo.classList.add("animate-transfer-in");

    setTimeout(() => {
        waterFrom.classList.remove("animate-transfer-out");
        waterTo.classList.remove("animate-transfer-in");
    }, 500);
}

function checkWin() {
    const popup = document.getElementById("popup");
    if (jug4 === 2) {
        popup.style.display = "flex";
    }
}

function closePopup() {
    const popup = document.getElementById("popup");
    popup.style.display = "none";
}
