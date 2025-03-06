export const tankColorFor = (type: number, opacity = false) => {
  switch (type) {
    case 0:
    case 4:
    case 6:
    case 7:
    case 8:
    case 9:
      return opacity ? "bg-surface-victronLime" : "bg-content-victronLime"
    case 1:
      return opacity ? "bg-surface-victronCyan" : "bg-content-victronCyan"
    case 2:
    case 11:
      return opacity ? "bg-surface-victronSlate" : "bg-content-victronSlate"
    case 3:
    case 10:
      return opacity ? "bg-surface-victronGreen" : "bg-content-victronGreen"
    case 5:
      return opacity ? "bg-surface-victronPurple" : "bg-content-victronPurple"
  }
}
