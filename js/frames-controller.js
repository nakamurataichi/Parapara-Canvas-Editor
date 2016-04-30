const Frame = require("./frame");

// frame の追加・削除と、DOM上でのCanvasの追加・削除を連動させる
function FramesController(elem, config) {
  this.element = elem;
  this.frames = [];
  this.currentFrameId = 0;
  this.config = config;
}

// パラメータ id は、将来的にどこにframeをappendするかで必要。
FramesController.prototype.append = function(id, frameId) {
  if (typeof frameId !== "number") {
    throw new Error("FrameServerに追加しようとしたFrameの、FrameIdは不正です。:" + frameId);
  }
  const frame = new Frame(frameId, this.config);
  this.element.appendChild(frame.canvasElement);
  // 今はいいが、あとで splice に変える
  this.frames.push(frame);
};

FramesController.prototype.remove = function() {

};

FramesController.prototype.setCurrentFrame = function(frameId) {
  this.currentFrameId = frameId;
  // Todo: ここでUI（display: blockのCanvasの切り替え）もやっていいのか
  if (document.querySelector(".current-canvas") !== null) {
    document.querySelector(".current-canvas")
      .classList.remove("current-canvas");
  }
  this.getCurrentFrame().canvasElement.classList.add("current-canvas");
};

FramesController.prototype.getFrameById = function(frameId) {
  return this.frames[frameId];
};

FramesController.prototype.getCurrentFrame = function() {
  return this.frames[this.currentFrameId];
};
module.exports = FramesController;
