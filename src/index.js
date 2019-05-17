import 'phaser';
import pkg from 'phaser/package.json';

import bg from 'img/bg.png';
//import grid from 'img/grid.png';

import greenTile from 'img/green_tile.png';
import zTile from 'img/z_tile.png';

import xxxTile from 'img/xxx.png';

import Zavrio from 'img/zavrio.png';
import ZavrioAnim from 'img/zavrio_anim.png';

import buttonSpace from 'img/btn_space.png';
import controls from 'img/controls.png';
import controlRight from 'img/control_right.png';
import controlLeft from 'img/control_left.png';

import singleRect from 'img/rect_1.png';
import doubleRect from 'img/rect_2.png';

const width = 2666;
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

let platforms, player, cursors, buttons, spaceBar, movingPlatform, movingPlatform2;

let up = false, left = false, right = false;

function preload() {

  this.load.image('bg', bg);
 // this.load.image('grid', grid);

  this.load.image('green_tile', greenTile);
  this.load.image('z_tile', zTile);
  this.load.image('xxx_tile', xxxTile);

  this.load.image('zavrio', Zavrio);
  this.load.spritesheet('zavrio_anim', ZavrioAnim, { frameWidth: 80, frameHeight: 80 });

  this.load.image('btn_space', buttonSpace);

  this.load.image('controls', controls);
  this.load.image('control_right', controlRight);
  this.load.image('control_left', controlLeft);

  this.load.image('rect_1', singleRect);
  this.load.image('rect_2', doubleRect);

}

function create() {
  const centerX = width / 2;
  const centerY = height / 2;
  const scoreText = `Score: ${0}`;
  this.add
    .text(10, 10, scoreText, { font: "bold 19px Arial", fill: "#fff" })
  //  .setOrigin(0.5, 0.5);

  platforms = this.physics.add.staticGroup();

  console.log(game)

  this.add.image(0, 0, 'bg').setOrigin(0, 0);

  platforms.create(-40*9, 11*40, 'green_tile').setOrigin(0, 0).refreshBody();
  platforms.create(40*7, 11*40, 'z_tile').setOrigin(0, 0).refreshBody();
  platforms.create(40*10.5, 11*40, 'z_tile').setOrigin(0, 0).refreshBody();
  platforms.create(40*14, 11*40, 'z_tile').setOrigin(0, 0).refreshBody();
  platforms.create(40*17, 11*40, 'green_tile').setOrigin(0, 0).refreshBody();
  platforms.create(40*20, 8*40, 'rect_1').setOrigin(0, 0).refreshBody();
  platforms.create(24*40, 5*40, 'rect_2').setOrigin(0, 0).refreshBody();
  platforms.create(30*40, 5*40, 'rect_1').setOrigin(0, 0).refreshBody();



  // platforms.create(1320, 360, 'xxx_tile').setOrigin(0, 0).refreshBody();
  // platforms.create(1920, 480, 'xxx_tile').setOrigin(0, 0).refreshBody();

  movingPlatform = this.physics.add.image(1320, 360, 'xxx_tile').setOrigin(0, 0);

  movingPlatform.setImmovable(true);
  movingPlatform.body.allowGravity = false;
  movingPlatform.setVelocityX(150);


  movingPlatform2 = this.physics.add.image(1920, 480, 'xxx_tile').setOrigin(0, 0);

  movingPlatform2.setImmovable(true);
  movingPlatform2.body.allowGravity = false;
  movingPlatform2.setVelocityX(150);



  platforms.create(2080, 11*40, 'green_tile').setOrigin(0, 0).refreshBody();


  player = this.physics.add.sprite(0, 40, 'zavrio_anim').setOrigin(0, 0) ;

  player.setBounce(0.2);
  player.setCollideWorldBounds(true);

  player.body.setGravityY(1500);



  // player.acceleration = 600;
  // player.body.maxVelocity.x = 200;
  // player.body.maxVelocity.y = 500;



  this.physics.add.collider(player, platforms);
  this.physics.add.collider(player, movingPlatform);
   this.physics.add.collider(player, movingPlatform2);

  cursors = this.input.keyboard.createCursorKeys();

  spaceBar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);


  buttons = this.physics.add.staticGroup();

  const upButton = buttons.create(80, 520, 'btn_space'); //this.add.text(100, 100, 'Hello Phaser!', { fill: '#0f0' });
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


  this.anims.create({
    key: 'right',
    frames: this.anims.generateFrameNumbers('zavrio_anim', { start: 0, end: 1 }),
    frameRate: 10,
    repeat: -1
  });

  this.anims.create({
    key: 'stay',
    frames: [ { key: 'zavrio_anim', frame: 0 } ],
    frameRate: 20,
   // repeat: -1
  });

   this.anims.create({
    key: 'jump',
    frames: [ { key: 'zavrio_anim', frame: 2 } ],
    frameRate: 20,
   // repeat: -1
  });


 //  this.add.image(centerX , centerY, 'grid');


 // this.cameras.main.x = 0;
 // this.cameras.main.y = 0;

  this.cameras.main.width = 1000;
  this.cameras.main.height = 560;


 this.cameras.main.setBounds(0, 0, 2666, 560);


 this.cameras.main.startFollow(player);

 this.cameras.main.setBackgroundColor('#ffffff')


}

function update() {

  if (cursors.left.isDown || left)
  {
    player.setVelocityX(-300);
    // player.anims.play('left', true);
  }
  else if (cursors.right.isDown || right)
  {
    player.setVelocityX(300);
    //player.body.setAccelerationX(600);
    (spaceBar.isDown||up) ? player.anims.play('jump') : player.anims.play('right', true);
  }
  else
  {
    player.setVelocityX(0);
   //  player.body.setAccelerationX(0);
    (spaceBar.isDown||up) ? player.anims.play('jump') : player.anims.play('stay');
  }

  if ( (spaceBar.isDown||up) && player.body.touching.down)
  {
    player.setVelocityY(-700);
    player.anims.play('jump');
  }


  //moving platforms
  if (movingPlatform.x >= 1900)
  {
      movingPlatform.setVelocityX(-150);
  }
  else if (movingPlatform.x <= 1320)
  {
      movingPlatform.setVelocityX(150);
  };

  if (movingPlatform2.x >= 1920)
  {
      movingPlatform2.setVelocityX(-150);
  }
  else if (movingPlatform2.x <= 1320)
  {
      movingPlatform2.setVelocityX(150);
  };


}

