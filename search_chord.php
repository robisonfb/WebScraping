<?php
function save_file($namefile, $content){
    $file_sounds = fopen("errors/" . $namefile , "a") or die("Unable to open file!");
    fwrite($file_sounds, $content);
    fclose($file_sounds);
}

function get_contents($url){
    $content = file_get_contents($url);
    $pattern = "/(?<='variations':')[^']+(?=')/";
    preg_match_all($pattern, $content, $results);
    return $results;
}

function sqlInsert($values){
    $servername = "localhost";
    $database = "chord";
    $username = "root";
    $password = "";
    $table = "chord_variations";
    $cols = "`note`, `chord`, `variation`, `type`";
    $dbcon = mysqli_connect($servername, $username, $password, $database);
    $insertquery = "INSERT INTO `" . $table . "` (" . $cols . ") VALUES (" . $values . ")";
    mysqli_query($dbcon, $insertquery) or die(mysqli_error($dbcon));
    mysqli_close($dbcon);
}

/* Variações de notas*/
$notes =  ['C', 'C#', 'Db', 'D', 'D#','Eb', 'E',  'F', 'F#', 'G', 'G#',  'A', 'A#', 'Am','Ab', 'B', 'Bb'];

$notes2 = ['º', '4', '7', '7+', '9', '4/7', '5-/7', '4/9', '7/9', '7/9-', 'm', 'm7', 'm4/7', 'm9', 'm5-/7'];

$combination = [];
foreach ($notes as $key => $note){
    foreach ($notes2 as $key2 => $note2 ){
        $combination[] = $note . $note2;
    }
}
$final = [];
foreach ($combination as $key => $combination_2){
    foreach ($notes as $key_combination => $note ){
        $final[] = $combination_2 .'/'. $note;
    }
}

$result = array_merge((array)$notes, (array)$final);

$url = "https://www.e-chords.com/site/chords2.asp?type=&method=1&chord=";

$cont = 0;
foreach ($result as $note){
    $url_get = $url . $note;

    $results = get_contents($url_get);

    if(count($results[0]) <= 0){
        save_file("errors_chord.txt", $note."\r\n");
    }else{
        foreach ($results[0] as $result){
            $cont++;
            $return = "'{$note}','chord{$cont}','{$result}','guitar'";
            sqlInsert($return);
            echo "running... \r\n";
        }
        $url_get = '';
        $cont = 0;
    }
}