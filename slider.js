"use strict";

const track = document.getElementById("track");
const next = document.getElementById("next");
const prev = document.getElementById("prev");
const dotsBox = document.getElementById("dots");

const slides = Array.from(
    document.querySelectorAll(".slide")
);

const total = slides.length;

let index = 1;
let moving = false;

const firstClone = slides[0].cloneNode(true);
const lastClone = 
    slides[total - 1].cloneNode(true);

track.appendChild(firstClone);
track.prepend(lastClone);

slides.forEach((slide, i) => {

    const dot = document.createElement("button");

    dot.className = "dot";
    dot.type = "button";

    dot.setAttribute(
        "aria-label",
        `Go to slide ${i + 1}`
    );

    dot.addEventListener("click", () => {

        if (moving) return;

        index = i + 1;
        move(true);
    });

    dotsBox.appendChild(dot);
});

function move(animation = true) {

    track.style.transition = animation
        ? "transform 0.5s ease-in-out"
        : "none";

    track.style.transform =
        `translateX(-${index * 100}%)`;

    updateDots();
}

function updateDots() {

    let active = index - 1;

    if (index === 0) {
        active = total - 1;
    }

    if (index === total + 1) {
        active = 0;
    }

    document.querySelectorAll(".dot").forEach(
        (dot, i) => {

            dot.classList.toggle(
                "active",
                i === active
            );
        }
    );
}

next.addEventListener("click", () => {

    if (moving) return;

    moving = true;
    index++;
    move(true);
});

prev.addEventListener("click", () => {

    if (moving) return;

    moving = true;
    index--;
    move(true);
});

track.addEventListener(
    "transitionend",
    () => {

        if (index === total + 1) {
            index = 1;
            move(false);
        }

        if (index === 0) {
            index = total;
            move(false);
        }

        moving = false;
        updateDots();
    }
);

document.addEventListener("keydown", event => {

    if (event.key === "ArrowRight") {
        next.click();
    }

    if (event.key === "ArrowLeft") {
        prev.click();
    }
});

move(false);