import Main from '../components/HelloWorld'
import Pay from '../components/pay/Pay'
import Renew from '../components/pay/Renew'
import Finish from '../components/pay/Finish'
import Choose from '../components/pay/Choose'
import Search from '../components/pay/Search'
import Expect from '../components/Expect/Expect'
import Live from '../components/Live/Live'
import Checkon from '../components/Checkon/Checkon'
import Integral from '../components/Integral/Integral'
import Kind from '../components/Integral/Kind'
import Outs from '../components/Integral/Outs'

const routes = [
  	{ path: '', component: Pay },
  	{ path: '/main', component: Main },
  	{ path: '/renew', component: Renew },
  	{ path: '/finish', component: Finish },
  	{ path: '/choose', component: Choose },
  	{ path: '/search', component: Search },
  	{ path: '/expect', component: Expect },
  	{ path: '/live', component: Live },
    { path: '/checkon', component: Checkon },
    { path: '/integral', component: Integral },
    { path: '/integral/:id', component: Kind },
    { path: '/outs/:id',name: 'outs', component: Outs }
]

export default routes