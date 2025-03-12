import 'vuetify/styles'
import '@mdi/font/css/materialdesignicons.css' // Ensure you are using css-loader
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const EdgeTheme = {
  dark: true,
  colors: {
    background: '#24284f',
    surface: '#24284f',
    'surface-bright': '#407289',
    'surface-light': '#4c88b8',
    'surface-variant': '#424242',
    'on-surface-variant': '#4b506e',
    primary: '#d7d7dc',
    'primary-darken-1': '#71708a',
    secondary: '#4b506e',
    'secondary-darken-1': '#44436a',
    error: '#df616b',
    info: '#4c88b8',
    success: '#5eccba',
    warning: '#FB8C00',
  },
  variables: {
    'border-color': '#000000',
    'border-opacity': 0.12,
    'high-emphasis-opacity': 0.87,
    'medium-emphasis-opacity': 0.6,
    'disabled-opacity': 0.38,
    'idle-opacity': 0.04,
    'hover-opacity': 0.04,
    'focus-opacity': 0.12,
    'selected-opacity': 0.08,
    'activated-opacity': 0.12,
    'pressed-opacity': 0.12,
    'dragged-opacity': 0.08,
  },
}

const vuetify = createVuetify({
  components,
  directives,
  theme: {
    defaultTheme: 'EdgeTheme',
    themes: {
      EdgeTheme,
    },
  },
  icons: {
    defaultSet: 'mdi', 
  },
})

export default vuetify
