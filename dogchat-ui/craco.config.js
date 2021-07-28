// https://www.tailwindcss.cn/docs/guides/create-react-app
module.exports = {
    style: {
        postcss: {
            plugins: [
                require('tailwindcss'),
                require('autoprefixer'),
            ],
        },
    },
};