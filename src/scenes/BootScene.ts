
class BootScene extends Phaser.Scene
{
    preload (): void
    {
        console.log( "开始加载资源..." );
        this.load.image( "logo", "resource/assest/phaser-logo.png" );
    }

    create (): void
    {
        console.log( "开始创建游戏场景..." );
        this.add.image( this.game.canvas.width / 2, this.game.canvas.height / 2, "logo" );
        if ( true ) {
            console.log( "sds" );
        }
    }
}

export default BootScene;
