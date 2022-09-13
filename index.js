const selectColor = document.getElementById("select-color")
const selectMode = document.getElementById("select-mode")
const getColorsBtn = document.getElementById("get-colors-button")

numGridCols = 5;

function renderGridCols(num) {
    document.getElementById("color-grid").innerHTML = ""

    for (let i=1; i <= num; i++) {
        document.getElementById("color-grid").innerHTML += `
            <div>
                <div class="grid-col color" id="color-${i}"></div>
                <div class="color-info">
                    <p class="hex" id="hex-${i}"></p>
                </div>
            </div>`
    }
}

getColorsBtn.addEventListener("click", function() {
    
    //removes # from hex code so API can read it
    let hex = selectColor.value.slice(1)

    fetch(`https://www.thecolorapi.com/scheme?hex=${hex}&mode=${selectMode.value}&count=${numGridCols}`)
    .then (res => res.json())
    .then (data => {

        for (let i=0; i < data.colors.length; i++) {

            document.getElementById(`color-${i+1}`).style.backgroundColor = data.colors[i].hex.value;

            document.getElementById(`hex-${i+1}`).innerHTML = data.colors[i].hex.value
        }


    })
})

renderGridCols(numGridCols)