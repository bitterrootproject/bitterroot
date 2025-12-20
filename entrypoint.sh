#!/bin/bash

set -x

# function cleanup() {
#     kill $GUNICORN_PID
#     exit 1
# }

uv run manage migrate

# trap 'cleanup' EXIT TERM INT
uv run gunicorn bitterroot.root.wsgi:application -b 0.0.0.0:8000
# GUNICORN_PID=$?
# echo "Gunicorn PID: $GUNICORN_PID"
# fg $GUNICORN_PID
