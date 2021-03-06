const url = 'http://localhost:8080/upload';
const imgOut = document.getElementById("forOutput");
const imgIn = document.getElementById("forInput");
const applyBtn = document.getElementById("applyButton")
const downBtn = document.getElementById("downloadBtn")
const typeDwn = document.getElementById("types")
fileUploader.addEventListener('change', updateImageDisplay);

function updateImageDisplay(event) {
    imgIn.src = URL.createObjectURL(event.target.files[0]);
}

downBtn.addEventListener('click', () => {
    if (imgOut.getAttribute("src")) {
        const name = "pixypix." + typeDwn.value;
        let downloadTag = document.createElement('a');
        downloadTag.setAttribute('download', name);
        downloadTag.setAttribute('href', imgOut.src);
        downloadTag.click();
        downloadTag.remove();
    }
    else alert("Nothing to download")
});

applyBtn.addEventListener('click', async function () {
    const formData = new FormData();
    const fileField = document.querySelector('input[type="file"]');

    if (fileField.files[0] != null && fileField.files[0].size > 0) {
        const pixSize = document.getElementById("pixSize").value;
        const pixRegex = new RegExp('[1-9]{1}[0-9]*');
        let regexResult = pixSize.match(pixRegex);

        if (regexResult === null || regexResult[0].length !== pixSize.length
            || pixSize > 2147483647)
            alert("Choose 'Pixel size' from 1 to maximum of your image size");
        else {
            formData.append("file", fileField.files[0]);
            try {
                let response = await fetch(url, {
                    method: 'POST',
                    body: formData,
                    enctype: "multipart/form-data",
                    headers: {'pixSize': pixSize}
                });
                if (response.ok && pixSize > 0) {
                    const json = await response.json();
                    imgOut.setAttribute("src", "data:image/png;base64," + json.imageForOutput);
                    //alert("Pixelization done")
                }
            } catch (error) {
                console.error('Ya ebu', error);
            }
        }
    }
    else
        alert("You should to choose file")
});

function isDigit(num){
    return !isNaN(num)
}
