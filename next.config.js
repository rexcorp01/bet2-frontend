module.exports = {
  target: "serverless",
  async rewrites() {
    return [
      // Do not rewrite API routes
      {
        source: "/api/:any*",
        destination: "/api/:any*",
      },
      // Rewrite everything else to use `pages/app`
      {
        source: "/app/:any*",
        destination: "/app/",
      },
    ];
  },
  webpack: (config, options) => {
    config.module.rules.push({
      test: /\.(pdf|png|jpe?g|gif|svg)$/i,
      use: [
        {
          loader: "file-loader",
        },
      ],
    });

    config.resolve.alias.canvas = false;
    config.resolve.alias.encoding = false;

    return config;
  },
};
