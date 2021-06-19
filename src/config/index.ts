let config = {
    development: {
      APP_VER_NUM: 1,
      APP_VER: '1.0.0',
      API_HOST: "",
      OSS_KEY_SECRET: "",
      OSS_KEY_ID: "",
      OSS_ENDPOINT: "",
      OSS_BUCKET: "",
      OSS_HOST: ""
    },
    production: {
      APP_VER_NUM: 1,
      APP_VER: '1.0.0',
      API_HOST: "",
      OSS_KEY_SECRET: "",
      OSS_KEY_ID: "",
      OSS_ENDPOINT: "",
      OSS_BUCKET: "",
      OSS_HOST: ""
    }
  }
  
  export default  process.env.CONFIG_ENV === 'development' ? config['development'] : config['production']
  