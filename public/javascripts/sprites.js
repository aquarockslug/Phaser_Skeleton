class mySprite extends Phaser.Physics.Arcade.Sprite {
        constructor(data, addToScene) {
                super(data.scene, data.x, data.y, data.texture)
                if (addToScene) {
                        this.scene.physics.add.existing(this)
                        this.scene.add.existing(this)
                }

                this.scene.anims.create({
                        key: 'idle',
                        frames: this.anims.generateFrameNumbers('player', {
                                frames: [0]
                        }),
                        frameRate: 8,
                        repeat: -1
                });
                this.scene.anims.create({
                        key: 'walk',
                        frames: this.anims.generateFrameNumbers('player', {
                                frames: [0, 1, 2, 3]
                        }),
                        frameRate: 8,
                        repeat: -1
                });

                this.cursors = data.scene.input.keyboard.createCursorKeys()
                this.scene.input.keyboard.on('keydown', this.keyHandler)
                this.scene.input.keyboard.on('keydown', e => {
                        var walk = dir => {
                                this.play('walk')
                                this.flipX = (dir == 'right')
                        }
                        if (e.key == 'ArrowRight') walk('right')
                        if (e.key == 'ArrowLeft') walk('left')
                })
                this.scene.input.keyboard.on('keyup', e => {
                        if (this.cursors.left.isUp && this.cursors.right.isUp)
                                this.play('idle')
                })
                this.play('idle')
        }

        update() {
                this.move()
        }

        keyHandler(e) {
                if (e.key == 'z') this.scene.sfx.select.play()
                if (e.key == 'x') this.scene.sfx.select.play()
        }

        move(speed = 100) {
                if (this.cursors.up.isDown) this.jump()
                if (this.cursors.right.isDown) this.body.setVelocityX(speed)
                else if (this.cursors.left.isDown) this.body.setVelocityX(-speed)
                else this.body.setVelocityX(0)
        }

        jump(power = 250) {
                if (this.jumping) return
                this.jumping = true
                this.jumpPower = 1
                const held = () => this.jumpPower <= 1.5 ?
                        this.jumpPower += 0.05 : null
                this.timer = this.scene.time.addEvent({
                        delay: 25,
                        callback: held,
                        callbackScope: this,
                        loop: true
                })
                this.cursors.up.once('up', () => {
                        this.timer.destroy()
                        this.body.setVelocityY(-this.jumpPower * power)
                        this.jumping = false
                })

        }
}
