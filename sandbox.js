const car = {
  startDate: new Date('2020-03-02').getTime(),
  endDate: new Date('2020-03-07').getTime()
}

const target = {
  startDate: new Date('2020-03-08').getTime(),
  endDate: new Date('2020-03-10').getTime()
}

// * True tidak bisa di beli
// * False bisa di beli


function isReadyToBook() {
  return car.startDate <= target.startDate || car.endDate <= target.endDate
}

console.log(isReadyToBook());