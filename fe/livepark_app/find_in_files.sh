#!/bin/bash

directory=$1
search_string=$2

# Find all files in the directory and its subdirectories
find "$directory" -type f -exec grep -l "$search_string" {} \; |
while read -r file; do
    # Print the content of each file
    echo "File: $file"
    echo "Location: $(dirname "$file")"
    echo "====================="
done
