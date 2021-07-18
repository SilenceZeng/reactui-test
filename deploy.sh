#!/bin/bash
npm version $1 && \
  git push --follow-tags
  # git push origin master:deploy
