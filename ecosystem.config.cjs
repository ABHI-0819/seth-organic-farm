module.exports = {
  apps: [
    {
      name: "spree-backend",
      script: "/var/www/my-store/scripts/spree-service.sh",
      autorestart: true,
      restart_delay: 5000,
      max_restarts: 10,
    },
    {
      name: "nextjs-storefront",
      script: "/var/www/my-store/scripts/storefront-service.sh",
      env: {
        PORT: 3000,
        HOSTNAME: "0.0.0.0",
        NODE_ENV: "production",
        SPREE_API_URL: "http://localhost:4000",
        SPREE_PUBLISHABLE_KEY: "pk_VHzc7f6Wv1V2MxU1WEhbCt12",
        NEXT_PUBLIC_DEFAULT_COUNTRY: "in",
        NEXT_PUBLIC_DEFAULT_LOCALE: "en-IN",
        NEXT_PUBLIC_DEFAULT_CURRENCY: "INR",
        NEXT_PUBLIC_SITE_URL: "http://82.29.165.210",
        NEXT_PUBLIC_STORE_NAME: "Seth Organic Form",
      },
      autorestart: true,
      restart_delay: 3000,
      max_restarts: 10,
    },
  ],
};
