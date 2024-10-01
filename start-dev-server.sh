#!/bin/bash

# Check if http-server is installed
if ! command -v http-server &> /dev/null; then
  echo "Error: http-server is not installed. Please install it using:"
  echo "npm install -g http-server"
  exit 1
fi

# Start the server with automatic open
http-server -o
