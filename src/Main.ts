import "Phaser";
import BootScene from "./scenes/BootScene";
// const DEFAULT_WIDTH = 1280
// const DEFAULT_HEIGHT = 720
const DEFAULT_GAME_WIDTH = 1334;
const DEFAULT_GAME_HEIGHT = 750;
const DEBUG = false;

const config: GameConfig = {
    backgroundColor: '#ffffff',
    scale: {
        parent: 'phaser-game',
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: DEFAULT_GAME_WIDTH,
        height: DEFAULT_GAME_HEIGHT
    }
}

class Main extends Phaser.Game
{
    constructor ( config: any )
    {
        super( config );
        this._initGame();
    }

    // 初始化游戏
    private _initGame (): void
    {
        this.scene.add( "BootScene", BootScene );

        this._startGame();
    }

    // 开始游戏
    private _startGame (): void
    {
        this.scene.start( "BootScene" );
    }
}

window.addEventListener( 'load', () =>
{
    new Main( config );
} );
