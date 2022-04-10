
const mieImg = ["arrabbiato", "bello", "piangere", "ridere", "amare", "amare1", "spavento", "shock", "arrabbiato", "bello",
"piangere", "ridere", "amare", "amare1", "spavento", "shock"
];

let arrayComparison = [];
let iconsFind = [];
let interval;
let find = $(".find")
let modal = $("modal");
let numeroClick = 0;


function shuffle(a) {
var currentIndex = a.length;
var temporaryValue, randomIndex;

while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = a[currentIndex];
    a[currentIndex] = a[randomIndex];
    a[randomIndex] = temporaryValue;
}
return a;
}

function startGame() {
numeroClick = 0
$(".numeroClick").text("Click: " + numeroClick)
let cards = shuffle(mieImg);
let container = $("#griglia");
container.text("");
cards.forEach((value) => {
    let card = $("<img />").attr('src', "./img/" + value + ".png")
    card.attr("draggable", false)
    let wrapper = $("<div></div>")
    card.addClass("icon")
    card.on("click", displayIcon)
    card.appendTo(wrapper)
    wrapper.appendTo("#griglia")
})
}



function displayIcon() {
numeroClick++
$(".numeroClick").text("Click: " + numeroClick)
var icon = $(".icon")
var icons = [...icon];
$(this).parent().toggleClass("show");
$(this).parent().toggleClass("disabled");
$(this).toggleClass("show");
arrayComparison.push(this);
var len = arrayComparison.length;

if (len === 2) {
    if (arrayComparison[0].src === arrayComparison[1].src) {
        $(arrayComparison[0]).parent().addClass("find disabled");
        $(arrayComparison[1]).parent().addClass("find disabled");
        $(arrayComparison[0]).addClass("find disabled");
        $(arrayComparison[1]).addClass("find disabled");
        iconsFind = [...iconsFind, ...arrayComparison]
        arrayComparison = [];
        if (iconsFind.length == mieImg.length) {
            vittoria()
        }
    } else {

        icons.forEach(function(item) {
            $(item).addClass('disabled');
        });

        setTimeout(function() {
            $(arrayComparison[0]).parent().removeClass("show");
            $(arrayComparison[1]).parent().removeClass("show");
            $(arrayComparison[0]).parent().removeClass("disabled");
            $(arrayComparison[1]).parent().removeClass("disabled");
            $(arrayComparison[0]).removeClass("show");
            $(arrayComparison[1]).removeClass("show");
            $(arrayComparison[0]).removeClass("disabled");
            $(arrayComparison[1]).removeClass("disabled");
            icons.forEach(function(item) {
                $(item).removeClass('disabled');
                for (var i = 0; i < iconsFind.length; i++) {
                    $(iconsFind[i]).addClass("disabled");
                }
            });
            arrayComparison = [];
        }, 700);
    }
}

}

function playAgain() {
$("#modal").removeClass("active")
startGame()
}

$(() => {
startGame()
})