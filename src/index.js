import 'phaser';
import pkg from 'phaser/package.json';
import greenTile from 'img/green_tile.png';
import zTile from 'img/z_tile.png';

import Zavrio from 'img/zavrio.png';

import buttonSpace from 'img/btn_space.png';
import controls from 'img/controls.png';
import controlRight from 'img/control_right.png';
import controlLeft from 'img/control_left.png';



const width = 1000;
const height = 560;

const config = {
  width,
  height,
  type: Phaser.AUTO,
  physics: {
    default: 'arcade',
    arcade: {
        gravity: { y: 300 },
        debug: false
    }
  },
  scene: { preload, create, update },
};

const game = new Phaser.Game(config);

let platforms, player, cursors, buttons;

let up = false, left = false, right = false;

function preload() {

  this.load.image('green_tile', greenTile);
  this.load.image('z_tile', zTile);
  this.load.image('zavrio', Zavrio);

  this.load.image('btn_space', buttonSpace);

  this.load.image('controls', controls);
  this.load.image('control_right', controlRight);
  this.load.image('control_left', controlLeft);

}

function create() {
  const centerX = width / 2;
  const centerY = height / 2;
  const scoreText = `Score: ${0}`;
  this.add
    .text(10, 10, scoreText, { font: "bold 19px Arial", fill: "#fff" })
  //  .setOrigin(0.5, 0.5);

  platforms = this.physics.add.staticGroup();

  //this.add.image(centerX, centerY * 1.2, 'green_tile');

  platforms.create(-50, 500, 'green_tile')/*.setScale(0.5)*/.refreshBody();

  platforms.create(375, 480, 'z_tile')/*.setScale(0.8)*/.refreshBody();
  platforms.create(500, 480, 'z_tile')/*.setScale(0.8)*/.refreshBody();
  platforms.create(625, 480, 'z_tile')/*.setScale(0.8)*/.refreshBody();

  platforms.create(1050, 500, 'green_tile')/*.setScale(0.5)*/.refreshBody();


  player = this.physics.add.sprite(50, 350, 'zavrio');

  player.setBounce(0.2);
  player.setCollideWorldBounds(true);

  player.body.setGravityY(300);

  this.physics.add.collider(player, platforms);

  cursors = this.input.keyboard.createCursorKeys();


  buttons = this.physics.add.staticGroup();

  const upButton = buttons.create(100, 510, 'btn_space'); //this.add.text(100, 100, 'Hello Phaser!', { fill: '#0f0' });
  upButton.setInteractive({ useHandCursor: true })
             .on('pointerdown', () => up = true )
             .on('pointerup', () => up = false );


  this.add.image(910, 470, 'controls');

  const rightButton = buttons.create(960, 470, 'control_right'); //this.add.text(100, 100, 'Hello Phaser!', { fill: '#0f0' });
  rightButton.setInteractive({ useHandCursor: true })
             .on('pointerdown', () => right = true )
             .on('pointerup', () => right = false );


  const leftButton = buttons.create(860, 470, 'control_left'); //this.add.text(100, 100, 'Hello Phaser!', { fill: '#0f0' });
  leftButton.setInteractive({ useHandCursor: true })
             .on('pointerdown', () => left = true )
             .on('pointerup', () => left = false );


  

 
}

function update() {

  if (cursors.left.isDown || left)
  {
      player.setVelocityX(-200);

    //  player.anims.play('left', true);
  }
  else if (cursors.right.isDown || right)
  {
      player.setVelocityX(200);

    //  player.anims.play('right', true);
  }
  else
  {
      player.setVelocityX(0);

     // player.anims.play('turn');
  }

  if ( (cursors.up.isDown||up) && player.body.touching.down)
  {
      player.setVelocityY(-430);
  }


}

