// @flow

const BACKGROUND_COLOR = [0, 0, 0, 1];

class SimpleGame {
  canvas: HTMLCanvasElement;
  gl: WebGLRenderingContext;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    const gl = this.canvas.getContext("webgl");
    if (!gl) {
      throw Error("Could not create webgl context.");
    }
    this.gl = gl;
  }

  test() {
    this.gl.clearColor(...BACKGROUND_COLOR);
    this.gl.clear(this.gl.COLOR_BUFFER_BIT);
  }
}

const canvas = document.getElementById("webGL");
if (canvas instanceof HTMLCanvasElement) {
  const game = new SimpleGame(canvas);
  game.test();
}
