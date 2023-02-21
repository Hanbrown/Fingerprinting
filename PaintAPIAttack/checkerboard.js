class CheckerboardPainter {
    paint(ctx, geom, properties) {
      // Use `ctx` as if it was a normal canvas
      const colors = ['yellow', 'orange', 'blue'];
      const size = 32;
      for(let y = 0; y < geom.height/size; y++) {
        for(let x = 0; x < geom.width/size; x++) {
          const color = colors[(x + y) % colors.length];
          ctx.beginPath();
          ctx.fillStyle = color;
          ctx.rect(x * size, y * size, size, size);
          ctx.fill();
        }
      }
      updateCounter();
    }
  }
  
let counter = 0;
const updateCounter = () => {
  //setTimeout(() => {
    counter++;
    console.log(counter);
  //}, 5000);
  
}
  // Register our class under a specific name
  registerPaint('checkerboard', CheckerboardPainter);