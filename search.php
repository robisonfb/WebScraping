<?php
function get_http_response_code($url) {
    $headers = get_headers($url);
    return substr($headers[0], 9, 3);
}

function save_file($namefile, $content){
    $file_sounds = fopen("sounds/" . $namefile , "w") or die("Unable to open file!");
    fwrite($file_sounds, $content);
    fclose($file_sounds);
}

$url = "https://www.cifras.com.br/arquivos/sound/guitar/";


for ($i = 0; $i <= 10; $i++) {
    $url_name_segment_1 = $i . "_";
    for ($x = 0; $x <= 10; $x++) {

        $url_segment = $url_name_segment_1 . $x . '.txt';

        if(get_http_response_code($url . $url_segment) != "200"){
            save_file("errors.txt", $url_segment);
        }else{
            $content = file_get_contents($url . $url_segment);
            save_file($url_segment, $content);
        }

    }
}

