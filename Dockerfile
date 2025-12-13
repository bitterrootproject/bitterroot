# This Dockerfile is ***heavily*** inspired by Authentik.
# https://github.com/goauthentik/authentik/blob/main/Dockerfile


# Download uv
FROM ghcr.io/astral-sh/uv:0.9.17 AS uv

# Base Python 3.13 image
FROM python:3.13.11-slim-trixie AS python-base

ENV VENV_PATH="/bitterroot/.venv" \
    UV_COMPILE_BYTECODE=1 \
    UV_LINK_MODE=copy \
    UV_NATIVE_TLS=1 \
    UV_PYTHON_DOWNLOADS=0

WORKDIR /bitterroot

COPY --from=uv /uv /uvx /bin/

# # Python dependencies
# FROM python-base AS python-deps

# ARG TARGETARCH
# ARG TARGETVARIANT

# Install system dependencies (if needed)
RUN rm -f /etc/apt/apt.conf.d/docker-clean; \
    echo 'Binary::apt::APT::Keep-Downloaded-Packages "true";' > /etc/apt/apt.conf. d/keep-cache && \
    apt-get update && \
    apt-get install -y --no-install-recommends curl iputils-ping && \
    rm -rf /var/lib/apt/lists/*


# Copy Python project files and install dependencies
COPY pyproject.toml uv.lock README.md ./

# Copy application code
COPY src/bitterroot /bitterroot/src/bitterroot/

RUN uv sync --frozen --no-dev


# Build SvelteKit
FROM --platform=${BUILDPLATFORM} docker.io/library/node:24-trixie-slim AS node-builder

WORKDIR /bitterroot/src/frontend

# Copy package files first for better caching
COPY src/frontend/package*.json ./
RUN npm ci

# Copy frontend source and build
COPY src/frontend/ ./
RUN npm run build

# Final image
FROM python-base AS final-image

# Copy built frontend from node-builder
COPY --from=node-builder /bitterroot/src/frontend/build /bitterroot/src/frontend/build

# Copy over entrypoint file
COPY ./entrypoint.sh ./

# ENV FRONTEND_BUILD_DIR=/work/web/build
RUN uv run manage collectstatic --noinput

EXPOSE 8000
CMD [ "/bin/bash", "entrypoint.sh" ]