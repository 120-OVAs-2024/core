import { useEffect, useRef } from 'react';
import Phaser from 'phaser';

import css from './canvas.module.css';

interface CanvasComponentProps {
  stateQuestion: boolean | null;
  reset: boolean;
}

export const CanvasComponent = ({ stateQuestion, reset }: CanvasComponentProps) => {
  const gameRef = useRef<HTMLDivElement>(null);
  const phaserSceneRef = useRef<MainScene | null>(null);

  class MainScene extends Phaser.Scene {
    private elementoClick: string | null = null;
    private spriteSandwich: Phaser.Physics.Arcade.Sprite | null = null;
    private platesGroup: Phaser.Physics.Arcade.Group | null = null;
    private lettersGroup: Phaser.GameObjects.Group | null = null;
    private clickedOnce: boolean = false;
    private darkMode: null | boolean = null;

    constructor() {
      super({ key: 'MainScene' });
    }

    preload() {
      this.load.image('cloth', './assets/images/gameSandwich/cloth.webp');
      this.load.image('plate', './assets/images/gameSandwich/plate.png');
      this.load.image('success', './assets/images/gameSandwich/success.png');
      this.load.image('wrong', './assets/images/gameSandwich/wrong.png');
      this.load.spritesheet('sandwich', './assets/images/gameSandwich/sandwich.png', {
        frameWidth: 125,
        frameHeight: 130
      });
      this.load.spritesheet('plateBreak', './assets/images/gameSandwich/plateSprite.png', {
        frameWidth: 180,
        frameHeight: 180
      });
    }

    create() {
      phaserSceneRef.current = this;
      this.setupScene();

      this.events.on('updateStateQuestion', this.handleUpdateStateQuestion, this);
      this.events.on('updateReset', this.handleUpdateReset, this);
    }

    setupScene() {
      this.platesGroup = this.physics.add.group();
      const canvasWidth = this.game.config.width as number;
      const canvasHeight = this.game.config.height as number;
      const spriteWidth = 180;
      const spriteHeight = 180;
      const cols = Math.floor(canvasWidth / spriteWidth);
      const rows = Math.floor(canvasHeight / spriteHeight);

      const mantel = this.add.image(640, 300, 'cloth').setScale(0.7);

      for (let row = 0; row < rows; row++) {
        for (let col = 1; col < cols; col++) {
          const x = col * spriteWidth + spriteWidth / 2;
          const y = row * spriteHeight + spriteHeight / 2;
          const plate = this.platesGroup.create(x, y - 100, 'plate') as Phaser.Physics.Arcade.Sprite;
          plate.setCollideWorldBounds(false);
          // plate.body.allowGravity = false;
          (plate.body as Phaser.Physics.Arcade.Body).allowGravity = false;
        }
      }

      const spriteBreakLeft = this.physics.add.sprite(500, 350, 'plateBreak').setInteractive();
      const spriteBreakCenter = this.physics.add.sprite(700, 350, 'plateBreak').setInteractive();
      const spriteBreakRight = this.physics.add.sprite(900, 350, 'plateBreak').setInteractive();
      const circulo = this.add.graphics({ lineStyle: { width: 1, color: 0x0000ff } });
      this.darkMode = document.documentElement.getAttribute('data-dark-mode') === 'true';
      if (this.darkMode) {
        spriteBreakLeft.setTint(0x6f6f6f);
        spriteBreakCenter.setTint(0x6f6f6f);
        spriteBreakRight.setTint(0x6f6f6f);
        this.platesGroup.setTint(0x6f6f6f);
        mantel.setTint(0x111111);
      }
      const positionY = 260;
      circulo.fillStyle(0xb87000, 1);
      circulo.fillCircle(500, positionY, 20);
      circulo.fillCircle(700, positionY, 20);
      circulo.fillCircle(900, positionY, 20);

      const textStyle = {
        font: 'bold 32px Arial',
        fill: '#ffffff',
        align: 'center'
      };

      this.lettersGroup = this.add.group();
      const lettersA = this.add.text(500, positionY, 'A', textStyle).setOrigin(0.5);
      const lettersB = this.add.text(700, positionY, 'B', textStyle).setOrigin(0.5);
      const lettersC = this.add.text(900, positionY, 'C', textStyle).setOrigin(0.5);

      this.lettersGroup.add(lettersA);
      this.lettersGroup.add(lettersB);
      this.lettersGroup.add(lettersC);
      this.lettersGroup.add(circulo);

      const positions = [
        { x: 500, y: positionY },
        { x: 700, y: positionY },
        { x: 900, y: positionY }
      ];

      positions.forEach((pos) => {
        const susses = this.physics.add.sprite(pos.x, pos.y, 'success');
        const wrong = this.physics.add.sprite(pos.x, pos.y, 'wrong');
        susses.body.allowGravity = false;
        wrong.body.allowGravity = false;
        susses.setVisible(false);
        wrong.setVisible(false);
        this.lettersGroup?.add(susses);
        this.lettersGroup?.add(wrong);
      });

      this.spriteSandwich = this.physics.add.sprite(700, 500, 'sandwich');
      this.spriteSandwich.setCollideWorldBounds(true);
      this.platesGroup.add(spriteBreakLeft);
      this.platesGroup.add(spriteBreakCenter);
      this.platesGroup.add(spriteBreakRight);

      spriteBreakLeft.setInteractive();
      spriteBreakCenter.setInteractive();
      spriteBreakRight.setInteractive();
      spriteBreakLeft.body.allowGravity = false;
      spriteBreakCenter.body.allowGravity = false;
      spriteBreakRight.body.allowGravity = false;

      spriteBreakLeft.on('pointerdown', () => this.handleClick('left', 200, 120));
      spriteBreakCenter.on('pointerdown', () => this.handleClick('center', 0, 120));
      spriteBreakRight.on('pointerdown', () => this.handleClick('right', -200, 120));

      this.anims.create({
        key: 'walk',
        frames: this.anims.generateFrameNumbers('sandwich', { start: 0, end: 6 }),
        frameRate: 6,
        repeat: 0
      });

      this.anims.create({
        key: 'break',
        frames: this.anims.generateFrameNumbers('plateBreak', { start: 0, end: 6 }),
        frameRate: 6,
        repeat: 0,
        delay: 500
      });
    }

    handleClick(elemento: string, offsetX: number, offsetY: number) {
      if (this.clickedOnce) return;
      this.clickedOnce = true;

      this.elementoClick = elemento;
      this.jump();

      this.platesGroup?.children.iterate((plate) => {
        this.tweens.add({
          targets: plate,
          x: (plate as Phaser.Physics.Arcade.Sprite).x + offsetX,
          y: (plate as Phaser.Physics.Arcade.Sprite).y + offsetY,
          duration: 1000,
          ease: 'Power2'
        });
        return null;
      });
      this.spriteSandwich?.play('walk');
      if (elemento === 'left') {
        this.spriteSandwich!.scaleX *= -1;
      }
      this.lettersGroup?.getChildren().forEach((item) => {
        this.tweens.add({
          targets: item,
          x: (item as Phaser.GameObjects.Text).x + offsetX,
          y: (item as Phaser.GameObjects.Text).y + offsetY,
          duration: 1000,
          ease: 'Power2'
        });
      });
    }

    handleUpdateStateQuestion(stateQuestion: boolean | null) {
      const indexMap: Record<'left' | 'center' | 'right', [number, number]> = {
        left: [4, 5],
        center: [6, 7],
        right: [8, 9]
      };

      if (!this.elementoClick || !['left', 'center', 'right'].includes(this.elementoClick)) {
        // Maneja el caso donde this.elementoClick es null o no es una clave válida
        return;
      }
      const indices = indexMap[this.elementoClick as 'left' | 'center' | 'right'];
      if (indices) {
        const [trueIndex, falseIndex] = indices;
        (
          this.lettersGroup?.getChildren()[stateQuestion ? trueIndex : falseIndex] as Phaser.GameObjects.Sprite
        ).setVisible(true);
      }

      if (stateQuestion === false) {
        this.platesGroup?.getChildren().forEach((child) => {
          (child as Phaser.Physics.Arcade.Sprite).play('break');
        });
      }
    }

    handleUpdateReset(reset: boolean) {
      if (reset) {
        this.scene.restart();
        this.clickedOnce = false;
      }
    }

    resetGame() {}

    jump() {
      this.spriteSandwich?.setVelocity(0, -400);
    }

    update() {}
  }

  useEffect(() => {
    const config: Phaser.Types.Core.GameConfig = {
      type: Phaser.AUTO,
      width: 1300,
      height: 530,
      parent: gameRef.current ? gameRef.current : undefined,
      scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        height: 530
      },
      physics: {
        default: 'arcade',
        arcade: {
          gravity: { y: 600, x: 0 },
          debug: false
        }
      },
      scene: [MainScene]
    };

    const game = new Phaser.Game(config);
    game.scene.start('MainScene');

    return () => {
      game.destroy(true);
    };
  }, []);

  useEffect(() => {
    if (phaserSceneRef.current) {
      phaserSceneRef.current.events.emit('updateStateQuestion', stateQuestion);
    }
  }, [stateQuestion]);

  useEffect(() => {
    if (phaserSceneRef.current) {
      phaserSceneRef.current.events.emit('updateReset', reset);
    }
  }, [reset]);

  return <div className={css.parentCanvas} ref={gameRef} style={{ width: '100%', height: '100%' }} />;
};
