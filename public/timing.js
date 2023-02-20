
const onload = (() => {
    const canvas = document.createElement("canvas");
    //document.body.appendChild(canvas);

    var ctx = canvas.getContext("2d");


    //timing attack
    var timg = new Image();
    timg.onerror = function() {
        var end = window.performance.now();
        alert('Result: ' + (end - start));
    };
    var start = window.performance.now();
    timg.src = 'https://kassemfawaz.com';

})();