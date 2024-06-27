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
                this.player = new mySprite({
                        scene: this,
                        x: this.center.x,
                        y: this.center.y,
                        texture: 'nes'
                }, true)
        }

        update() {
                this.player.update()
        }
}
