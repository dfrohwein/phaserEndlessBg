<?php

/* counter */

//opens countlog.txt to read the number of hits
$datei = fopen("js/countlog.txt","r");
$count = fgets($datei,1000);
fclose($datei);
$count=$count + 1 ;
echo "$count" ;

// opens countlog.txt to change new hit number
$datei = fopen("js/countlog.txt","w");
fwrite($datei, $count);
fclose($datei);

?>