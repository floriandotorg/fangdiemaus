import word from './word'

export default ({ room, container, thing, say, action, reference, insteadOf }) => {
  const player = container(word('Player', 'm', { definiteArticle: true }))
  player.is('player')

  action('nehmen', 1, ['nimm', 'nehme'], (obj) => {
    if (obj.get('moveable') && obj.isInside(player.getLocation())) {
      if (player.isHolding(obj)) {
        say(`Du hast ${obj.name().inflect({ grammaticalCase: 'accusative' })} bereits.`)
      } else {
        player.holds(obj)
        say(`Du hast ${obj.name().inflect({ grammaticalCase: 'accusative' })} genommen.`)
      }
    } else {
      say(`Du kannst ${obj.name().inflect({ grammaticalCase: 'accusative' })} nicht nehmen.`)
    }
  })

  // Küche
  const kitchen = room(word('Küche', 'f', { definiteArticle: true }))
  reference(kitchen).by('Küche')

  const fridge = container(word('Kühlschrank', 'm'))
  reference(fridge).by('Kühlschrank', 'Kühlfach')
  kitchen.holds(fridge)

  const kitchen_table = container(word('Küchentisch', 'm'))
  reference(fridge).by('Küchentisch', 'Tisch')
  kitchen.holds(kitchen_table)

  // Wohnzimmer
  const living_room = room(word('Wohnzimmer', 'n', { definiteArticle: true }))
  reference(living_room, 'Wohnzimmer', 'Stube')

  const tv = container(word('Fernseher', 'm'), 'Ein uralter HD Fernseher. Wann geht er nur endlich kaputt?')
  reference(tv).by('Fernseher', 'Fernsehr', 'TV')
  living_room.holds(tv)

  const patioDoor = thing(word('Terassentür', 'f', { definiteArticle: true }))
  patioDoor.has('description', 'Eine alte Glastür, die keinen Einbrechner standhalten würde.')
  patioDoor.is('openable')
  reference(patioDoor).by('Terassentür', 'Tür')
  living_room.holds(patioDoor)

  const dad = container(word('Mann', 'm', { adjective: 'alt' }))
  reference(dad).by('Mann', 'alten Mann', 'Papa', 'alter Mann')
  living_room.holds(dad)

  // Flur
  const hall = room(word('Flur', 'm', { definiteArticle: true }))
  reference(hall).by('Flur')

  // Bad
  const bathroom = room(word('Badezimmer', 'm', { definiteArticle: true }))
  reference(bathroom).by('Bad', 'Badezimmer', 'Toilette')

  const poison = thing(word('Rattengift', 'n', { noArticle: true }))
  poison.has('description', 'Eine Packung voller Rattengift')
  reference(poison).by('Rattengift', 'Gift')
  bathroom.holds(poison)

  // Werkstatt
  const workshop = room(word('Werkstatt', 'm', { definiteArticle: true }))
  reference(workshop).by('Werkstatt')

  // insteadOf('gehen', (dest) => {
  //   if (dest === workshop) {
  //     say('Dieser Raum ist bis unter die Decke mit irgendwelchem Müll gefüllt. Da geh ich nicht rein.')
  //     return true
  //   }
  //   return false
  // })

  // Schlafzimmer
  const bedroom = room(word('Schlafzimmer', 'm', { definiteArticle: true }))
  reference(bedroom).by('Schlafzimmer')

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
  kitchen_table.holds(mouse)
  reference(mouse).by('Maus', 'Ratte')
  kitchen_table.holds(mouse)

  // Schokolade
  const chocolate = thing(word('Schokolade', 'f', { noArticle: true, adjective: 'angefressen' }), 'Ein ekelhaft angefressenes Stück Schokolade', { movable: true })
  reference(chocolate).by('Schokolade', 'Schoko', 'angefresse Schokolade')

  kitchen.holds(player)
  // insteadOf('nehmen', (obj) => {
  //   if (obj === mouse) {
  //     if (mouse.holdsside(kitchen)) {
  //       say('Mit einer schnellen Bewegung versuchst du die Maus zu greifen. Sie ist aber viel zu schnell. Sie lässt die Schokolade fallen, streckt dir die Zunge herraus und verschwindet in den Flur.')
  //       mouse.setLocation(dad)
  //       chocolate.setLocation(kitchen_table)
  //       return true
  //     }
  //   }
  //   return false
  // })

}
