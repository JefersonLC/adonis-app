import { ShieldConfig } from '@ioc:Adonis/Addons/Shield'

export const csp: ShieldConfig['csp'] = {
  enabled: false,
  directives: {},
  reportOnly: false,
}

export const csrf: ShieldConfig['csrf'] = {
  enabled: true,
  exceptRoutes: ['/api/categories', '/api/products'],
  enableXsrfCookie: true,
  methods: ['POST', 'PUT', 'PATCH', 'DELETE'],
  cookieOptions: {
    sameSite: 'strict',
  },
}

export const dnsPrefetch: ShieldConfig['dnsPrefetch'] = {
  enabled: true,
  allow: true,
}

export const xFrame: ShieldConfig['xFrame'] = {
  enabled: true,
  action: 'DENY',
}

export const hsts: ShieldConfig['hsts'] = {
  enabled: true,
  maxAge: '180 days',
  includeSubDomains: true,
  preload: false,
}

export const contentTypeSniffing: ShieldConfig['contentTypeSniffing'] = {
  enabled: true,
}
