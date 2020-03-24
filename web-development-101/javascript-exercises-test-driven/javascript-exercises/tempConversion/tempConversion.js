const ftoc = function(fahrenheit) {
  let celcius = (fahrenheit - 32) * 5 / 9;
  celcius = celcius.toFixed(1);
  if(celcius.slice(-1) === '0')
    return parseInt(celcius.slice(0, -2));
  else
    return parseFloat(celcius)
}

const ctof = function(celcius) {
  let fahrenheit = (celcius * 9 / 5) + 32;
  fahrenheit = fahrenheit.toFixed(1);
  if(fahrenheit.slice(-1) === '0')
    return parseInt(fahrenheit.slice(0, -2));
  else
    return parseFloat(fahrenheit)
}

module.exports = {
  ftoc,
  ctof
}
