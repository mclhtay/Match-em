export const drawLine = (width: number, height: number, path: string[], start: number) => {
  var canvas = <HTMLCanvasElement>document.getElementById("lineCanvas");
  var ctx = canvas.getContext("2d");
  if (ctx !== null) {
    ctx.beginPath();
    var x = 0;;
    var y = 0;
    height = height - height * 0.1;
    if (path[0] === 'UP') {
      x = (start % 8) * width + (Math.floor(width / 2));
      y = (start / 8) * height;
    }
    else if (path[0] === 'LEFT') {
      x = (start % 8) * width;
      y = (start / 8) * height + (Math.floor(height / 2));
    }
    else if (path[0] === 'DOWN') {
      x = (start % 8) * width + (Math.floor(width / 2));
      y = (start / 8) * height + height;
    } else if (path[0] === 'RIGHT') {
      x = (start % 8) * width + width;
      y = (start / 8) * height + (Math.floor(height / 2));
    }
    ctx.moveTo(x, y);

    for (let i = 0; i < path.length; i++) {
      if (i === path.length - 1) break;
      if (path[i] === 'UP') {
        ctx.lineTo(x, y - (Math.floor(height / 2)));
        y = y - (Math.floor(height / 2));
      }
      else if (path[i] === 'LEFT') {
        ctx.lineTo(x - (Math.floor(width / 2)), y);
        x = x - (Math.floor(width / 2));
      } else if (path[i] === 'DOWN') {
        ctx.lineTo(x, y + (Math.floor(height / 2)));
        y = y + (Math.floor(height / 2));
      } else if (path[i] === 'RIGHT') {
        ctx.lineTo(x + (Math.floor(width / 2)), y);
        x = x + (Math.floor(width / 2));
      }
      if (path[i + 1] === 'UP') {
        ctx.lineTo(x, y - (height / 2));
        y = y - (Math.floor(height / 2));
      }
      else if (path[i + 1] === 'LEFT') {
        ctx.lineTo(x - (Math.floor(width / 2)), y);
        x = x - (Math.floor(width / 2));
      } else if (path[i + 1] === 'DOWN') {
        ctx.lineTo(x, y + (Math.floor(height / 2)));
        y = y + (Math.floor(height / 2));
      } else if (path[i + 1] === 'RIGHT') {
        ctx.lineTo(x + (Math.floor(width / 2)), y);
        x = x + (Math.floor(width / 2));
      }

    }
    ctx.stroke();

    setTimeout(() => {
      ctx?.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);
    }, 200)


  }
}