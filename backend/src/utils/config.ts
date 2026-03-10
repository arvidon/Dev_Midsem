const ENV = {
    PORT: Number(process.env.PORT || 4000),
    DATABASE_URL: process.env.DATABASE_URL,
    JWT_SECRET: process.env.JWT_SECRET || "secret",
    ACCESS_KEY: process.env.ACCESS_KEY,
    ACCESS_KEY_SECRET: process.env.ACCESS_KEY_SECRET,
    ACCESS_URL: process.env.ACCESS_URL,
    PUB_URL: process.env.PUB_URL,
    BUCKET_NAME: process.env.BUCKET_NAME
};

export default ENV;
