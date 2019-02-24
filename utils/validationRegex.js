/**
 * @class ValidationRegex
 * 
 */

class ValidationRegex {

  static name(){
    return /^[a-zA-ZÀ-ÿ0-9@']+( [a-zA-ZÀ-ÿ0-9-:'",@]+)*$/mg;
  } 

  static description() {
    return /^[a-zA-ZÀ-ÿ0-9@']+( [a-zA-ZÀ-ÿ0-9-:'",\n@]+)*$/mg;
  }

  static price(){
    return /^[0-9]+([.,][0-9]{2})?$/;
  }

  static phone() {
    return /(0|\\+33|0033)[1-9][0-9]{8}/;
  }
  
}

module.exports = ValidationRegex;