var start = function() {
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
                // Display loading progress
                var progressBar = this.add.graphics();
                var progressBox = this.add.graphics();
                progressBox.fillStyle(0x222222, 0.8);
                progressBox.fillRect(config.width / 4, config.height / 2, 320, 50);

                // Update loading progress
                this.load.on('progress', function(value) {
                        progressBar.clear();
                        progressBar.fillStyle(0xffffff, 1);
                        progressBar.fillRect(config.width / 4 + 10,
                                config.height / 2 + 10, 300 * value, 30);
                });

                // Remove loading progress when complete
                this.load.on('complete', function() {
                        progressBar.destroy();
                        progressBox.destroy();
                });

                [
                        ['background', 'phaser_icon.png']
                ].forEach(a => this.load.image(a[0], `assets/images/${a[1]}`))
        }

        function create() {
                game.scene.add('main', MainScene, true, {
                        x: config.width / 2,
                        y: config.height / 2
                });
        }
};
