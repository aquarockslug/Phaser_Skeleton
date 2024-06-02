class MainScene extends Phaser.Scene {

        constructor() {
                super({
                        key: 'main'
                })
        }

        create(config) {
                this.config = config
                this.background = this.add.image(config.x, config.y, 'background');
                this.input.once('pointerdown', () => {
                        this.gameOver('You Win!')
                }, this);
        }

        update() {}

        gameOver(outcome) {
                this.add.text(
                        this.config.x - 125,
                        this.config.y / 2,
                        outcome, {
                                fontFamily: 'serif',
                                fontSize: 64
                        }
                )
                this.scene.pause()
                setTimeout(() => this.scene.restart(), 2500)
        }
}
