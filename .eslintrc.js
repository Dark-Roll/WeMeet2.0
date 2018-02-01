
module.exports = {
    "extends": "airbnb",
    "env": {
        "browser": true,
        "node": true,
        "jasmine": true
      },
    "rules": {
		"indent": [2, "tab", { "SwitchCase": 1, "VariableDeclarator": 1 }],
		"no-console":0,
		"no-tabs": 0,
        "react/prop-types": 0,
        "react/jsx-indent": [2, "tab"],
        "react/jsx-indent-props": [2, "tab"],
    }
};