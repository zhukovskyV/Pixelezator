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
        console.log('value', imgOut.getAttribute("src"))
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
    const pixSize = document.getElementById("pixSize").value;

    if (fileField.files[0] != null && fileField.files[0].size > 0) {
        formData.append("file", fileField.files[0]);
        if (pixSize <= 0 && isDigit(pixSize))
            alert("Choose 'Pixel size' from 1 to maximum of your image size");
        else {
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
                    alert("Pixelization done")
                }
            } catch (error) {
                console.error('Ya ebu', error);
            }
        }
    }
});

function isDigit(num){
    return !isNaN(num)
}
