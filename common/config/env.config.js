module.exports = {
    "port": 9901,
    "appEndpoint": "http://localhost:9901",
    "apiEndpoint": "http://localhost:9901",
    "jwt_secret": "9ndPDgv9hZ/NkX+TBVJJR1nhxLaqio5aMtdjHFVqBlP5SdbmgTahsOLKxYK1JXOHj5V4aw6dvSN7cvmAe7dsRA==",
    "jwt_expiration_in_seconds": 172800, //2 days
    "environment": "dev",
    "permissionLevels": {
        "NORMAL_USER": 1,
        "PAID_USER": 50,
        "ADMIN": 100
    }
};