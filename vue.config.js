const path = require("path");
// const Copy = require("copy-webpack-plugin");

function resolve (dir) {
    return path.join(__dirname, dir);
}
module.exports = {
    publicPath: process.env.NODE_ENV === "production" ? "/production-sub-path/" : "/",
    devServer: {
        proxy: {
            "/ncov/api": {
                ws: false,
                target: "https://getest.wlw-jcdlcxzx.com/pigeon",
                changeOrigin: true,
                pathRewrite: {
                    // '^/api': '/'
                }
            }
        },
        host: "localhost",
        port: 8081,
        open: true
    },
    css: {
        loaderOptions: {
            scss: {
                prependData: `@import "~@/assets/css/variables.scss";`
            }
        }
    },
    configureWebpack: config => {
        config.entry.vendorModules = ["axios", "normalize.css"];
        config.entry.vendorLocal = ["@/assets/css/common.scss", "@/assets/css/cover.scss"];
        /* config.plugins.push(
            new Copy([
                {
                    from: path.resolve(__dirname, "static"),
                    to: "static",
                    ignore: [".*"]
                }
            ])
        ); */
    },
    chainWebpack: config => {
        config.plugin("html").tap(args => {
            args[0].template = path.resolve(__dirname, "index.html");
            return args;
        });
        config.resolve.alias
            .set("@", resolve("src"))
            .set("_c", resolve("src/components"))
            .set("_v", resolve("src/views"))
            .set("_com", resolve("src/common"))
            .set("static", resolve("static"));
    }
};
