export const APPS = {
  phone:      { id: 'phone',      name: 'Phone',      glyph: 'phone',      bg: ['#67e86b', '#1eb326'] },
  safari:     { id: 'safari',     name: 'Safari',     glyph: 'safari',     bg: ['#f6fbff', '#c2dcf8'] },
  messages:   { id: 'messages',   name: 'Messages',   glyph: 'messages',   bg: ['#6cea6f', '#12ba29'] },
  music:      { id: 'music',      name: 'Music',      glyph: 'music',      bg: ['#fc6379', '#fa233b'] },
  photos:     { id: 'photos',     name: 'Photos',     glyph: 'photos',     bg: ['#ffffff', '#ececf1'] },
  camera:     { id: 'camera',     name: 'Camera',     glyph: 'camera',     bg: ['#9a9aa0', '#48484e'] },
  weather:    { id: 'weather',    name: 'Weather',    glyph: 'weather',    bg: ['#41a8f7', '#1466d8'] },
  clock:      { id: 'clock',      name: 'Clock',      glyph: 'clock',      bg: ['#2c2c2e', '#000000'] },
  calendar:   { id: 'calendar',   name: 'Calendar',   glyph: 'calendar',   bg: ['#ffffff', '#f2f2f7'] },
  notes:      { id: 'notes',      name: 'Notes',      glyph: 'notes',      bg: ['#ffcf5c', '#ff9f0a'] },
  settings:   { id: 'settings',   name: 'Settings',   glyph: 'settings',   bg: ['#e4e5ea', '#b6b9c2'] },
  appstore:   { id: 'appstore',   name: 'App Store',  glyph: 'appstore',   bg: ['#3fb6ff', '#0a6cf5'] },
  maps:       { id: 'maps',       name: 'Maps',       glyph: 'maps',       bg: ['#a5e89b', '#4fc0f2'] },
  health:     { id: 'health',     name: 'Health',     glyph: 'health',     bg: ['#ffffff', '#f0f0f5'] },
  wallet:     { id: 'wallet',     name: 'Wallet',     glyph: 'wallet',     bg: ['#1c1c1e', '#3a3a3c'] },
  calculator: { id: 'calculator', name: 'Calculator', glyph: 'calculator', bg: ['#2c2c2e', '#000000'] },
  files:      { id: 'files',      name: 'Files',      glyph: 'files',      bg: ['#5ac8fa', '#1f7cf1'] },
  podcasts:   { id: 'podcasts',   name: 'Podcasts',   glyph: 'podcasts',   bg: ['#c07af5', '#8e3ff0'] },
  fitness:    { id: 'fitness',    name: 'Fitness',    glyph: 'fitness',    bg: ['#2c2c2e', '#000000'] },
  mail:       { id: 'mail',       name: 'Mail',       glyph: 'mail',       bg: ['#4fc3ff', '#0a6cf5'] },
  reminders:  { id: 'reminders',  name: 'Reminders',  glyph: 'reminders',  bg: ['#ffffff', '#f0f0f5'] },
  stocks:     { id: 'stocks',     name: 'Stocks',     glyph: 'stocks',     bg: ['#2c2c2e', '#000000'] },
  home:       { id: 'home',       name: 'Home',       glyph: 'homeapp',    bg: ['#ffb340', '#ff7e00'] },
  books:      { id: 'books',      name: 'Books',      glyph: 'books',      bg: ['#ffab2e', '#ff6b00'] },
}

export const FOLDERS = {
  utilities: {
    id: 'utilities',
    name: 'Utilities',
    apps: ['calculator', 'files', 'wallet', 'notes', 'reminders', 'stocks', 'home', 'books', 'podcasts'],
  },
  lifestyle: {
    id: 'lifestyle',
    name: 'Lifestyle',
    apps: ['health', 'fitness', 'maps', 'mail', 'appstore', 'camera'],
  },
}

export const INITIAL_PAGES = [
  {
    items: [
      { type: 'widget', id: 'weather' },
      { type: 'app', id: 'calendar' },  { type: 'app', id: 'clock' },     { type: 'app', id: 'photos' },    { type: 'app', id: 'camera' },
      { type: 'app', id: 'mail' },      { type: 'app', id: 'notes' },     { type: 'app', id: 'reminders' }, { type: 'app', id: 'stocks' },
      { type: 'app', id: 'books' },     { type: 'app', id: 'health' },    { type: 'app', id: 'wallet' },    { type: 'app', id: 'settings' },
      { type: 'app', id: 'appstore' },  { type: 'app', id: 'maps' },      { type: 'app', id: 'fitness' },   { type: 'app', id: 'podcasts' },
    ],
  },
  {
    items: [
      { type: 'widget', id: 'clock' },   { type: 'widget', id: 'calendar' },
      { type: 'folder', id: 'utilities' },
      { type: 'app', id: 'files' },      { type: 'app', id: 'calculator' }, { type: 'app', id: 'home' },
      { type: 'folder', id: 'lifestyle' },
      { type: 'app', id: 'weather' },    { type: 'app', id: 'safari' },     { type: 'app', id: 'phone' },
    ],
  },
]

export const DOCK = ['phone', 'safari', 'messages', 'music']

export const WEATHER = {
  city: 'Cupertino',
  temp: 21,
  condition: 'Mostly Sunny',
  high: 24,
  low: 14,
  hourly: [
    { label: 'Now',  temp: 21, icon: 'sun' },
    { label: '10AM', temp: 22, icon: 'sun' },
    { label: '11AM', temp: 23, icon: 'cloudsun' },
    { label: '12PM', temp: 24, icon: 'sun' },
    { label: '1PM',  temp: 24, icon: 'cloudsun' },
    { label: '2PM',  temp: 23, icon: 'cloud' },
  ],
}

export const PLAYLIST = [
  { title: 'Neon Rivers',   artist: 'Ada Vale',  album: 'Glasslight', duration: 214 },
  { title: 'Gravity Well',  artist: 'Nova Kid',  album: 'Signal',     duration: 187 },
  { title: 'Slow Aurora',   artist: 'Miel',      album: 'Polar',      duration: 243 },
]

export const TRACK = PLAYLIST[0]

export const NOTIFICATIONS = [
  { id: 'n1', appId: 'messages', app: 'Messages', title: 'Alex Chen',  body: 'Are we still on for tonight? I can grab tickets on the way over.', time: '2m ago' },
  { id: 'n2', appId: 'calendar', app: 'Calendar', title: 'Design Review', body: 'DUAL OS home screen walkthrough · 3:00 PM · Studio B', time: '18m ago' },
  { id: 'n3', appId: 'appstore', app: 'App Store', title: '3 apps updated', body: 'Weather, Maps and Notes were updated recently.', time: '1h ago' },
]

export const ISLAND_PING = {
  appId: 'messages',
  app: 'Messages',
  title: 'Alex Chen',
  body: 'Are we still on for tonight?',
}
