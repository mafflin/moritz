#!/bin/sh

/usr/bin/certbot renew

# reload nginx
/bin/kill -s SIGHUP 1

exit 0
