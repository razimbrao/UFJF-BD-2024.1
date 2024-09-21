export const schemas: { [key: string]: object } = {
  '/team': {
    id: '/team',
    type: 'object',
    properties: {
      name: {
        type: 'string',
        maxLength: 150
      },
      logo: {
        type: 'string',
        format: 'url',
        maxLength: 255
      }
    },
    required: ['name', 'logo']
  },
  '/tournament': {
    id: '/tournament',
    type: 'object',
    properties: {
      name: {
        type: 'string',
        maxLength: 150
      },
      start: {
        type: 'string',
        format: 'date',
        minLength: 8
      },
      end: {
        type: 'string',
        format: 'date',
        minLength: 8
      },
      winnerTeam: {
        type: 'string',
        format: 'uuid'
      }
    },
    required: ['name', 'start', 'end']
  },
  '/player': {
    id: '/player',
    type: 'object',
    properties: {
      userId: {
        type: 'string',
        format: 'uuid'
      },
      riotId: {
        type: 'string',
        maxLength: 50
      },
      teamId: {
        type: 'string',
        format: 'uuid'
      }
    },
    required: ['userId', 'riotId', 'teamId']
  },
  '/match': {
    id: '/match',
    type: 'object',
    properties: {
      tournamentId: {
        type: 'string',
        format: 'uuid'
      },
      teamA: {
        type: 'string',
        format: 'uuid'
      },
      teamB: {
        type: 'string',
        format: 'uuid'
      },
      result: {
        type: 'string',
        maxLength: 50
      }
    },
    required: ['tournamentId', 'teamAId', 'teamBId', 'result']
  },
  '/user': {
    id: '/user',
    type: 'object',
    properties: {
      name: {
        type: 'string',
        maxLength: 150
      },
      email: {
        type: 'string',
        format: 'email',
        maxLength: 150
      },
      password: {
        type: 'string',
        minLength: 8
      }
    },
    required: ['name', 'email', 'password']
  },
  '/location': {
    id: '/location',
    type: 'object',
    properties: {
      name: {
        type: 'string',
        maxLength: 150
      },
      status: {
        type: 'boolean'
      }
    },
    required: ['name', 'status']
  }
};
