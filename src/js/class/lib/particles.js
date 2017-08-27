import Type from 'class/util/type-util';
import PARTICLE_CONFS from 'const/particle-conf';
import 'particles.js';

export default class Particles {
  constructor(elem) {
    if(!Type.isElem(elem)) {
      throw new Error('elem is not a HTMLElement!');
    }

    this.elem = elem;
    this.elemId = '';
    this.dataKey = 'particlesConf';
    this.confName = '';
    this.defaultConfName = 'back';

    this.confName = this._getConfigType();
    this.elemId = this._getId();
    this.particlesConf = this._setParticleConf(this.confName);

    this._init(this.elemId, this.particlesConf);
  }

  _getConfigType() {
    const confName = this.elem.dataset[this.dataKey];
    if (confName === null || confName === '') {
      // Set default config
      return this.defaultConfName;
    }
    return confName;
  }

  _setParticleConf(key) {
    if (typeof PARTICLE_CONFS[key] === 'undefined') {
      throw new Error(key + ' is not defined config name!');
    }
    return PARTICLE_CONFS[key];
  }

  _getId() {
    const id = this.elem.id;
    if (id === null || id === '') {
      throw new Error('Particles.js needs HTML-id!');
    }
    return id;
  }

  _init(id, conf) {
    if (!Type.isString((id))) {
      throw new Error('id must be a string!');
    }

    if (!Type.isObject(conf)) {
      throw new Error('conf must be an object!');
    }

    window.particlesJS(id, conf);
  }
}
