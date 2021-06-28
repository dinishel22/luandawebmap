<?php
if(isset($_POST['id']) && is_numeric($_POST['id'])){
  $id = $_POST['id'];
} else {
  $id = "-99999";
}
try {
  $db = new PDO("pgsql:host=hdevrds.ctrw9wzqmrtp.us-east-1.rds.amazonaws.com;port=5432;dbname=luandawebmap;","luanda","kiand@");
  $sql = $db->query("SELECT id, name, web, image, category, ST_X(geom) as longitude, ST_Y(geom) as latitude FROM lda_attractions WHERE id= {$id}");
  if ($sql) {
      $row = $sql->fetch(PDO::FETCH_ASSOC);
      echo json_encode($row);
  } else {
      echo var_dump($sql->errorInfo());
  }
} catch (PDOException $e) {
  echo $e->getMessage();
}

?>
