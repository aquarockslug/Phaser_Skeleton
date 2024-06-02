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
                this.background = this.add.image(...Object.values(this.center), 'background');
                this.input.on('pointerdown', () => data.gameOver('You Win!', this), this);

                this.mySprite = new mySprite({
                        scene: this,
                        x: this.center.x / 4,
                        y: this.center.y / 2,
                        texture: 'mySprite'
                }, true).setScale(0.25)
        }

        update() {
                this.mySprite.update()
        }
}
