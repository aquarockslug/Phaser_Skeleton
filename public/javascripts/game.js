class MainScene extends Phaser.Scene {

        constructor() {
                super({
                        key: 'main'
                })
                // setInterval(() => console.clear(), 10000)
        }

        create(data) {
                this.sfx = data.sfx
                data.sfx.select.play()
                this.center = {
                        x: data.x,
                        y: data.y
                }
                this.createBackground()
                this.player = new mySprite({
                        scene: this,
                        x: this.center.x,
                        y: this.center.y,
                        texture: 'mySprite'
                }, true).setCollideWorldBounds(true)
                this.physics.world.gravity = new Phaser.Math.Vector2(0, 900)
                this.physics.world.setBounds(32, 0, 192, 240) // 32px horizontal margin
                this.cameras.main.startFollow(this.player, true, 0, 0.05)
                this.cameras.main.setBounds(0, 0, -245, 256)

        }

        createBackground() {
                this.add.image(this.center.x * 0.5, this.center.y, 'ice_wall')
                        .setScale(1.1, 1)
                this.add.image(this.center.x * 1.5, this.center.y, 'ice_wall')
                        .setScale(1.1, 1).flipX = true
                this.add.image(this.center.x, this.center.y - 241, 'background')
        }

        update() {
                this.player.update()
        }
}
