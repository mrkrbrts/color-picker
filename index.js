const selectColor = document.getElementById("select-color")
const selectMode = document.getElementById("select-mode")
const selectNumber = document.getElementById("select-number")
const getColorsBtn = document.getElementById("get-colors-button")

function renderGridCols(num) {
    document.getElementById("color-grid").innerHTML = ""

    for (let i=1; i <= num; i++) {
        document.getElementById("color-grid").innerHTML += `
            <div>
                <div class="grid-col color" id="color-${i}"></div>
                <div class="color-info">
                    <button class="hex" id="hex-${i}"></button>
                </div>
            </div>`    
    }
}

getColorsBtn.addEventListener("click", function() {
    if (selectNumber.value > 0) {
        renderGridCols(selectNumber.value)
    
        //removes # from hex code so API can read it
        let hex = selectColor.value.slice(1)
    
        fetch(`https://www.thecolorapi.com/scheme?hex=${hex}&mode=${selectMode.value}&count=${selectNumber.value}`)
        .then (res => res.json())
        .then (data => {
    
            for (let i=0; i < data.colors.length; i++) {
    
                document.getElementById(`color-${i+1}`).style.backgroundColor = data.colors[i].hex.value;
    
                document.getElementById(`hex-${i+1}`).innerHTML = data.colors[i].hex.value
            }
            
        })
    } else {
        alert("Please enter how many colors you want generated")
    }
})
