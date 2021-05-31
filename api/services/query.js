const chalk = require('chalk');
const axios = require('axios');
const config = require('../config/');
const debug = require('debug')('soldai:api:services');

class QueryService {
  async query (soldaiAnwser = {}){
    debug(`Service: ${chalk.green('Quering soldai')}`);
    let pok = config.pokeApi.url;
    if (soldaiAnwser.current_response.message.indexOf('::') !== -1) {
      let data = soldaiAnwser.current_response.message.split('::');
      if (data.length < 1) {
        return 'Lo siento un error interno me impidio obtener tu respuesta. Intentalo mas tarde';
      }
      let pokeAnswer = null;
      try{
        pokeAnswer = await axios.get(`${pok}/pokemon/${data[0]}`);
      } catch(err){
        return 'Lo siento un error interno me impidio obtener tu respuesta. Intentalo mas tarde';
      }
      let message = null;
            switch (data[1].trim()) {
        case 'types':
          message = this.getTypes(pokeAnswer.data.types)
          break
        case 'abilities':
          message = this.getAbilities(pokeAnswer.data.abilities)
          break
        case 'moves':
          message = this.getMoves(pokeAnswer.data.moves)
          break
        case 'weight':
          message = `Su peso es ${pokeAnswer.data.weight}`
          break
        case 'stats':
          message = this.getStats(pokeAnswer.data.stats)
          break
        default:
          if (data[1].trim() !== '') {
            message = `${data[1].trim()}, puedes ver su imagen en el siguiente link: ${pokeAnswer.data.sprites.back_default}`
          } else {
            message = 'No he encontrado la respuesta, intenta con otra pregunta.'
          }
      }
      if (message !== '') {
        return message
      } else {
        return 'Una disculpa, pero por el momento no podré darte la información. Intenta mas tarde.'
      }
    }
    return soldaiAnwser.current_response.message
  } 

  getTypes (data) {
    let singularAnsers = [
      'Es tipo',
      'Tipo',
      'El tipo de pokemon es',
      'Si no mal recuerdo es de tipo',
      'Según recuerdo es de tipo',
      'Estoy seguro que su tipo es',
      'Es de tipo'
    ]
    let answerIndex = Math.floor(Math.random() * 7)
    let resp = singularAnsers[answerIndex]
    const typesAmount = data.length
    let counter = 0
    data.forEach(obj => {
      counter++
      resp += ` ${obj.type.name}`
      if (counter === typesAmount - 1) {
        resp += ' y'
      } else if (typesAmount > 1 && counter !== typesAmount) {
        resp += ','
      }
    })
    if (counter > 0) resp += '.'
    return resp
  }

  getAbilities (data) {
    let resp = ''
    let plurarlAnswers = [
      'Sus habilidades son los siguientes:',
      'Las habilidades pueden ser:',
      'Habilidades:',
      'Sus técnicas son:',
      'Sus habilidades son:',
      'Aqui tienes los habilidades que puede realizar:'
    ]
    let singularAnsers = [
      'Su habilidad es la siguiente:',
      'La habilidad puede ser:',
      'Habilidad:',
      'Su habilidad es:',
      'Su técnica es:',
      'Aqui tienes su habilidad:'
    ]
    let answerIndex = Math.floor(Math.random() * 6)
    const typesAmount = data.length
    let counter = 0
    if (typesAmount > 1) {
      resp += plurarlAnswers[answerIndex]
    } else {
      resp += singularAnsers[answerIndex]
    }
    data.forEach(obj => {
      counter++
      resp += ` ${obj.ability.name}`
      if (counter === typesAmount - 1) {
        resp += ' y'
      } else if (typesAmount > 1 && counter !== typesAmount) {
        resp += ','
      }
    })
    if (counter > 0) resp += '.'
    return resp
  }

  getMoves (data) {
    let plurarlAnswers = [
      'Sus movimientos son los siguientes:',
      'Los movimientos pueden ser:',
      'Movimientos:',
      'Sus desplazamientos o movimientos son:',
      'Aqui tienes los movimientos que puede realizar:'
    ]
    let singularAnsers = [
      'Su movimiento es el siguiente:',
      'El movimiento puede ser:',
      'Movimiento:',
      'Su desplazamiento o movimiento es:',
      'Aqui tienes el movimiento que puede realizar:'
    ]
    let answerIndex = Math.floor(Math.random() * 5)
    let resp = ''
    const typesAmount = data.length
    let counter = 0
    if (typesAmount > 1) {
      resp += plurarlAnswers[answerIndex]
    } else {
      resp += singularAnsers[answerIndex]
    }
    data.forEach(obj => {
      counter++
      resp += ` ${obj.move.name}`
      if (counter === typesAmount - 1) {
        resp += ' y'
      } else if (typesAmount > 1 && counter !== typesAmount) {
        resp += ','
      }
    })
    if (counter > 0) resp += '.'
    return resp
  }

  getStats (data) {
    let plurarlAnswers = [
      'Sus estadísticas son las siguientes:',
      'Aqui puedes ver sus estadísticas->',
      'Estadísticas:',
      'Aquí te paso las estadísticas, espero sean de utilidad->',
      'Te presento las estadísticas:',
      'Aqui puedes observas las estadísticas:',
      'Aqui puedes ver algunos de sus números->'
    ]
    let answerIndex = Math.floor(Math.random() * 7)
    let resp = ''
    const typesAmount = data.length
    let counter = 0
    resp += plurarlAnswers[answerIndex]
    data.forEach(obj => {
      counter++
      resp += ` ${obj.stat.name}: ${obj.base_stat}%`
      if (counter === typesAmount - 1) {
        resp += ' y'
      } else if (typesAmount > 1 && counter !== typesAmount) {
        resp += ','
      }
    })
    if (counter > 0) resp += '.'
    return resp
  }
}

module.exports = new QueryService()
