const express = require("express");
const router = express.Router();
const path = require("path")

const { Jimp } = require("jimp");

async function mark(waterFile, originalFile, target, proportion = 5, marginProportion = 0.01) {
    const [water, original] = await Promise.all([Jimp.read(waterFile), Jimp.read(originalFile)]);
    //Zoom out of the waterMark picture:
    const curProportion = original.bitmap.width / water.bitmap.width;
    water.scale(curProportion / proportion);

    //calculate bottom right location:
    const right = original.bitmap.width * marginProportion;
    const bottom = original.bitmap.height * marginProportion;

    const x = original.bitmap.width - right - water.bitmap.width;
    const y = original.bitmap.height - bottom - water.bitmap.height;

    //write the watermark
    original.composite(water, x, y, {
        mode: "srcOver",
        opacitySource: 0.5,
    });

    await original.write(target)
}


router.get("/:filename", (req, res) => {
    const absPath = path.resolve(__dirname, `../../resources`, req.params.filename)
    const waterPath = path.resolve(__dirname, "../../public/waterChrisyo.png");
    // const orginalPath = path.resolve(__dirname, "./orginal.jpg");
    const targetPath = path.resolve(__dirname, "../../resources/new.jpg");
    mark(waterPath, absPath, targetPath).then(() => {
        res.download(targetPath, req.params.filename);
    });

})


module.exports = router;