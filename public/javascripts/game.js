class MainScene extends Phaser.Scene {

        constructor() {
                super({
                        key: 'main'
                })
        }

        preload() {
                this.load.image('arch', 'assets/images/arch.png');
        }

        create(data) {
                this.example = this.add.image(data.x, data.y, 'arch');
        }

        update() {}
}
