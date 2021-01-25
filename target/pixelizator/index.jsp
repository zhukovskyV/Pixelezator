<html>
<link rel="stylesheet" href="cssPage.css">
<link rel="icon" href="data:;base64,=">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Pixy</title>
</head>

<body>
<h1>Pixelizator offline</h1>
<div class="input">
    <label class="forformelem " for="fileUploader">
        Choose image to upload
    </label><br>
    <input type="file" value="upload" id="fileUploader" name="file" accept="image/*" width="500" height="600" onchange="updateImageDisplay">
</div>
<br>
<div class="inputData">
    <label for="pixSize">Pixel size:</label>
    <input type="text" id="pixSize">
    <button id="applyButton">Pixelizate</button>
    <div class="download">
    <label for="types">Download type:</label>
    <select name="type" id="types">
        <option value="tiff">tiff</option>
        <option value="bmp">bmp</option>
        <option value="png">png</option>
        <option value="jpeg">jpeg</option>
        <option value="jpg">jpg</option>
    </select>
    <button id="downloadBtn">download</button>
    </div>
</div>
    <div class="firstImageBlock">
        <img class="img1" id="forInput" src="" alt="Input">
    </div>
    <div class="secondImageBlock">
        <img class="img2" id="forOutput" src="" alt="Output">
    </div>
<script src="js/fetch.js"></script>
</body>
</html>
