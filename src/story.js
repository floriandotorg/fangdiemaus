import word from './word'

export default ({ room, container, thing, say, action, reference, insteadOf }) => {
  const kitchen = room(word('Küche', 'f'), 'Eine alte, gammelige Küche')
  reference(kitchen, "Küche")
  const living_room = room(word('Wohnzimmer', 'n'), 'Vollgemülter Raum')
  reference(living_room, "Wohnzimmer", "Stube")

  kitchen.ConnectTo(living_room)

  const fridge = container(word('Kühlschrank', 'm'))
  reference(fridge, "Kühlschrank")
  kitchen.hold(fridge)

  const kitchen_table = container(word('Küchentisch', 'm'))
  reference(fridge, "Küchentisch")
  kitchen.hold(kitchen_table)

  //const mouse = thing(word('Maus', 'f', DEFINITE_ARTICLE))
  const mouse = thing(word('Maus', 'f'), "Die böse Maus", true)
  reference(mouse, "Maus", 'Ratte')
  kitchen_table.hold(mouse)

  action("nehmen", 1, (obj) => {
    say("Nimm 'obj'")
    say(obj.isMovable())
  })

  insteadOf("nehmen", (obj) => {
    if (obj === mouse) {
      if (mouse.isInside(kitchen)) {
        say("Das war die Maus")
        mouse.setLocation(living_room)
        return true
      }
    }
    return false
  })
}
