export default (definition, print) => {
  const fs = []

  const dbg = (obj) => {
    const int_dbg = (o, s) => {
      console.log(`${s}${o.name()} (${o.desc()})`)
      if (o.things !== undefined) {
        let ns = s + "  "
        for (let u of o.things()) {
          int_dbg(u, ns)
        }
      }
    }
    int_dbg(obj, "")
  }

  const locations = new Map()
  const actions = {}
  const specialActions = {}

  const nameMap = {}

  const holder = () => {
    const data = { }

    return {
      hold(thing) {
        locations.set(thing, this)
      },
      take(thing) {
        locations.set(thing, null)
      },
      things() {
        let l = []
        for (let [thing, hold] of locations) {
          if (hold === this) {
            l.push(thing)
          }
        }
        return l
      }
    }
  }

  const named = (name, desc) => {

    const data = { name, desc }

    return {
      name() {
        return data.name
      },
      desc() {
        return data.desc
      },
    }
  }

  const room = (name, desc) => {
    const data = { connections: [] }

    return {
      ...holder(),
      ...named(name, desc),
      ConnectTo(otherRoom) {
        this._addConnection(otherRoom)
        otherRoom._addConnection(this)
      },
      _addConnection(otherRoom) {
        data.connections.push(otherRoom)
      }
    }
  }

  const thing = (name, desc, {movable = false} = {}) => {
    const data = { movable }

    locations.set(this, null)

    return {
      ...named(name, desc),
      setLocation(loc) {
        locations.set(this, loc)
      },
      getLocation() {
        return locations.get(this)
      },
      isInside(loc) {
        let ownLocation = this.getLocation()
        if (ownLocation === loc) {
          return true
        } else if (ownLocation.isInside !== undefined) {
          return ownLocation.isInside(loc)
        } else {
          return false
        }
      },
      isMovable() {
        return data.movable
      }
    }
  }

  const container = (name, desc) => {

    return {
      ...holder(),
      ...thing(name, desc),
    }
  }

  const action = (name, number_parameters, callback) => {
    actions[name] = {
      callbacks: [callback],
      number_parameters,
      doIt(parameters) {
        try {
          for (let callback of this.callbacks) {
            if (callback(...parameters)) {
              break
            }
          }
        } catch (err) {
          print("Mir ist da ein Fehler bei unterlaufen")
          print(err)
        }
      }
    }
  }

  const reference = (obj, ...names) => {
    for (let name of names) {
      nameMap[name] = obj
    }
  }

  const insteadOf = (name, callback) => {
    actions[name].callbacks.splice(actions[name].length - 1, 0, callback)
  }

  const doAction = (name, parameters) => {
    if (name in actions) {
      actions[name].doIt(parameters)
    } else {
      print("Ich weiß nicht was ich machen soll")
    }
  }

  definition({ room, container, thing, say: print, action, reference, insteadOf })

  print("<!---")
  dbg(nameMap["Küche"])
  dbg(nameMap["Wohnzimmer"])
  print("---/>")

  doAction("nehmen", [ nameMap["Maus"] ])

  print("<!---")
  dbg(nameMap["Küche"])
  dbg(nameMap["Wohnzimmer"])
  print("---/>")

  doAction("nehmen", [ nameMap["Maus"] ])

  print("<!---")
  dbg(nameMap["Küche"])
  dbg(nameMap["Wohnzimmer"])
  print("---/>")

  return () => {
    print('test')
  }
}
