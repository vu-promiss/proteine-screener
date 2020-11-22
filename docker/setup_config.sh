#!/bin/bash

CONFIG_PATH="public/config.yaml"
LOCALES=""
NEWLINE="
"

array=($(echo $PRSCR_LOCALES | tr ',' "\n"))
for locale in "${array[@]}"
do
    LOCALES=$LOCALES" - $locale"$NEWLINE
done

cat << EOF > $CONFIG_PATH
---
locales:
$LOCALES
cutoff: $PRSCR_CUTOFF
showAutonextButton: $PRSCR_AUTONEXT
debug: $PRSCR_DEBUG
apiBaseUrl: "$PRSCR_API_URL"
EOF

