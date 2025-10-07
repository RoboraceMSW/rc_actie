function volg_licht () {
    if (Maqueen_V5.readLightIntensity(Maqueen_V5.DirectionType2.Left) + Maqueen_V5.readLightIntensity(Maqueen_V5.DirectionType2.Right) > 3000) {
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
}
function botsdetectie () {
    if (Math.abs(input.acceleration(Dimension.Z)) > 500) {
        strip.showColor(neopixel.colors(NeoPixelColors.Red))
        music.play(music.stringPlayable("C C5 C C5 C C5 C C5 ", 250), music.PlaybackMode.UntilDone)
    }
    basic.pause(2 * 500)
    strip.clear()
    strip.show()
}
IR.IR_callbackUser(function () {
    IR_action()
})
function echo_serieel () {
    let avdist = 0
    serial.writeValue("afstand", avdist)
    serial.writeValue("mg", Math.abs(input.acceleration(Dimension.Z)))
    serial.writeValue("dB", input.soundLevel())
    serial.writeValue("F", input.magneticForce(Dimension.Strength))
    serial.writeValue("x", input.magneticForce(Dimension.X))
    serial.writeValue("y", input.magneticForce(Dimension.Y))
    serial.writeValue("z", input.magneticForce(Dimension.Z))
    serial.writeValue("LineL", Maqueen_V5.readPatrolData(Maqueen_V5.Patrol.R))
    serial.writeValue("LineM", Maqueen_V5.readPatrolData(Maqueen_V5.Patrol.M))
    serial.writeValue("LineR", Maqueen_V5.readPatrolData(Maqueen_V5.Patrol.R))
}
function richtingaanwijzer (num: number) {
    if (num == 0) {
        Maqueen_V5.setRgbBlink(Maqueen_V5.DirectionType.Left, 3, Maqueen_V5.SpeedGrade.speed3, Maqueen_V5.CarLightColors.Red)
    } else {
        Maqueen_V5.setRgbBlink(Maqueen_V5.DirectionType.Right, 3, Maqueen_V5.SpeedGrade.speed3, Maqueen_V5.CarLightColors.Red)
    }
}
function lawaai () {
    basic.showIcon(IconNames.Chessboard)
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
}
function init () {
    serial.redirectToUSB()
    IR.IR_init()
    Maqueen_V5.patrolling(Maqueen_V5.Patrolling.ON)
    strip = neopixel.create(DigitalPin.P15, 4, NeoPixelMode.RGB)
    Afstandsbediening.init_rc_hx1838()
    herhaal = 3
    volglijn = 0
    basic.showString("IR RC")
    ccw = 1
    input.setAccelerometerRange(AcceleratorRange.OneG)
    lijst = [
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0
    ]
}
function afstand_en_geluid () {
    afstand = Maqueen_V5.Ultrasonic()
    toon = 2000 - afstand * 75
    average(toon)
    if (afstand < 20) {
        toon = 2000 - afstand * 75
        average(toon)
        music.ringTone(avtone)
    }
    basic.pause(100)
    music.stopAllSounds()
    for (let index = 0; index < 30; index++) {
        if (input.soundLevel() > 248) {
            lawaai()
        }
    }
}
function IR_action () {
    IRcode = IR.IR_read()
    if (IRcode == Afstandsbediening.een()) {
        herhaal = 1
        basic.showString("1x")
    } else {
        if (IRcode == Afstandsbediening.twee()) {
            herhaal = 2
            basic.showString("2x")
        } else {
            if (IRcode == Afstandsbediening.drie()) {
                herhaal = 3
                basic.showString("3x")
            } else {
                if (IRcode == Afstandsbediening.vier()) {
                    herhaal = 4
                    basic.showString("4x")
                } else {
                    if (IRcode == Afstandsbediening.vijf()) {
                        herhaal = 5
                        basic.showString("5x")
                    } else {
                        if (IRcode == Afstandsbediening.op()) {
                            basic.showArrow(ArrowNames.North)
                            Maqueen_V5.setRgblLed(Maqueen_V5.DirectionType.All, Maqueen_V5.CarLightColors.Green)
                            Maqueen_V5.motorRun(Maqueen_V5.Motors.All, Maqueen_V5.Dir.CW, 100)
                            basic.pause(herhaal * 500)
                            Maqueen_V5.motorStop(Maqueen_V5.Motors.All)
                            Maqueen_V5.setRgbOff(Maqueen_V5.DirectionType.All)
                        }
                    }
                }
            }
        }
    }
    // Split to limit nest depth
    if (IRcode == Afstandsbediening.neer()) {
        basic.showArrow(ArrowNames.South)
        Maqueen_V5.setRgblLed(Maqueen_V5.DirectionType.All, Maqueen_V5.CarLightColors.Blue)
        Maqueen_V5.motorRun(Maqueen_V5.Motors.All, Maqueen_V5.Dir.CCW, 100)
        basic.pause(herhaal * 500)
        Maqueen_V5.motorStop(Maqueen_V5.Motors.All)
        Maqueen_V5.setRgbOff(Maqueen_V5.DirectionType.All)
    } else {
        if (IRcode == Afstandsbediening.links()) {
            basic.showArrow(ArrowNames.East)
            richtingaanwijzer(0)
            Maqueen_V5.motorRun(Maqueen_V5.Motors.M2, Maqueen_V5.Dir.CW, 100)
            basic.pause(herhaal * 500)
            Maqueen_V5.motorStop(Maqueen_V5.Motors.All)
        } else {
            if (IRcode == Afstandsbediening.rechts()) {
                basic.showArrow(ArrowNames.West)
                richtingaanwijzer(1)
                Maqueen_V5.motorRun(Maqueen_V5.Motors.M1, Maqueen_V5.Dir.CW, 100)
                basic.pause(herhaal * 500)
                Maqueen_V5.motorStop(Maqueen_V5.Motors.All)
            } else {
                if (IRcode == Afstandsbediening.ster()) {
                    basic.showArrow(ArrowNames.NorthWest)
                    Maqueen_V5.motorRun(Maqueen_V5.Motors.M1, Maqueen_V5.Dir.CCW, 100)
                    Maqueen_V5.motorRun(Maqueen_V5.Motors.M2, Maqueen_V5.Dir.CW, 100)
                    basic.pause(herhaal * 500)
                    Maqueen_V5.motorStop(Maqueen_V5.Motors.All)
                } else {
                    if (IRcode == Afstandsbediening.hekje()) {
                        basic.showArrow(ArrowNames.NorthEast)
                        Maqueen_V5.motorRun(Maqueen_V5.Motors.M1, Maqueen_V5.Dir.CW, 100)
                        Maqueen_V5.motorRun(Maqueen_V5.Motors.M2, Maqueen_V5.Dir.CCW, 100)
                        basic.pause(herhaal * 500)
                        Maqueen_V5.motorStop(Maqueen_V5.Motors.All)
                    } else {
                        if (IRcode == Afstandsbediening.ok()) {
                            basic.showIcon(IconNames.Yes)
                            music.play(music.stringPlayable("C5 A F F E G A B ", 264), music.PlaybackMode.UntilDone)
                        } else {
                            if (IRcode == Afstandsbediening.acht()) {
                                volglijn = 1
                                basic.showString("VL")
                            } else if (IRcode == Afstandsbediening.nul()) {
                                volglijn = 0
                                basic.showString("NV")
                            }
                        }
                    }
                }
            }
        }
        basic.showIcon(IconNames.Diamond)
    }
}
function Volglijn () {
    fullspeed = 50
    lowspeed = 10
    if (volglijn) {
        if (Maqueen_V5.readPatrol(Maqueen_V5.Patrol.L) == 1 && (Maqueen_V5.readPatrol(Maqueen_V5.Patrol.M) == 1 && Maqueen_V5.readPatrol(Maqueen_V5.Patrol.L) == 1)) {
            Maqueen_V5.motorRun(Maqueen_V5.Motors.All, Maqueen_V5.Dir.CW, fullspeed)
        }
        if (Maqueen_V5.readPatrol(Maqueen_V5.Patrol.L) == 0 && (Maqueen_V5.readPatrol(Maqueen_V5.Patrol.M) == 1 && Maqueen_V5.readPatrol(Maqueen_V5.Patrol.L) == 1)) {
            Maqueen_V5.motorRun(Maqueen_V5.Motors.M1, Maqueen_V5.Dir.CW, fullspeed)
            Maqueen_V5.motorRun(Maqueen_V5.Motors.M2, Maqueen_V5.Dir.CW, lowspeed)
        }
        if (Maqueen_V5.readPatrol(Maqueen_V5.Patrol.L) == 0 && (Maqueen_V5.readPatrol(Maqueen_V5.Patrol.M) == 0 && Maqueen_V5.readPatrol(Maqueen_V5.Patrol.L) == 1)) {
            Maqueen_V5.motorRun(Maqueen_V5.Motors.M1, Maqueen_V5.Dir.CW, fullspeed)
            Maqueen_V5.motorRun(Maqueen_V5.Motors.M2, Maqueen_V5.Dir.CW, 0)
        }
        if (Maqueen_V5.readPatrol(Maqueen_V5.Patrol.L) == 1 && (Maqueen_V5.readPatrol(Maqueen_V5.Patrol.M) == 1 && Maqueen_V5.readPatrol(Maqueen_V5.Patrol.L) == 0)) {
            Maqueen_V5.motorRun(Maqueen_V5.Motors.M1, Maqueen_V5.Dir.CW, lowspeed)
            Maqueen_V5.motorRun(Maqueen_V5.Motors.M2, Maqueen_V5.Dir.CW, fullspeed)
        }
        if (Maqueen_V5.readPatrol(Maqueen_V5.Patrol.L) == 1 && (Maqueen_V5.readPatrol(Maqueen_V5.Patrol.M) == 0 && Maqueen_V5.readPatrol(Maqueen_V5.Patrol.L) == 0)) {
            Maqueen_V5.motorRun(Maqueen_V5.Motors.M1, Maqueen_V5.Dir.CW, 0)
            Maqueen_V5.motorRun(Maqueen_V5.Motors.M2, Maqueen_V5.Dir.CW, fullspeed)
        }
        if (Maqueen_V5.readPatrol(Maqueen_V5.Patrol.L) == 0 && (Maqueen_V5.readPatrol(Maqueen_V5.Patrol.M) == 0 && Maqueen_V5.readPatrol(Maqueen_V5.Patrol.L) == 0)) {
            Maqueen_V5.motorRun(Maqueen_V5.Motors.M1, Maqueen_V5.Dir.CW, lowspeed)
            Maqueen_V5.motorRun(Maqueen_V5.Motors.M2, Maqueen_V5.Dir.CW, fullspeed)
        }
        if (Maqueen_V5.readPatrol(Maqueen_V5.Patrol.L) == 0 && (Maqueen_V5.readPatrol(Maqueen_V5.Patrol.M) == 1 && Maqueen_V5.readPatrol(Maqueen_V5.Patrol.L) == 0)) {
            Maqueen_V5.motorRun(Maqueen_V5.Motors.All, Maqueen_V5.Dir.CW, 100)
        }
    } else {
        Maqueen_V5.motorStop(Maqueen_V5.Motors.All)
    }
}
function average (afstand: number) {
    lijst.pop()
    lijst.unshift(toon)
    som = 0
    for (let index = 0; index <= 9; index++) {
        som = som + lijst[index]
    }
    avtone = som / 10
}
// Kennismakingsprogramma om sensoren en actuatoren te leren kennen
let som = 0
let lowspeed = 0
let fullspeed = 0
let IRcode = 0
let avtone = 0
let toon = 0
let afstand = 0
let lijst: number[] = []
let volglijn = 0
let herhaal = 0
let ccw = 0
let strip: neopixel.Strip = null
Maqueen_V5.I2CInit()
init()
basic.forever(function () {
    echo_serieel()
})
basic.forever(function () {
    volg_licht()
})
basic.forever(function () {
    afstand_en_geluid()
})
basic.forever(function () {
    botsdetectie()
})
basic.forever(function () {
    Volglijn()
})
