IR.IR_callbackUser(function () {
    if (IR.IR_read() == Afstandsbediening.een()) {
        herhaal = 1
        basic.showString("1x")
    }
    if (IR.IR_read() == Afstandsbediening.twee()) {
        herhaal = 2
        basic.showString("2x")
    }
    if (IR.IR_read() == Afstandsbediening.drie()) {
        herhaal = 3
        basic.showString("3x")
    }
    if (IR.IR_read() == Afstandsbediening.vier()) {
        herhaal = 4
        basic.showString("4x")
    }
    if (IR.IR_read() == Afstandsbediening.vijf()) {
        herhaal = 5
        basic.showString("5x")
    }
    if (IR.IR_read() == Afstandsbediening.op()) {
        Maqueen_V5.motorRun(Maqueen_V5.Motors.All, Maqueen_V5.Dir.CW, 100)
        basic.pause(herhaal * 500)
        Maqueen_V5.motorStop(Maqueen_V5.Motors.All)
        basic.showArrow(ArrowNames.North)
    }
    if (IR.IR_read() == Afstandsbediening.neer()) {
        Maqueen_V5.motorRun(Maqueen_V5.Motors.All, Maqueen_V5.Dir.CCW, 100)
        basic.pause(herhaal * 500)
        Maqueen_V5.motorStop(Maqueen_V5.Motors.All)
        basic.showArrow(ArrowNames.South)
    }
    if (IR.IR_read() == Afstandsbediening.links()) {
        Maqueen_V5.motorRun(Maqueen_V5.Motors.M2, Maqueen_V5.Dir.CW, 100)
        basic.pause(herhaal * 500)
        Maqueen_V5.motorStop(Maqueen_V5.Motors.All)
        basic.showArrow(ArrowNames.East)
    }
    if (IR.IR_read() == Afstandsbediening.rechts()) {
        Maqueen_V5.motorRun(Maqueen_V5.Motors.M1, Maqueen_V5.Dir.CW, 100)
        basic.pause(herhaal * 500)
        Maqueen_V5.motorStop(Maqueen_V5.Motors.All)
        basic.showArrow(ArrowNames.West)
    }
    if (IR.IR_read() == Afstandsbediening.ster()) {
        Maqueen_V5.motorRun(Maqueen_V5.Motors.M1, Maqueen_V5.Dir.CCW, 100)
        Maqueen_V5.motorRun(Maqueen_V5.Motors.M2, Maqueen_V5.Dir.CW, 100)
        basic.pause(herhaal * 500)
        Maqueen_V5.motorStop(Maqueen_V5.Motors.All)
        basic.showArrow(ArrowNames.NorthWest)
    }
    if (IR.IR_read() == Afstandsbediening.hekje()) {
        Maqueen_V5.motorRun(Maqueen_V5.Motors.M1, Maqueen_V5.Dir.CW, 100)
        Maqueen_V5.motorRun(Maqueen_V5.Motors.M2, Maqueen_V5.Dir.CCW, 100)
        basic.pause(herhaal * 500)
        Maqueen_V5.motorStop(Maqueen_V5.Motors.All)
        basic.showArrow(ArrowNames.NorthEast)
    }
    if (IR.IR_read() == Afstandsbediening.ok()) {
        music.play(music.stringPlayable("C5 A F F E G A B ", 120), music.PlaybackMode.UntilDone)
    }
})
let herhaal = 0
Maqueen_V5.I2CInit()
IR.IR_init()
Afstandsbediening.init_rc_hx1838()
herhaal = 1
basic.showString("IR RC")
