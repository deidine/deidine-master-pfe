module.exports = {
    async redirects() {
      return [
        {
          source: '/',
          destination: '/welcome',
          permanent: true,
        },
      ]
    },
  }