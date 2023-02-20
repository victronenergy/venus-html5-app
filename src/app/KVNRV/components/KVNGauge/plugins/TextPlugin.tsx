import { formatNumber } from "app/components/NumericValue"

export const TextPlugin = () => ({
  beforeDraw: (chart: Chart) => {
    let width = chart.width,
      height = chart.height,
      ctx = chart.ctx
    if (!ctx || !height || !width) {
      return
    }
    //@ts-ignore
    const textPluginOptions = chart.options.textPlugin
    ctx.restore()
    let fontSize = Math.min(width / 120, 1.4).toFixed(2)
    // For some reason in Safari rem results in tiny letters, so use em
    ctx.font = fontSize + "em sans-serif"
    ctx.textBaseline = "middle"
    ctx.fillStyle = textPluginOptions.textColor

    let text =
        formatNumber({
          value: textPluginOptions.value,
          unit: textPluginOptions.unit,
        })?.toString() ?? "",
      textX = Math.round((width - ctx.measureText(text).width) / 2),
      textY = height / 2 + height * 0.25

    ctx.fillText(text, textX, textY)
    ctx.save()
  },
})
