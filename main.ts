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
        basic.showArrow(ArrowNames.North)
        Maqueen_V5.setRgblLed(Maqueen_V5.DirectionType.All, Maqueen_V5.CarLightColors.Green)
        Maqueen_V5.motorRun(Maqueen_V5.Motors.All, Maqueen_V5.Dir.CW, 100)
        basic.pause(herhaal * 500)
        Maqueen_V5.motorStop(Maqueen_V5.Motors.All)
        Maqueen_V5.setRgbOff(Maqueen_V5.DirectionType.All)
    }
    if (IR.IR_read() == Afstandsbediening.neer()) {
        basic.showArrow(ArrowNames.South)
        Maqueen_V5.setRgblLed(Maqueen_V5.DirectionType.All, Maqueen_V5.CarLightColors.Blue)
        Maqueen_V5.motorRun(Maqueen_V5.Motors.All, Maqueen_V5.Dir.CCW, 100)
        basic.pause(herhaal * 500)
        Maqueen_V5.motorStop(Maqueen_V5.Motors.All)
        Maqueen_V5.setRgbOff(Maqueen_V5.DirectionType.All)
    }
    if (IR.IR_read() == Afstandsbediening.links()) {
        basic.showArrow(ArrowNames.East)
        richtingaanwijzer(0)
        Maqueen_V5.motorRun(Maqueen_V5.Motors.M2, Maqueen_V5.Dir.CW, 100)
        basic.pause(herhaal * 500)
        Maqueen_V5.motorStop(Maqueen_V5.Motors.All)
    }
    if (IR.IR_read() == Afstandsbediening.rechts()) {
        basic.showArrow(ArrowNames.West)
        richtingaanwijzer(1)
        Maqueen_V5.motorRun(Maqueen_V5.Motors.M1, Maqueen_V5.Dir.CW, 100)
        basic.pause(herhaal * 500)
        Maqueen_V5.motorStop(Maqueen_V5.Motors.All)
    }
    if (IR.IR_read() == Afstandsbediening.ster()) {
        basic.showArrow(ArrowNames.NorthWest)
        Maqueen_V5.motorRun(Maqueen_V5.Motors.M1, Maqueen_V5.Dir.CCW, 100)
        Maqueen_V5.motorRun(Maqueen_V5.Motors.M2, Maqueen_V5.Dir.CW, 100)
        basic.pause(herhaal * 500)
        Maqueen_V5.motorStop(Maqueen_V5.Motors.All)
    }
    if (IR.IR_read() == Afstandsbediening.hekje()) {
        basic.showArrow(ArrowNames.NorthEast)
        Maqueen_V5.motorRun(Maqueen_V5.Motors.M1, Maqueen_V5.Dir.CW, 100)
        Maqueen_V5.motorRun(Maqueen_V5.Motors.M2, Maqueen_V5.Dir.CCW, 100)
        basic.pause(herhaal * 500)
        Maqueen_V5.motorStop(Maqueen_V5.Motors.All)
    }
    if (IR.IR_read() == Afstandsbediening.ok()) {
        basic.showIcon(IconNames.Yes)
        music.play(music.stringPlayable("C5 A F F E G A B ", 264), music.PlaybackMode.UntilDone)
    }
    basic.showIcon(IconNames.Diamond)
})
function richtingaanwijzer (num: number) {
    if (num == 0) {
        Maqueen_V5.setRgbBlink(Maqueen_V5.DirectionType.Left, 3, Maqueen_V5.SpeedGrade.speed3, Maqueen_V5.CarLightColors.Red)
    } else {
        Maqueen_V5.setRgbBlink(Maqueen_V5.DirectionType.Right, 3, Maqueen_V5.SpeedGrade.speed3, Maqueen_V5.CarLightColors.Red)
    }
}
input.onSound(DetectedSound.Loud, function () {
    if (ccw == 1) {
        basic.showArrow(ArrowNames.East)
        Maqueen_V5.setRgbchange(Maqueen_V5.DirectionType.All, Maqueen_V5.SpeedGrade.speed4)
        Maqueen_V5.motorRun(Maqueen_V5.Motors.M1, Maqueen_V5.Dir.CCW, 100)
        Maqueen_V5.motorRun(Maqueen_V5.Motors.M2, Maqueen_V5.Dir.CW, 100)
        basic.pause(herhaal * 500)
        Maqueen_V5.motorStop(Maqueen_V5.Motors.All)
        ccw = 0
    } else {
        basic.showArrow(ArrowNames.West)
        Maqueen_V5.setRgbchange(Maqueen_V5.DirectionType.All, Maqueen_V5.SpeedGrade.speed4)
        Maqueen_V5.motorRun(Maqueen_V5.Motors.M1, Maqueen_V5.Dir.CW, 100)
        Maqueen_V5.motorRun(Maqueen_V5.Motors.M2, Maqueen_V5.Dir.CCW, 100)
        basic.pause(herhaal * 500)
        Maqueen_V5.motorStop(Maqueen_V5.Motors.All)
        ccw = 1
    }
    basic.showIcon(IconNames.Diamond)
    Maqueen_V5.setRgbOff(Maqueen_V5.DirectionType.All)
})
let ccw = 0
let herhaal = 0
serial.redirectToUSB()
Maqueen_V5.I2CInit()
IR.IR_init()
Afstandsbediening.init_rc_hx1838()
herhaal = 3
basic.showString("IR RC")
ccw = 1
basic.forever(function () {
	
})
basic.forever(function () {
    serial.writeValue("Linkslicht", Maqueen_V5.readLightIntensity(Maqueen_V5.DirectionType2.Left))
    serial.writeValue("Rechtslicht", Maqueen_V5.readLightIntensity(Maqueen_V5.DirectionType2.Right))
    if (Maqueen_V5.readLightIntensity(Maqueen_V5.DirectionType2.Left) + Maqueen_V5.readLightIntensity(Maqueen_V5.DirectionType2.Right) > 2048) {
        if (Maqueen_V5.readLightIntensity(Maqueen_V5.DirectionType2.Left) < Maqueen_V5.readLightIntensity(Maqueen_V5.DirectionType2.Right) + 200) {
            Maqueen_V5.motorRun(Maqueen_V5.Motors.M1, Maqueen_V5.Dir.CW, 100)
            Maqueen_V5.motorRun(Maqueen_V5.Motors.M2, Maqueen_V5.Dir.CW, 0)
        } else if (Maqueen_V5.readLightIntensity(Maqueen_V5.DirectionType2.Right) < Maqueen_V5.readLightIntensity(Maqueen_V5.DirectionType2.Left) + 200) {
            Maqueen_V5.motorRun(Maqueen_V5.Motors.M1, Maqueen_V5.Dir.CW, 0)
            Maqueen_V5.motorRun(Maqueen_V5.Motors.M2, Maqueen_V5.Dir.CW, 100)
        } else {
            Maqueen_V5.motorRun(Maqueen_V5.Motors.All, Maqueen_V5.Dir.CW, 100)
        }
    }
})
