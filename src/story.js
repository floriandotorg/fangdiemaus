import word from './word'

export default ({ room, container, thing, say, action, reference, insteadOf }) => {
  const player = container(word('Player', 'm', { definiteArticle: true }))
  player.is('player')

  action('nehmen', 1, ['nimm', 'nehme'], (obj) => {
    if (obj.get('moveable')) {
      player.hold(obj)
      say(`Du hast ${obj.name().inflect({ grammaticalCase: 'accusative' })} genommen.`)
    } else {
      say('Das kannst du nicht nehmen.')
    }
  })

  // Küche
  const kitchen = room(word('Küche', 'f', { definiteArticle: true }))
  reference(kitchen, 'Küche')

  const fridge = container(word('Kühlschrank', 'm'))
  reference(fridge, 'Kühlschrank', 'Kühlfach')
  kitchen.hold(fridge)

  const kitchen_table = container(word('Küchentisch', 'm'))
  reference(fridge, 'Küchentisch', 'Tisch')
  kitchen.hold(kitchen_table)

  // Wohnzimmer
  const living_room = room(word('Wohnzimmer', 'n', { definiteArticle: true }))
  reference(living_room, 'Wohnzimmer', 'Stube')

  const tv = container(word('Fernseher', 'm'), 'Ein uralter HD Fernseher. Wann geht er nur endlich kaputt?')
  reference(tv, 'Fernseher', 'Fernsehr', 'TV')
  living_room.hold(tv)

  const patioDoor = thing(word('Terassentür', 'f', { definiteArticle: true }))
  patioDoor.has('description', 'Eine alte Glastür, die keinen Einbrechner standhalten würde.')
  patioDoor.is('openable')
  reference(patioDoor, 'Terassentür', 'Tür')
  living_room.hold(patioDoor)

  const dad = container(word('Mann', 'm', { adjective: 'alt' }))
  reference(dad, 'Mann', 'alten Mann', 'Papa', 'alter Mann')
  living_room.hold(dad)

  // Flur
  const hall = room(word('Flur', 'm', { definiteArticle: true }))
  reference(hall, 'Flur')

  // Bad
  const bathroom = room(word('Badezimmer', 'm', { definiteArticle: true }))
  reference(bathroom, 'Bad', 'Badezimmer', 'Toilette')

  const poison = container(word('Rattengift', 'n', { noArticle: true }))
  poison.has('description', 'Eine Packung voller Rattengift')
  reference(poison, 'Rattengift', 'Gift')
  bathroom.hold(poison)

  // Werkstatt
  const workshop = room(word('Werkstatt', 'm', { definiteArticle: true }))
  reference(workshop, 'Werkstatt')

  // insteadOf('gehen', (dest) => {
  //   if (dest === workshop) {
  //     say('Dieser Raum ist bis unter die Decke mit irgendwelchem Müll gefüllt. Da geh ich nicht rein.')
  //     return true
  //   }
  //   return false
  // })

  // Schlafzimmer
  const bedroom = room(word('Schlafzimmer', 'm', { definiteArticle: true }))
  reference(bedroom, 'Schlafzimmer')

  // Layout
  living_room.connectTo(hall)
  kitchen.connectTo(hall)
  bathroom.connectTo(hall)
  workshop.connectTo(hall)
  bedroom.connectTo(hall)

  // Maus
  const mouse = thing(word('Maus', 'f', { definiteArticle: true }), 'Die böse Maus', true)
  reference(mouse, 'Maus', 'Ratte')
  mouse.is('moveable')
  kitchen_table.hold(mouse)

  // Schokolade
  const chocolate = thing(word('Schokolade', 'f', { noArticle: true, adjective: 'angefressen' }), 'Ein ekelhaft angefressenes Stück Schokolade', { movable: true })
  reference(chocolate, 'Schokolade', 'Schoko', 'angefresse Schokolade')

  // insteadOf('nehmen', (obj) => {
  //   if (obj === mouse) {
  //     if (mouse.isInside(kitchen)) {
  //       say('Mit einer schnellen Bewegung versuchst du die Maus zu greifen. Sie ist aber viel zu schnell. Sie lässt die Schokolade fallen, streckt dir die Zunge herraus und verschwindet in den Flur.')
  //       mouse.setLocation(dad)
  //       chocolate.setLocation(kitchen_table)
  //       return true
  //     }
  //   }
  //   return false
  // })

}
