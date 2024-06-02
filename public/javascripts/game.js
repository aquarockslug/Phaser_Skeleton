class MainScene extends Phaser.Scene {

        constructor() {
                super({
                        key: 'main'
                })
        }

        create(data) {
                this.sfx = data.sfx
                this.center = {
                        x: data.x,
                        y: data.y
                }
                this.background = this.add.image(...Object.values(this.center), 'background');

                this.input.on('pointerdown', () => data.gameOver('You Win!', this), this);

                data.sfx.select.play()
        }

        update() {}
}
