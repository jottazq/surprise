const snoopyWords = ["snoopy","spupi","esnupi","sbupy","inupi"];
const kittyWords = ["hello kitty","kitty","gatinha"];

const snoopyGif = "https://media.tenor.com/07oyG_DHsmEAAAAj/snoopy-peep.gif";
const kittyGif = "https://media4.giphy.com/media/v1.Y2lkPTZjMDliOTUyZ3Y0bnE3dGliajduNnY4dHlpeGtjMjZlaXEwZ2RoZGI3MndweGlzeCZlcD12MV9pbnRlcm5hbF9naWZfaWQmY3Q9Zw/kZqbBT64ECtjy/giphy.gif";

const container = document.getElementById("container");
const gif = document.getElementById("gif");
const vignette = document.getElementById("vignette");

function wait(ms){
    return new Promise(r => setTimeout(r, ms));
}

async function setTheme(theme){

    document.body.className = theme;

    gif.style.opacity = "0";

    await wait(150);

    gif.src = "";

    await wait(50);

    gif.src = theme === "dark" ? snoopyGif : kittyGif;

    await wait(80);

    gif.style.opacity = "1";
}

async function showWords(words, theme){

    container.innerHTML = "";

    const elements = words.map(text => {
        const el = document.createElement("div");
        el.className = "palavra";
        el.textContent = text;
        container.appendChild(el);
        return el;
    });

    await wait(50);

    const speed = theme === "dark" ? 550 : 750;
    const finalWait = theme === "dark" ? 1500 : 2200;

    for(const el of elements){
        el.classList.add("show");
        await wait(speed);
    }

    await wait(finalWait);
}

async function transition(){

    gif.style.opacity = "0";

    vignette.classList.add("expand");

    await wait(1200);

    vignette.classList.remove("expand");

    gif.style.opacity = "1";
}

async function loop(){

    while(true){

        await setTheme("dark");
        await showWords(snoopyWords, "dark");
        await transition();

        await setTheme("light");
        await showWords(kittyWords, "light");
        await transition();
    }
}

loop();