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
      connectTo(otherRoom) {
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
        if (parameters.length < number_parameters) {
          print("Das ist mir zu wenig")
        } else if (parameters.length > number_parameters) {
          print("Das ist mir zu viel")
        } else {
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
  }

  const reference = (obj, ...names) => {
    for (let name of names) {
      nameMap[name.toLowerCase()] = obj
    }
  }

  const insteadOf = (name, callback) => {
    actions[name.toLowerCase()].callbacks.splice(actions[name.toLowerCase()].length - 1, 0, callback)
  }

  const doAction = (action, parameters) => {
    if (action !== null) {
      action.doIt(parameters)
    } else {
      print("🤷‍♂️ Ich weiß nicht was ich machen soll 🤷‍♀️")
    }
  }

  definition({ room, container, thing, say: print, action, reference, insteadOf })

  return (input) => {
    input = input.toLowerCase()
    let verbIdx = -1
    let action = null
    for (const actionName in actions) {
      if (actions.hasOwnProperty(actionName)) {
        verbIdx = input.indexOf(actionName)
        if (verbIdx >= 0) {
          action = actions[actionName]
          break
        }
      }
    }
    const objects = []
    for (const name in nameMap) {
      if (nameMap.hasOwnProperty(name)) {
        const element = nameMap[name]
        const start = input.indexOf(name)
        if (start >= 0) {
          objects.push({ start, end: start + name.length, name, element })
        }
      }
    }

    const parameters = []

    // Find the most specific
    // Check each combination
    for (const objectA of objects) {
      const hasMoreSpecific = false
      for (const objectB of objects) {
        if (objectA !== objectB && objectA.start >= objectB.start && objectA.end <= objectB.end) {
          if (objectA.name.length < objectB.name.length) {
            hasMoreSpecific = true
          }
        }
      }
      if (!hasMoreSpecific) {
        parameters.push(objectA.element)
      }
    }

    console.log(action)
    console.log(verbIdx)
    console.log(objects)

    //const parameters = objects.map(e => e.element)

    console.log(parameters)

    doAction(action, parameters)
  }
}
