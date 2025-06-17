const QRCode = require("qrcode");
// QRCode.toFile("./code.png", "Joelle is Chris's LOVE",(err)=> {
//     if(err) {
//         console.log(err);
//     }
// });


QRCode.toDataURL("Joelle is Chris's LOVE",{
    width: 128,
    height: 128,
    errorCorrectionLevel: "high",
    color:{
        dark: 212,
        light: 189
    }

},(err, url)=> {
    if(err) {
        console.log(err);
    }
    console.log(url);
    // This url can be display under img tag, can also be access directly in browser. 
});
