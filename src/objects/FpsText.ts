const CONF = {
    scene: null,
    x: 20,
    y: 20,
    text: '',
    style: {
        fontFamily: "Connection",
        fontSize: 28
    }
}

class FpsText extends Phaser.GameObjects.Text
{
    constructor ( scene: Phaser.Scene )
    {
        super( scene, CONF.x, CONF.y, CONF.text, CONF.style );
        // 添加到场景
        scene.add.existing( this );
        // 设置游戏原点为左边
        this.setOrigin( 0 );
    }

    update (): void
    {
        this.setText( `fps: ${ Math.floor( this.scene.game.loop.actualFps ) }` )
    }
}

export default FpsText;
