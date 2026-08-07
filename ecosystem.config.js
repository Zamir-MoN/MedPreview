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
        PORT: 8400
      }
    },
    {
      name: "medpreview-frontend",
      script: "npm",
      args: "run preview -- --port 4100 --host",
      cwd: "./frontend",
      env: {
        NODE_ENV: "production"
      }
    }
  ]
};
