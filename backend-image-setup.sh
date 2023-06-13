#!/bin/bash

(
  cd bro-backend || return
  sbt docker:publishLocal
)
