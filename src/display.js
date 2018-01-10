"use strict";

const getProgressBar = (percentComplete) => {
  const percent = Math.round(percentComplete)
  if (percentComplete < 99) {
    let bar = ""
    for (let i = 1; i <= 50; i++) {
      if (percent - i * 2 >= 0) bar += '='
      else bar += '-'
    }
    return `[${bar}] ${percent}%`
  } else {
    return '[==================================================] 100%'
  }  
}

module.exports = {
  getProgressBar: getProgressBar,
}
