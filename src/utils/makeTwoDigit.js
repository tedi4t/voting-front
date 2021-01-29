const makeTwoDigit = numb => 
  numb.toString().length >= 2 ? numb : `0${numb}`

export default makeTwoDigit;