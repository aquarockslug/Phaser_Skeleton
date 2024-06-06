class mySprite extends Phaser.Physics.Arcade.Sprite {
        constructor(data, addToScene) {
                super(data.scene, data.x, data.y, data.texture)
                if (addToScene) {
                        this.scene.physics.add.existing(this)
                        this.scene.add.existing(this)
                }
                this.cursors = data.scene.input.keyboard.createCursorKeys()
                this.loadAnimations()
                this.play('idle')
        }

        update() {
                this.move()
                this.setScale(1, this.state == 'jumpSquat' ? 0.75 : 1)
                // if (this.lastState != this.state) console.log(this.state)
                // this.lastState = this.state
        }

        move(speed = 75) {
                const jumpBoost = this.state == 'jumping' ? 1.25 : 1
                if (this.cursors.up.isDown) this.jump()
                if (this.cursors.right.isDown) this.body.setVelocityX(speed * jumpBoost)
                else if (this.cursors.left.isDown) this.body.setVelocityX(-speed * jumpBoost)
                else this.body.setVelocityX(0)
        }

        jump(power = 250) {
                // possible double jump at peak of jump when jumping state expires
                if (this.state != 0 || Math.abs(this.body.velocity.y) > 5) return
                this.state = 'jumpSquat'
                var jumpPower = 1
                const held = () => jumpPower <= 1.5 ? jumpPower += 0.1 : launch()
                const launch = () => {
                        if (this.state != 'jumpSquat') return
                        this.scene.sfx.jump.play()
                        this.timer.destroy()
                        this.body.setVelocityY(-jumpPower * power)
                        this.state = 'jumping'
                        setTimeout(() => this.state == 'jumping' ?
                                this.state = 0 : null, 700)
                }
                this.timer = this.scene.time.addEvent({
                        delay: 50,
                        callback: held,
                        callbackScope: this,
                        loop: true
                })
                this.cursors.up.once('up', launch)
        }

        pickSwing() {
                this.scene.sfx.select.play()
                this.play('pickSwing')
                this.state = 'pickSwing'
                setTimeout(() => this.state == 'pickSwing' ?
                        this.state = 0 : null, 250)
        }

        loadAnimations() {
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
                this.scene.anims.create({
                        key: 'pickSwing',
                        frames: this.anims.generateFrameNumbers('player2', {
                                frames: [0, 1, 2]
                        }),
                        frameRate: 12,
                });

                this.scene.input.keyboard.on('keydown', e => {
                        var walk = dir => {
                                this.play('walk')
                                this.flipX = (dir == 'right')
                        }
                        if (e.key == 'ArrowRight') walk('right')
                        if (e.key == 'ArrowLeft') walk('left')
                        if ((e.key == 'z' || e.key == ')') &&
                                this.state == 'jumping') this.pickSwing()
                })
                this.scene.input.keyboard.on('keyup', e => {
                        if (Math.abs(this.body.velocity.y) > 5) return
                        if (this.cursors.left.isUp && this.cursors.right.isUp)
                                this.play('idle')
                })
        }
}
