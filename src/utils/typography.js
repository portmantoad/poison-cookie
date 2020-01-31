import Typography from 'typography'

const typography = new Typography({
  baseFontSize: '16.5px',
  baseLineHeight: 1.54,
  scaleRatio: 3,
  googleFonts: [
    {
      name: 'IM Fell Double Pica',
      styles: [
        '400',
      ],
    },
    {
      name: 'Caveat',
      styles: [
        '400',
      ],
    },
    {
      name: 'Averia Serif Libre',
      styles: [
        '300',
        '300i',
        '700'
      ],
    },
  ],
  headerFontFamily: ['IM Fell Double Pica', 'serif'],
  bodyFontFamily: ['Averia Serif Libre', 'serif'],
  // See below for the full list of options.
})

export default typography;