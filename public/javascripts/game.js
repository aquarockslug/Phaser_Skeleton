class MainScene extends Phaser.Scene {

        constructor() {
                super({
                        key: 'main'
                })
        }

        create(data) {
                this.sfx = data.sfx
                data.sfx.select.play()
                this.center = {
                        x: data.x,
                        y: data.y
                }
                this.input.on('pointerdown', () => data.gameOver('You Win!', this), this);

                this.player = new mySprite({
                        scene: this,
                        x: this.center.x,
                        y: this.center.y,
                        texture: 'mySprite'
                }, true).setCollideWorldBounds(true)
                this.physics.world.gravity = new Phaser.Math.Vector2(0, 1000)
                this.physics.world.setBounds(32, 0, 192, 240) // 32px horizontal margin
                this.cameras.main.startFollow(this.player, true, 0, 0.05)
                this.cameras.main.setBounds(0, 0, -245, 256)

                this.background = this.add.image(this.center.x, this.center.y - 241, 'background');
                this.background.setDepth(-1)
                this.background.enable = false
        }

        update() {
                this.player.update()
        }
}
