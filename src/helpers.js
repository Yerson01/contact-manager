export const isEmpty = (string) => {
    if (string == undefined) return true;
    return !string.replace(' ', '').length;
}

export const compareCallback = (a, b) => {
    if ( a.name < b.name ){
      return -1;
    }
    if ( a.name > b.name ){
      return 1;
    }
    return 0;
  }