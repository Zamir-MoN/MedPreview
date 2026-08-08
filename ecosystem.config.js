module.exports = {
  apps: [
    {
      name: "medpreview-backend",
      script: "./dist/index.js",
      cwd: "./backend",
      instances: "max",
      exec_mode: "cluster",
      env: {
        NODE_ENV: "production",
        PORT: 7291
      }
    },
    {
      name: "medpreview-frontend",
      script: "npm",
      args: "run preview -- --port 4821 --host",
      cwd: "./frontend",
      env: {
        NODE_ENV: "production"
      }
    }
  ]
};
