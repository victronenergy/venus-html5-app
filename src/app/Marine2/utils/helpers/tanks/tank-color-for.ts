export const tankColorFor = (type: number, opacity = false) => {
  switch (type) {
    case 0:
    case 4:
    case 6:
    case 7:
    case 8:
    case 9:
      return opacity ? "bg-victron-lime/30" : "bg-victron-lime/100"
    case 1:
      return opacity ? "bg-victron-cyan/30" : "bg-victron-cyan/100"
    case 2:
    case 11:
      return opacity ? "bg-victron-slate/30" : "bg-victron-slate/100"
    case 3:
    case 10:
      return opacity ? "bg-victron-green/30" : "bg-victron-green/100"
    case 5:
      return opacity ? "bg-victron-purple/30" : "bg-victron-purple/100"
  }
}
