module.exports = {
    "extends": "airbnb-base",
    "rules": {
        "no-console": "off",
        "jest/no-disabled-tests": "warn",
        "jest/no-focused-tests": "error",
        "jest/no-identical-title": "error",
        "jest/prefer-to-have-length": "warn",
        "jest/valid-expect": "error",
    },
    "plugins": ["jest"],
    "env": {
        "jest/globals": true,
    },
};