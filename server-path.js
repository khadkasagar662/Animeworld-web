export const path = {
    domain:
        process.env.NODE_ENV === "development"
            ? "http://localhost:4000/"
            : "http://localhost:4000/",
};
