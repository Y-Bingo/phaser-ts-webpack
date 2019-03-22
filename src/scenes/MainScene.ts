import FpsText from '../objects/FpsText';
import Player from '../objects/Player';

const PATH = "resource/assest/";

class MainScene extends Phaser.Scene
{
    private _fpsText: FpsText;
    private _player: Player;

    private g_platform: Phaser.GameObjects.Group;
    private g_star: Phaser.GameObjects.Group;

    preload (): void
    {
        this.load.image( "star", PATH + "star.png" );
        this.load.image( "ground", PATH + 'platform.png' );
        this.load.image( "sky", PATH + 'sky.png' );
        this.load.spritesheet( "player", PATH + 'dude.png', { frameWidth: 32, frameHeight: 48, startFrame: 4, endFrame: 4 } );
    }

    create (): void
    {
        // 开启物理系统
        // this.physics.systems.start( Phaser.Physics.Arcade );
        this._initSky();

        this._fpsText = new FpsText( this );

        this._inintPlatfrom();
        this._initStar();

        this._player = new Player( this, 100, 100 );
    }

    private _initSky (): void
    {
        let sky = new Phaser.GameObjects.Image( this, 0, 0, "sky" );
        sky.setOrigin( 0, 0 );
        this.add.existing( sky );
    }

    // 初始化平台
    private _inintPlatfrom (): void
    {
        // 创建平台组
        this.g_platform = new Phaser.GameObjects.Group( this );
        // 添加到舞台
        this.add.group( this.g_platform );

        // 创建底层的地板
        let bottomFloor = new Phaser.GameObjects.Image( this, 0, 0, "ground" );
        // 添加到世界
        this.add.existing( bottomFloor );
        // 添加到平台组
        this.g_platform.add( bottomFloor );

        // 创建其他地板
        this.g_platform.create( 500, 200, "ground" );
        this.g_platform.create( 200, 350, "ground" );
        this.g_platform.create( 700, 450, "ground" );

        this.physics.world.enable( this.g_platform );
        this.g_platform.children.iterate( ground =>
        {
            // 设置为静态
            ( <Phaser.Physics.Arcade.Body> ground.body ).setImmovable( true );
        } );

        // 设置锚点
        bottomFloor.setDisplayOrigin( 0, 0 );
        // 设置宽高
        bottomFloor.setScale( 4.5, 2 );
        // 设置位置
        bottomFloor.setY( this.sys.canvas.height - bottomFloor.height );
    }

    // 初始化星星
    private _initStar (): void
    {
        this.g_star = new Phaser.GameObjects.Group( this );
        this.g_star.createFromConfig( {
            key: "star",
            repeat: 11,
            setXY: {
                x: 11,
                y: 0,
                stepX: 85
            }
        } );
        this.g_star.children.iterate( star =>
        {
            this.physics.world.enable( star );
            ( <Phaser.Physics.Arcade.Body> star.body ).setGravityY( 300 ).setBounceY( Phaser.Math.Between( 0.4, 0.5 ) );
        } );
        this.physics.add.group( this.g_star );
    }

    // 更新
    update (): void
    {
        // 因为不是使用了 物理对象，所有要在update处设置碰撞检测
        this.physics.collide( this.g_platform, this.g_star );
        this.physics.collide( this.g_platform, this._player );
        this.physics.overlap( this._player, this.g_star, ( player, star ) =>
        {
            star.destroy( true );
        } );

        this._fpsText.update();
        this._player.update();
    }
}

export default MainScene;
