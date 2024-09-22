export const schemas: { [key: string]: object } = {
  '/time': {
    id: '/time',
    type: 'object',
    properties: {
      nome: {
        type: 'string',
        maxLength: 150
      },
      logo: {
        type: 'string',
        format: 'url',
        maxLength: 255
      }
    },
    required: ['nome', 'logo']
  },
  '/campeonato': {
    id: '/campeonato',
    type: 'object',
    properties: {
      nome: {
        type: 'string',
        maxLength: 150
      },
      dataInicio: {
        type: 'string',
        format: 'date',
        minLength: 8
      },
      dataFim: {
        type: 'string',
        format: 'date',
        minLength: 8
      },
      vencedor: {
        type: 'integer'
      }
    },
    required: ['nome', 'dataInicio', 'dataFim']
  },
  '/jogador': {
    id: '/jogador',
    type: 'object',
    properties: {
      usuarioId: {
        type: 'integer'
      },
      riotId: {
        type: 'string',
        maxLength: 50
      },
      timeId: {
        type: 'integer'
      }
    },
    required: ['usuarioId', 'riotId', 'timeId']
  },
  '/partida': {
    id: '/partida',
    type: 'object',
    properties: {
      campId: {
        type: 'integer'
      },
      timeA: {
        type: 'integer'
      },
      timeB: {
        type: 'integer'
      },
      resultado: {
        type: 'string',
        maxLength: 50
      }
    },
    required: ['campId', 'timeA', 'timeB', 'resultado']
  },
  '/usuario': {
    id: '/usuario',
    type: 'object',
    properties: {
      nome: {
        type: 'string',
        maxLength: 150
      },
      email: {
        type: 'string',
        format: 'email',
        maxLength: 150
      },
      senha: {
        type: 'string',
        minLength: 8
      }
    },
    required: ['nome', 'email', 'senha']
  },
  '/time/campeonato': {
    id: '/time/campeonato',
    type: 'object',
    properties: {
      timeId: {
        type: 'integer'
      }
    },
    required: ['timeId']
  }
};
