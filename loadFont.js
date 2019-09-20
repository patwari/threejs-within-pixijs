// // Load them google fonts before starting...!
window.WebFontConfig = {
    google: {
        families: ['Snippet', 'Arvo:700italic', 'Podkova:700'],
    },

    active() {
        initCustomFont();
    },
};
/* eslint-disable */
// include the web-font loader script
(function () {
    const wf = document.createElement('script');
    wf.src = `${document.location.protocol === 'https:' ? 'https' : 'http'
        }://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js`;
    wf.type = 'text/javascript';
    wf.async = 'true';
    const s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(wf, s);
}());
/* eslint-enabled */



/** Add custom text */
var basicText1;
function initCustomFont() {
    // create some white text using the Snippet webfont
    basicText1 = new PIXI.Text('Si vis pacem', {
        fontFamily: 'Snippet',
        fontSize: 80,
        fill: 'white',
        align: 'center',
        stroke: "#960000",
        strokeThickness: 10,
        miterLimit: 3
    });
    basicText1.anchor.set(0.5, 0);
    basicText1.position.set(500, 10);
    pixiApp.stage.addChildAt(basicText1, 1);

    resize();
}
