var textures = {};

function createButton() {
    textures.textureButton = PIXI.Texture.fromImage('buttons/btn_out.png');
    textures.textureButtonDown = PIXI.Texture.fromImage('buttons/btn_down.png');
    textures.textureButtonOver = PIXI.Texture.fromImage('buttons/btn_over.png');

    var button = new PIXI.Sprite(textures.textureButton);

    // make the button interactive...
    button.interactive = true;
    button.buttonMode = true;

    button.on('pointerdown', onButtonDown)
        .on('pointerup', onButtonUp)
        .on('pointerupoutside', onButtonUp)
        .on('pointerover', onButtonOver)
        .on('pointerout', onButtonOut);

    return button;
}

function onButtonDown() {
    this.isdown = true;
    this.texture = textures.textureButtonDown;
    this.alpha = 1;
}

function onButtonUp() {
    this.isdown = false;
    if (this.isOver) {
        this.texture = textures.textureButtonOver;
    }
    else {
        this.texture = textures.textureButton;
    }
}

function onButtonOver() {
    this.isOver = true;
    if (this.isdown) {
        return;
    }
    this.texture = textures.textureButtonOver;
}

function onButtonOut() {
    this.isOver = false;
    if (this.isdown) {
        return;
    }
    this.texture = textures.textureButton;
}
