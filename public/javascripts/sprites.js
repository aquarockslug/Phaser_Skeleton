class mySprite extends Phaser.Physics.Arcade.Sprite {
        constructor(data, addToScene) {
                super(data.scene, data.x, data.y, data.texture)
                if (addToScene) {
                        this.scene.physics.add.existing(this)
                        this.scene.add.existing(this)
                }
                this.cursors = data.scene.input.keyboard.createCursorKeys()
        }

        update() {}
}
