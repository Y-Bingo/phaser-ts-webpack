const CONF = {
    scene: null,
    x: 100,
    y: 100,
    texture: "player"
}

class Player extends Phaser.GameObjects.Sprite
{
    private _speed: number;
    private _isJump: boolean;
    private _cursor: Phaser.Input.Keyboard.CursorKeys;

    constructor ( scene: Phaser.Scene, x?: number, y?: number, texture?: string )
    {
        super( scene, x ? x : CONF.x, y ? y : CONF.y, texture ? texture : CONF.texture );
        scene.add.existing( this );
        this._initSprite();
    }

    private _initSprite (): void
    {
        this.scene.physics.world.enable( this );
        ( <Phaser.Physics.Arcade.Body> this.body ).setGravityY( 300 );
        ( <Phaser.Physics.Arcade.Body> this.body ).setCollideWorldBounds( true );

        this._speed = 100;
        this._isJump = false;
        this._cursor = this.scene.input.keyboard.createCursorKeys();
        this._createAmin();
    }

    private _createAmin (): void
    {
        // 静止动画
        this.scene.anims.create( {
            key: "STOP",
            frames: [ { key: "player", frame: 4 } ]
        } );
        // 向左走
        this.scene.anims.create( {
            key: "LEFT",
            frames: this.scene.anims.generateFrameNames( "player", { start: 0, end: 3 } ),
            frameRate: 12,
            repeat: -1
        } );
        // 向右走
        this.scene.anims.create( {
            key: "RIGHT",
            frameRate: 12,
            frames: this.scene.anims.generateFrameNames( "player", { start: 3, end: 0 } ),
            repeat: -1
        } );

    }

    update ()
    {
        if ( this._cursor.space.isDown && this.body.touching.down ) {
            this.anims.play( "RIGHT", true );
            ( <Phaser.Physics.Arcade.Body> this.body ).setVelocityY( -300 );
        }

        if ( this._cursor.left.isDown ) {
            this.anims.play( "LEFT", true );
            this.setFlipX( false );
            ( <Phaser.Physics.Arcade.Body> this.body ).setVelocityX( -this._speed );
        } else if ( this._cursor.right.isDown ) {
            this.anims.play( "RIGHT", true );
            this.setFlipX( true );
            ( <Phaser.Physics.Arcade.Body> this.body ).setVelocityX( this._speed );
        } else {
            this.anims.play( "STOP", true );
            ( <Phaser.Physics.Arcade.Body> this.body ).setVelocityX( 0 );
        }

    }

}

export default Player;
