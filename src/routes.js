import Scoreboard from './components/markets/Scoreboard.vue'
import Home from './components/Home.vue'


export const routes = [
  {path: '/', name: 'home', component: Home},
  {path: '/scoreboard', name: 'scoreboard', component: Scoreboard},
];
