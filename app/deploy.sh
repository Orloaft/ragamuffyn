#!/bin/bash

# Start the Remix app
echo "Starting Remix app..."

npm run dev-socket
sleep 5


# Start ngrok for the Remix app
echo "Starting ngrok for Remix app..."
ngrok http 3000 > /dev/null &
sleep 10
appUrl=$(curl --silent http://127.0.0.1:4040/api/tunnels | python -c "import sys, json; print(json.load(sys.stdin)['tunnels'][0]['public_url'])")
echo "Remix app URL: $appUrl"

# Start ngrok for the Express server
echo "Starting ngrok for Express server..."
ngrok http 8080 > /dev/null &
sleep 10
socketUrl=$(curl --silent http://127.0.0.1:4041/api/tunnels | python -c "import sys, json; print(json.load(sys.stdin)['tunnels'][0]['public_url'])")
echo "Express server URL: $socketUrl"

# Export URLs as environment variables
export PUBLIC_SOCKET_URL=$socketUrl
export PUBLIC_APP_URL=$appUrl
echo "Environment variables set: SOCKET_URL and APP_URL"
