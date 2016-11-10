#!/usr/bin/env bash
#Created by Nicholas Nothom
#150725

#This script exports GPIO pins, and should be run on boot, or any time before the server starts
#Try executing it via /etc/rc.local like this:
#bash /home/pi/startup.sh

#Assure that the GPIO pins are correct for your model

cd /sys/class/gpio/
ARR=("21" "20" "26" "16" "19" "13" "6" "5")
for i in "${ARR[@]}"
do
	echo ---------
    echo "$i"
	echo "$i" > export
	cd gpio"$i"
	echo out > direction
	echo 1 > value
	cd ..
done

node /home/pi/pushbox/pushbox.js


#Flash the light so I know boot is complete
#echo 0 > /sys/class/gpio/gpio21/value
#sleep 1
#echo 1 > /sys/class/gpio/gpio21/value
