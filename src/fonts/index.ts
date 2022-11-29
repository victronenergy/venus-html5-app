import localFont from "@next/font/local"

export const MuseoSans = localFont({
  src: [
    {
      path: "./MuseoSans/MuseoSans-300.otf",
      weight: "300",
      style: "normal"
    },
    {
      path: "./MuseoSans/MuseoSans-300Italic.otf",
      weight: "300",
      style: "italic"
    },
    {
      path: "./MuseoSans/MuseoSans-500.otf",
      weight: "500",
      style: "normal"
    },
    {
      path: "./MuseoSans/MuseoSans-500Italic.otf",
      weight: "500",
      style: "italic"
    },
    {
      path: "./MuseoSans/MuseoSans-700.otf",
      weight: "700",
      style: "normal"
    },
    {
      path: "./MuseoSans/MuseoSans-700Italic.otf",
      weight: "700",
      style: "italic"
    }
  ],
  variable: '--font-museo-sans',
})