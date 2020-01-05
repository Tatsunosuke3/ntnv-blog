const configs = {
  configureWebpack: {
    devtool: "source-map"
  }
};

//環境がAWS Cloud9のときの設定
if (process.env.C9_PID) {
  Object.assign(configs, {
    devServer: {
      public: `${process.env.C9_PID}.vfs.cloud9.ap-northeast-1.amazonaws.com:8080`
    }
  });
}

module.exports = configs;
