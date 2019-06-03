import 'phaser';

class Player extends Phaser.GameObjects.Sprite {

  constructor(scene, x, y, key, type) {
    super(scene, x, y, key);
    this.scene = scene;
    this.scene.add.existing(this);
    this.scene.physics.world.enableBody(this, 0);
    this.setData('isDead', false);
    this.setData('speed', 20);
  }

  moveUp() {
    this.body.velocity.y = -this.getData('speed');
  }

  moveDown() {
    this.body.velocity.y = this.getData('speed');
  }

  moveLeft() {
    this.body.velocity.x = -this.getData('speed');
  }

  moveRight() {
    this.body.velocity.x = this.getData('speed');
  }

  update() {
    this.body.setVelocity(0, 0);
  }
}

export default class GameScene extends Phaser.Scene {
  constructor () {
    super('Game');
  }

  preload () {
    this.load.image('tiles', 'assets/sci-fi-environment-tileset.png');
    this.load.tilemapTiledJSON('map', 'assets/duneBackground.json');
    this.load.spritesheet('playerRun', 'assets/space-marine/PNG/space-marine-run.png', { frameWidth: 48, frameHeight: 48 }, 11);
    this.load.spritesheet('playerIdle', 'assets/space-marine/PNG/space-marine-idle.png', { frameWidth: 48, frameHeight: 48 }, 4);
    this.load.spritesheet('playerJump', 'assets/space-marine/PNG/space-marine-jump.png', { frameWidth: 36, frameHeight: 36 }, 6);
    this.load.spritesheet('playerShoot', 'assets/space-marine/PNG/space-marine-shoot.png', { frameWidth: 64, frameHeight: 48 }, 2);
    this.load.spritesheet('playerDie', 'assets/space-marine/PNG/space-marine-die.png', { frameWidth: 80, frameHeight: 48 }, 4);
  }

  create () {

    //Background
    var map = this.make.tilemap({key: 'map'});
    var tileset = map.addTilesetImage('dune-tileset', 'tiles');
    var backgroundLayer = map.createStaticLayer('Background', tileset, 0, 0);
    var buildingsLayer = map.createStaticLayer('Buildings n Such', tileset, 0, 0);
    var detailsLayer = map.createStaticLayer('Deets', tileset, 0, 0);
    var foregroundLayer = map.createStaticLayer('Foreground', tileset, 0, 0);
    foregroundLayer.setCollisionByProperty({ collides: true });
    
    //Instantiate Player
    this.player = new Player(this, this.game.config.width * 0.5, this.game.config.height * 0.5, 'playerRun');
    console.log(this.player);

    //Add Buttons
    this.keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
    this.keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
    this.keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    this.keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    this.keyUp = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
    this.keyDown = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
    this.keyLeft = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
    this.keyRight = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
    this.keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

  }

  update() {
    if (this.keyW.isDown || this.keyUp.isDown) {
      this.player.moveUp();
    } else if (this.keyS.isDown || this.keyDown.isDown) {
      this.player.moveDown();
    }
    if (this.keyA.isDown || this.keyLeft.isDown) {
      this.player.moveLeft();
    } else if (this.keyD.isDown || this.keyRight.isDown) {
      this.player.moveRight();
    }
  }
};
