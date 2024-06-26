var start = () => {
        var bodyElement = document.getElementById('main')
        var config = {
                type: Phaser.AUTO,
                width: bodyElement.clientWidth,
                height: bodyElement.clientHeight,
                backgroundColor: '#3b5dc9',
                scene: {
                        preload: preload,
                        create: create,
                },
                physics: {
                        default: 'arcade',
                        debug: true,
                },
        };

        game = new Phaser.Game(config)

        function preload() {
                var [loadBar, loadBox] = [this.add.graphics(), this.add.graphics()]
                loadBox.fillStyle(0x222222, 0.8)
                loadBox.fillRect(config.width / 4, config.height / 2, config.width / 2, 64)

                this.load.on('progress', (value) => {
                        loadBar.clear()
                        loadBar.fillStyle(0xffffff, 1)
                        loadBar.fillRect(config.width / 4 + 10,
                                config.height / 2 + 10, 100 * value, 16)
                });

                this.load.on('complete', () => {
                        loadBar.destroy()
                        loadBox.destroy()
                });

                [
                        ['nes', 'nes.png'],
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
                        endedGame.center.x - 64,
                        endedGame.player.y / 2,
                        outcome, {
                                fontFamily: 'coolvetiva',
                                fontSize: 32,
                                color: 'white'
                        }
                )
                endedGame.scene.pause()
                setTimeout(() => endedGame.scene.restart(), 2500)
        }
}
// start()
