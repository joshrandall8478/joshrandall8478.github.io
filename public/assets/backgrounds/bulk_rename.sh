#!/bin/bash

if [ "$#" -eq 0 ]; then
	echo "No arguments provided."
	echo "Usage: ./bulk_rename.sh [/destination] [extension]"
	exit
fi

if [ "$1" == "-h" ]; then
	echo "Usage: ./bulk_rename.sh [/destination] [extension]"
        exit
fi

cd $1
ext="$2"


ls -v | cat -n | while read n f; do mv -n -v "$f" "$n.$ext"; done

echo "Backgrounds renamed. Remember to adjust the background limit in the index.astro JS."


