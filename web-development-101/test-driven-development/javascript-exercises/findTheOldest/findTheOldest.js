let findTheOldest = function(personArray) {
    oldest = personArray.reduce((oldestPerson, person) => 
        calculateAge(person) > calculateAge(oldestPerson) ? person : oldestPerson);
    return oldest;
}
function calculateAge(person) {
    if(person.yearOfDeath === undefined)
        return parseInt(Date().split(' ')[3]) - person.yearOfBirth;
    return person.yearOfDeath - person.yearOfBirth;
}
module.exports = findTheOldest
