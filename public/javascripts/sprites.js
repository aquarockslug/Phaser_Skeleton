class mySprite extends Phaser.Physics.Arcade.Sprite {
        constructor(data, addToScene) {
                super(data.scene, data.x, data.y, data.texture)
                if (addToScene) {
                        this.scene.physics.add.existing(this)
                        this.scene.add.existing(this)
                }
                this.cursors = data.scene.input.keyboard.createCursorKeys()
                this.scene.input.keyboard.on('keydown', this.keyHandler)
        }

        update() {
                this.move()
        }

        keyHandler(e) {
                if (e.key == 'z') this.scene.sfx.select.play()
                if (e.key == 'x') this.scene.sfx.select.play()
        }

        move(speed = 200) {
                this.body.setVelocity(0);
                this.cursors.left.isDown ? this.body.setVelocityX(-speed) :
                        this.cursors.right.isDown && this.body.setVelocityX(speed)
                this.cursors.up.isDown ? this.body.setVelocityY(-speed) :
                        this.cursors.down.isDown && this.body.setVelocityY(speed);
        }
}
