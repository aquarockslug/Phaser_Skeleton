var start = () => {
        var config = {
                type: Phaser.AUTO,
                width: 800,
                height: 600,
                backgroundColor: '#1a2d45',
                scene: {
                        preload: preload,
                        create: create,
                }
        };

        game = new Phaser.Game(config);

        function preload() {
                var [loadBar, loadBox] = [this.add.graphics(), this.add.graphics()]
                loadBox.fillStyle(0x222222, 0.8);
                loadBox.fillRect(config.width / 4, config.height / 2, 320, 50);

                this.load.on('progress', (value) => {
                        loadBar.clear();
                        loadBar.fillStyle(0xffffff, 1);
                        loadBar.fillRect(config.width / 4 + 10,
                                config.height / 2 + 10, 300 * value, 30);
                });

                this.load.on('complete', () => {
                        loadBar.destroy();
                        loadBox.destroy();
                });

                [
                        ['background', 'phaser_icon.png']
                ].forEach(a => this.load.image(a[0], `assets/images/${a[1]}`))
                this.load.json('sfx', 'assets/sfx.json');
        }

        function create(sfx = {}) {
                for (let [k, v] of Object.entries(game.cache.json.get('sfx')))
                        sfx[k] = sfxr.toAudio(v)
                game.scene.add('main', MainScene, true, {
                        x: config.width / 2,
                        y: config.height / 2,
                        sfx,
                        gameOver,
                });
        }

        function gameOver(outcome, endedGame) {
                endedGame.add.text(
                        endedGame.center.x - 125,
                        endedGame.center.y / 2,
                        outcome, {
                                fontFamily: 'coolvetiva',
                                fontSize: 64,
                                color: 'black'
                        }
                )
                endedGame.scene.pause()
                setTimeout(() => endedGame.scene.restart(), 2500)
        }
};
